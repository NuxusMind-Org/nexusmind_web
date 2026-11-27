#!/usr/bin/env python3
"""
Static image & disguised-SVG optimization pipeline for NexusMind Web.
- Pre-composites luminance-masked base64 PNG pairs inside Canva/Figma SVG exports
- Preserves pure vector <path> text in new_nexusmind_logo_full.svg while shrinking its icon bitmap
- Generates right-sized 2x Retina WebP assets and 1024w/1920w responsive background pairs
- Generates a cropped 128x128 favicon in public/favicon.png
"""

from __future__ import annotations

import base64
import io
import os
import re
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"
PUBLIC = ROOT / "public"


def decode_data_uris(svg_text: str) -> list[Image.Image]:
    matches = re.findall(r"data:image/[a-zA-Z+]+;base64,([A-Za-z0-9+/=]+)", svg_text)
    return [Image.open(io.BytesIO(base64.b64decode(b64))) for b64 in matches]


def save_webp(
    img: Image.Image,
    dest: Path,
    max_size: tuple[int, int] | None = None,
    exact_width: int | None = None,
    quality: int = 84,
    alpha_quality: int = 92,
) -> tuple[int, tuple[int, int]]:
    img = ImageOps.exif_transpose(img)
    if exact_width is not None and img.width > exact_width:
        ratio = exact_width / img.width
        new_dims = (exact_width, max(1, round(img.height * ratio)))
        img = img.resize(new_dims, Image.Resampling.LANCZOS)
    elif max_size is not None:
        img = img.copy()
        img.thumbnail(max_size, Image.Resampling.LANCZOS)

    has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
    img = img.convert("RGBA" if has_alpha else "RGB")

    dest.parent.mkdir(parents=True, exist_ok=True)
    save_kwargs: dict = {"format": "WEBP", "quality": quality, "method": 6}
    if has_alpha:
        save_kwargs["alpha_quality"] = alpha_quality

    img.save(dest, **save_kwargs)
    return dest.stat().st_size, img.size


def optimize_hybrid_navbar_logo() -> tuple[int, int]:
    svg_path = ASSETS / "svg" / "new_nexusmind_logo_full.svg"
    txt = svg_path.read_text(encoding="utf-8")
    before_bytes = svg_path.stat().st_size

    if "data:image/webp;base64," in txt:
        return before_bytes, before_bytes

    imgs = decode_data_uris(txt)
    if len(imgs) < 2:
        raise RuntimeError("Expected luminance mask + RGB pair in new_nexusmind_logo_full.svg")

    mask = imgs[0].convert("L")
    rgb = imgs[1].convert("RGB")
    rgba = rgb.convert("RGBA")
    rgba.putalpha(mask)

    icon_resized = rgba.resize((512, 512), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    icon_resized.save(buf, format="WEBP", quality=90, alpha_quality=95, method=6)
    webp_b64 = base64.b64encode(buf.getvalue()).decode("ascii")

    # Replace masked dual-pattern group with a single pre-masked <image> inside clip0_668_12
    new_group = (
        '<g clip-path="url(#clip0_668_12)">\n'
        f'<image x="-245.572" y="-245.572" width="2491" height="2491" '
        f'preserveAspectRatio="none" href="data:image/webp;base64,{webp_b64}"/>\n'
        "</g>"
    )
    txt_updated = re.sub(
        r'<g clip-path="url\(#clip0_668_12\)">.*?</g>\s*</g>',
        new_group,
        txt,
        count=1,
        flags=re.DOTALL,
    )

    new_defs = (
        "<defs>\n"
        '<clipPath id="clip0_668_12">\n'
        '<rect width="2000" height="2000" fill="white"/>\n'
        "</clipPath>\n"
        "</defs>"
    )
    txt_updated = re.sub(r"<defs>.*?</defs>", new_defs, txt_updated, count=1, flags=re.DOTALL)
    svg_path.write_text(txt_updated, encoding="utf-8")
    return before_bytes, svg_path.stat().st_size


def optimize_masked_canva_svg(
    svg_path: Path, dest_webp: Path, max_size: tuple[int, int], quality: int = 88
) -> tuple[int, int, tuple[int, int]]:
    before_bytes = svg_path.stat().st_size
    imgs = decode_data_uris(svg_path.read_text(encoding="utf-8"))
    if len(imgs) < 2:
        raise RuntimeError(f"Expected 2 embedded bitmaps in {svg_path}")
    mask = imgs[0].convert("L")
    rgb = imgs[1].convert("RGB")
    rgba = rgb.convert("RGBA")
    rgba.putalpha(mask)
    after_bytes, dims = save_webp(rgba, dest_webp, max_size=max_size, quality=quality, alpha_quality=95)
    return before_bytes, after_bytes, dims


def extract_pattern_svg_to_webp(
    svg_path: Path, dest_webp: Path, target_width: int, quality: int = 85
) -> tuple[int, int, tuple[int, int]]:
    before_bytes = svg_path.stat().st_size
    txt = svg_path.read_text(encoding="utf-8")
    imgs = decode_data_uris(txt)
    if not imgs:
        raise RuntimeError(f"No embedded raster found in {svg_path}")
    im = imgs[0]

    m = re.search(
        r'transform="matrix\(([-\d.eE]+)\s+0\s+0\s+([-\d.eE]+)\s+([-\d.eE]+)\s+([-\d.eE]+)\)"',
        txt,
    )
    if m:
        sx, sy, tx, ty = (float(m.group(i)) for i in range(1, 5))
        x0 = max(0, min(im.width - 1, round(-tx / sx)))
        x1 = max(x0 + 1, min(im.width, round((1.0 - tx) / sx)))
        y0 = max(0, min(im.height - 1, round(-ty / sy)))
        y1 = max(y0 + 1, min(im.height, round((1.0 - ty) / sy)))
        im = im.crop((x0, y0, x1, y1))

    after_bytes, dims = save_webp(im, dest_webp, exact_width=target_width, quality=quality)
    return before_bytes, after_bytes, dims


def generate_favicon() -> tuple[int, int]:
    icon_svg = ASSETS / "svg" / "nexusMindLogoIcon.svg"
    before_bytes = icon_svg.stat().st_size
    txt = icon_svg.read_text(encoding="utf-8")
    im = decode_data_uris(txt)[0].convert("RGBA")

    m = re.search(
        r'transform="matrix\(([-\d.eE]+)\s+0\s+0\s+([-\d.eE]+)\s+([-\d.eE]+)\s+([-\d.eE]+)\)"',
        txt,
    )
    if m:
        sx, sy, tx, ty = (float(m.group(i)) for i in range(1, 5))
        x0 = max(0, round(-tx / sx))
        x1 = min(im.width, round((1.0 - tx) / sx))
        y0 = max(0, round(-ty / sy))
        y1 = min(im.height, round((1.0 - ty) / sy))
        im = im.crop((x0, y0, x1, y1))

    im.thumbnail((128, 128), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
    offset = ((128 - im.width) // 2, (128 - im.height) // 2)
    canvas.paste(im, offset, im)

    dest = PUBLIC / "favicon.png"
    canvas.save(dest, format="PNG", optimize=True)
    return before_bytes, dest.stat().st_size


def main() -> None:
    total_before = 0
    total_after = 0
    rows: list[str] = []

    def record(label: str, before_b: int, after_b: int, info: str = "") -> None:
        nonlocal total_before, total_after
        total_before += before_b
        total_after += after_b
        pct = (1.0 - after_b / before_b) * 100 if before_b else 0.0
        rows.append(
            f"{label:<52} {before_b/1024:8.1f} KB -> {after_b/1024:7.1f} KB ({pct:5.1f}% saved) {info}"
        )

    # 1. Hybrid vector + pre-masked WebP navbar/footer/auth logo SVG
    b, a = optimize_hybrid_navbar_logo()
    record("svg/new_nexusmind_logo_full.svg (hybrid)", b, a)

    # 2. Favicon
    b, a = generate_favicon()
    record("svg/nexusMindLogoIcon.svg -> public/favicon.png", b, a, "128x128")

    # 3. Masked Canva SVGs -> RGBA WebP
    for rel_svg, rel_webp, max_sz, q in [
        (
            "svg/new_nexusmind_logo_full_bg_removed_purple.svg",
            "svg/new_nexusmind_logo_full_bg_removed_purple.webp",
            (720, 240),
            90,
        ),
        ("svg/presenting_nexie.svg", "svg/presenting_nexie.webp", (640, 820), 88),
    ]:
        b, a, dims = optimize_masked_canva_svg(ASSETS / rel_svg, ASSETS / rel_webp, max_sz, q)
        record(rel_webp, b, a, f"{dims[0]}x{dims[1]}")

    # 4. Pattern-cropped SVGs -> WebP
    for rel_svg, rel_webp, target_w, q in [
        ("svg/formBannerImage.svg", "svg/formBannerImage.webp", 900, 85),
        ("svg/miniGame01.svg", "svg/miniGame01.webp", 720, 84),
        ("svg/miniGame02.svg", "svg/miniGame02.webp", 720, 84),
        ("svg/miniGame03.svg", "svg/miniGame03.webp", 720, 84),
        ("svg/miniGame04.svg", "svg/miniGame04.webp", 720, 84),
    ]:
        b, a, dims = extract_pattern_svg_to_webp(ASSETS / rel_svg, ASSETS / rel_webp, target_w, q)
        record(rel_webp, b, a, f"{dims[0]}x{dims[1]}")

    # 5. Responsive 1024w + 1920w WebP pairs for full-bleed 2.7K section backgrounds
    for bg_name in [
        "Change_image_color_tones_7440143b_2K.jpg",
        "meditation_bg_img.jpg",
        "partnersbg.jpg",
    ]:
        src_path = ASSETS / "bg" / bg_name
        stem = src_path.stem
        b = src_path.stat().st_size
        im = Image.open(src_path)
        a1024, d1024 = save_webp(im, ASSETS / "bg" / f"{stem}_1024w.webp", exact_width=1024, quality=80)
        a1920, d1920 = save_webp(im, ASSETS / "bg" / f"{stem}_1920w.webp", exact_width=1920, quality=82)
        # Count desktop 1920w against original 2.7K JPG (mobile uses even smaller 1024w!)
        record(
            f"bg/{stem}_{{1024w,1920w}}.webp",
            b,
            a1920,
            f"1024w={a1024/1024:.0f}KB, 1920w={a1920/1024:.0f}KB",
        )

    # 6. Standard raster PNG/JPEG -> right-sized 2x Retina WebP
    raster_specs: list[tuple[str, tuple[int, int], int]] = [
        ("svg/VR_Nexie.png", (960, 1286), 86),
        ("nexie/nexie_pointer_new.png", (1080, 1080), 86),
        ("home.png", (600, 1280), 84),
        ("vr_consultation.png", (840, 840), 84),
        ("purple_bpm_logo_new.jpeg", (560, 184), 88),
        ("nexusmindAppInterface.jpeg", (600, 1300), 82),
        ("pillars_image.png", (768, 768), 82),
        ("analyzing.png", (312, 312), 86),
        ("roadmap01.png", (293, 262), 88),
        ("roadmap02.png", (245, 239), 88),
        ("roadmap03.png", (333, 238), 88),
        ("avatar1.png", (600, 600), 84),
        ("avatar2.png", (600, 600), 84),
        ("avatar3.png", (600, 600), 84),
        ("therapist1.png", (600, 600), 84),
        ("female_avatar.png", (600, 600), 84),
        ("male_avatar.png", (600, 600), 84),
        ("couple.png", (640, 640), 82),
        ("family.png", (640, 640), 82),
        ("friends.png", (640, 640), 82),
        ("single_person.png", (640, 640), 82),
        ("purple_room.png", (640, 640), 82),
    ]

    for i in range(1, 7):
        raster_specs.append((f"ob030{i}.png", (100, 100), 88))
        raster_specs.append((f"ob040{i}.png", (100, 100), 88))

    for p in sorted((ASSETS / "gallery").glob("*.png")):
        raster_specs.append((f"gallery/{p.name}", (900, 900), 82))

    for p in sorted((ASSETS / "news").glob("*.png")):
        raster_specs.append((f"news/{p.name}", (900, 900), 82))

    for rel_src, max_sz, q in raster_specs:
        src_p = ASSETS / rel_src
        dest_p = src_p.with_suffix(".webp")
        b = src_p.stat().st_size
        im = Image.open(src_p)
        a, dims = save_webp(im, dest_p, max_size=max_sz, quality=q)
        record(str(dest_p.relative_to(ASSETS)), b, a, f"{dims[0]}x{dims[1]}")

    print("\n".join(rows))
    print("=" * 96)
    saved_pct = (1.0 - total_after / total_before) * 100
    print(
        f"TOTAL: {total_before/1024/1024:.2f} MB -> {total_after/1024/1024:.2f} MB "
        f"({saved_pct:.1f}% reduction, saved {(total_before - total_after)/1024/1024:.2f} MB)"
    )


if __name__ == "__main__":
    main()
