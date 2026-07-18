"""Create lightweight WebP variants for storefront images without deleting originals."""

from pathlib import Path
import json

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent


def optimized_path(source: Path) -> Path:
    return source.with_suffix(".webp")


def save_webp(source: Path, max_width: int, quality: int) -> tuple[int, int]:
    destination = optimized_path(source)
    with Image.open(source) as image:
        image.load()
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=quality, method=6)
    return source.stat().st_size, destination.stat().st_size


catalog = json.loads((ROOT / "catalog-seed.json").read_text(encoding="utf-8"))
sources = {
    ROOT / image
    for product in catalog
    for image in product.get("images", [])[:1]
    if isinstance(image, str) and image.startswith("mockups-finales/") and image.endswith(".png")
}
sources.update(
    {
        ROOT / "assets" / "hero-lynx-model-cinematic-v2.png",
        ROOT / "assets" / "hero-lynx-model-v1.png",
    }
)

before = 0
after = 0
for source in sorted(sources):
    if not source.exists():
        raise FileNotFoundError(source)
    original_size, optimized_size = save_webp(
        source,
        max_width=1600 if source.parent.name == "assets" else 1200,
        quality=84 if source.parent.name == "assets" else 82,
    )
    before += original_size
    after += optimized_size

saved_percent = 100 * (1 - after / before)
print(f"Optimized {len(sources)} images: {before / 1_000_000:.1f} MB -> {after / 1_000_000:.1f} MB ({saved_percent:.1f}% smaller)")
