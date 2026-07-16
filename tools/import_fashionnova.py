import argparse
import html as html_lib
import io
import json
import re
import time
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image


USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
)

COLOR_NAMES = {
    "black": "Negro",
    "white": "Blanco",
    "grey": "Gris",
    "gray": "Gris",
    "blue": "Azul",
    "brown": "Café",
    "red": "Rojo",
    "green": "Verde",
    "cream": "Crema",
    "charcoal": "Carbón",
    "navy": "Azul Marino",
    "multi color": "Multicolor",
    "multi": "Multicolor",
    "medium wash": "Deslavado Medio",
    "dark wash": "Deslavado Oscuro",
    "vintage wash": "Deslavado Vintage",
}


def fetch(url: str, attempts: int = 3) -> tuple[bytes, str]:
    last_error = None
    for attempt in range(attempts):
        try:
            request = urllib.request.Request(
                url,
                headers={"User-Agent": USER_AGENT, "Accept-Encoding": "identity"},
            )
            with urllib.request.urlopen(request, timeout=45) as response:
                return response.read(), response.geturl()
        except Exception as error:
            last_error = error
            if attempt + 1 < attempts:
                time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"No se pudo descargar {url}: {last_error}")


def find_product_group(page_html: str) -> dict:
    scripts = re.findall(
        r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        page_html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    for script in scripts:
        try:
            data = json.loads(html_lib.unescape(script.strip()))
        except json.JSONDecodeError:
            continue
        candidates = data if isinstance(data, list) else [data]
        for candidate in candidates:
            if isinstance(candidate, dict) and candidate.get("@type") == "ProductGroup":
                return candidate
    raise RuntimeError("La página no contiene datos ProductGroup")


def canonical_slug(final_url: str, product: dict) -> str:
    product_slug = product.get("productGroupID") or Path(urlparse(final_url).path).name
    base, marker, color = product_slug.partition("-fncolorname-")
    slug = f"{base}-{color}" if marker and color else base
    return re.sub(r"[^a-z0-9]+", "-", slug.lower()).strip("-")


def display_title(final_url: str, product: dict) -> str:
    page_slug = product.get("productGroupID") or Path(urlparse(final_url).path).name
    base, marker, color_slug = page_slug.partition("-fncolorname-")
    title = base.replace("-", " ").title()
    if marker and color_slug:
        color_key = color_slug.replace("-", " ").lower()
        color = COLOR_NAMES.get(color_key, color_key.title())
        title = f"{title} - {color}"
    return title


def category_for(slug: str, source_category: str) -> str:
    haystack = f"{slug} {source_category}".lower()
    if any(word in haystack for word in ("jean", "pants", "trouser", "bottom", "cargo")):
        return "jeans-pants"
    if any(word in haystack for word in ("t-shirt", "tee ", " tee", "shirt")):
        return "t-shirts"
    if any(word in haystack for word in ("matching set", "two piece", "2 piece", "set ")):
        return "conjuntos"
    return "hoodies-jackets"


def parse_size_field(raw_size: str) -> tuple[list[str], int | None]:
    stock_match = re.search(r"(\d+)\s+unidades?", raw_size, flags=re.IGNORECASE)
    stock = int(stock_match.group(1)) if stock_match else None
    clean = re.sub(r"\s*\d+\s+unidades?.*$", "", raw_size, flags=re.IGNORECASE).strip()
    clean = clean.replace("(", " ").replace(")", " ")
    sizes = [part.strip() for part in re.split(r"\s*-\s*|\s*/\s*|\s*,\s*", clean) if part.strip()]
    return list(dict.fromkeys(sizes)), stock


def download_images(image_urls: list[str], target: Path, slug: str) -> list[str]:
    target.mkdir(parents=True, exist_ok=True)
    local_images = []
    for index, image_url in enumerate(image_urls[:8], start=1):
        data, _ = fetch(image_url)
        with Image.open(io.BytesIO(data)) as image:
            image = image.convert("RGB")
            image.thumbnail((1400, 1800), Image.Resampling.LANCZOS)
            output = target / f"{slug}-{index}.webp"
            image.save(output, "WEBP", quality=86, method=6)
        local_images.append(output.as_posix())
    return local_images


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input_file", type=Path)
    parser.add_argument("--limit", type=int, default=10)
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument("--project", type=Path, default=Path.cwd())
    parser.add_argument("--output", type=Path, default=Path(".import-products.json"))
    args = parser.parse_args()

    all_records = []
    for raw_line in args.input_file.read_text(encoding="utf-8").splitlines():
        if not raw_line.strip() or "|" not in raw_line:
            continue
        url, price, size = [part.strip() for part in raw_line.split("|", 2)]
        all_records.append({"sourceUrl": url, "price": float(price), "sizeField": size})

    records = all_records[args.offset : args.offset + args.limit]

    imported = []
    for position, record in enumerate(records, start=1):
        page_bytes, final_url = fetch(record["sourceUrl"])
        product = find_product_group(page_bytes.decode("utf-8", errors="replace"))
        slug = canonical_slug(final_url, product)
        title = display_title(final_url, product)
        sizes, stock = parse_size_field(record["sizeField"])
        image_urls = product.get("image") or []
        if isinstance(image_urls, str):
            image_urls = [image_urls]
        image_dir = args.project / "assets" / slug
        local_paths = download_images(image_urls, image_dir, slug)
        imported.append(
            {
                "position": position,
                "title": title,
                "slug": slug,
                "category": category_for(slug, str(product.get("category", ""))),
                "sourceCategory": product.get("category", ""),
                "price": record["price"],
                "sizes": sizes,
                "stock": stock,
                "images": [str(Path(path).relative_to(args.project)).replace("\\", "/") for path in local_paths],
                "sourceUrl": record["sourceUrl"],
                "canonicalUrl": final_url,
            }
        )
        print(f"[{position}/{len(records)}] {title} ({len(local_paths)} imágenes)", flush=True)

    output_path = args.output if args.output.is_absolute() else args.project / args.output
    output_path.write_text(json.dumps(imported, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Metadatos guardados en {output_path}")


if __name__ == "__main__":
    main()
