"""Download and optimize the official galleries for the July 2026 LYNX drop."""

from __future__ import annotations

from html import unescape
from io import BytesIO
import json
from pathlib import Path
import re
import shutil
import subprocess
from urllib.parse import parse_qs, urlparse

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
SOURCE_MOCKUPS = ROOT / "mockups-nuevo-drop-finales"
TARGET_MOCKUPS = ROOT / "mockups-finales"

PRODUCTS = [
    {
        "slug": "in-the-cut-camo-sweatpants-grey-combo",
        "mockup": "grey-abstract-camo-cargo-pants-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/in-the-cut-camo-sweatpants-fncolorname-grey-combo?variant=39297416855676",
    },
    {
        "slug": "in-the-cut-camo-zip-up-hoodie-grey-combo",
        "mockup": "grey-abstract-camo-hooded-bomber-jacket-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/in-the-cut-camo-zip-up-hoodie?variant=39297417052284&color=grey-combo",
    },
    {
        "slug": "tyson-die-rich-quarter-zip-sweatshirt-black-wash",
        "mockup": "born-broke-die-rich-black-quarter-zip-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/tyson-die-rich-quarter-zip-sweatshirt?variant=39284103708796&color=black-wash",
    },
    {
        "slug": "antisocial-rhinestone-pearl-oversized-hoodie-navy",
        "mockup": "navy-rhinestone-script-oversized-hoodie-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/antisocial-rhinestone-pearl-oversized-hoodie-fncolorname-navy?variant=39302571589756",
    },
    {
        "slug": "cropped-utility-corduroy-collar-work-jacket-olive",
        "mockup": "olive-corduroy-collar-work-jacket-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/cropped-utility-corduroy-collar-work-jacket-fncolorname-olive?variant=39297514438780",
    },
    {
        "slug": "relaxed-96-faux-pebble-leather-varsity-jacket-navy",
        "mockup": "navy-9-applique-faux-leather-varsity-jacket-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/relaxed-96-faux-pebble-leather-varsity-jacket-fncolorname-navy?variant=39299569385596",
    },
    {
        "slug": "rosa-parks-nah-embroidered-hoodie-black",
        "mockup": "rosa-parks-1955-black-graphic-hoodie-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/rosa-parks-nah-embroidered-hoodie-fncolorname-black?variant=39304883044476",
    },
    {
        "slug": "heartbreakers-players-club-hoodie-black",
        "mockup": "players-club-broken-heart-black-hoodie-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/heartbreakers-players-club-hoodie-fncolorname-black?variant=39299064234108",
    },
    {
        "slug": "nyc-all-star-hoodie-powder-blue",
        "mockup": "powder-blue-all-star-champions-hoodie-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/nyc-all-star-hoodie-fncolorname-grey?variant=39282267357308",
    },
    {
        "slug": "skeleton-stars-embroidered-oversized-hoodie-black",
        "mockup": "star-studded-pattern-black-hoodie-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/skeleton-stars-embroidered-oversized-hoodie-fncolorname-black?variant=39301112037500",
    },
    {
        "slug": "cropped-paisley-jacquard-denim-work-jacket-dark-wash",
        "mockup": "blue-paisley-denim-zip-jacket-mockup.png",
        "url": "https://www.fashionnova.com/es-pe/products/cropped-paisley-jacquard-denim-work-jacket-fncolorname-dark-wash?variant=39302142623868",
    },
]


def fetch(url: str) -> bytes:
    result = subprocess.run(
        [
            "curl.exe",
            "-sS",
            "-L",
            "--fail",
            "--max-time",
            "45",
            "-A",
            (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 Chrome/140.0 Safari/537.36"
            ),
            url,
        ],
        check=True,
        capture_output=True,
    )
    return result.stdout


def save_webp(payload: bytes, destination: Path, max_width: int = 1200) -> None:
    with Image.open(BytesIO(payload)) as image:
        image.load()
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGB")
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=82, method=6)


def selected_product(html: str, variant_id: str) -> dict:
    def walk(value):
        if isinstance(value, dict):
            yield value
            for child in value.values():
                yield from walk(child)
        elif isinstance(value, list):
            for child in value:
                yield from walk(child)

    for match in re.finditer(
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',
        html,
        flags=re.DOTALL | re.IGNORECASE,
    ):
        try:
            data = json.loads(unescape(match.group(1)))
        except (json.JSONDecodeError, TypeError):
            continue
        for node in walk(data):
            if not isinstance(node, dict) or node.get("@type") != "Product":
                continue
            offer = node.get("offers") or {}
            if variant_id and f"variant={variant_id}" in str(offer.get("url", "")):
                return node
    raise RuntimeError(f"No se encontró la variante {variant_id}")


def gallery_urls(html: str, base_sku: str) -> list[str]:
    matches = re.findall(
        r'https://cdn\.shopify\.com/s/files/1/0293/9277/files/[^"\'< >\\]+',
        html,
        flags=re.IGNORECASE,
    )
    urls: list[str] = []
    for raw_url in matches:
        url = raw_url.replace("\\u0026", "&")
        if base_sku.lower() not in url.lower() or url in urls:
            continue
        urls.append(url)
    return urls[:4]


summary = []
TARGET_MOCKUPS.mkdir(parents=True, exist_ok=True)

for product in PRODUCTS:
    source_mockup = SOURCE_MOCKUPS / product["mockup"]
    if not source_mockup.exists():
        raise FileNotFoundError(source_mockup)

    target_png = TARGET_MOCKUPS / f'{product["slug"]}-1-mockup.png'
    target_webp = target_png.with_suffix(".webp")
    shutil.copy2(source_mockup, target_png)
    save_webp(source_mockup.read_bytes(), target_webp)

    html = fetch(product["url"]).decode("utf-8", errors="replace")
    variant_id = parse_qs(urlparse(product["url"]).query).get("variant", [""])[0]
    variant = selected_product(html, variant_id)
    base_sku = str(variant.get("sku", "")).split("_", 1)[0]
    images = gallery_urls(html, base_sku)
    if not images:
        images = [str(variant.get("image", ""))]

    asset_dir = ROOT / "assets" / product["slug"]
    local_images = []
    for index, image_url in enumerate(images, start=1):
        destination = asset_dir / f'{product["slug"]}-{index}.webp'
        save_webp(fetch(image_url), destination)
        local_images.append(destination.relative_to(ROOT).as_posix())

    summary.append(
        {
            "slug": product["slug"],
            "official_name": variant.get("name"),
            "official_description": variant.get("description"),
            "sku": variant.get("sku"),
            "mockup": target_webp.relative_to(ROOT).as_posix(),
            "images": local_images,
        }
    )
    print(f'{product["slug"]}: mockup + {len(local_images)} fotos')

(ROOT / "tools" / "new_drop_assets.json").write_text(
    json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
print(f"Preparados {len(summary)} productos.")
