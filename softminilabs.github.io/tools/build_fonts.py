#!/usr/bin/env python3
"""把思源宋体（Noto Serif SC）按站内实际用到的汉字子集化成 woff2。

改了任何中文文案之后跑一次：
    python3 tools/build_fonts.py

依赖：pip3 install fonttools brotli
源字体缓存在 ~/.cache/softminilabs-fonts/，没有会自动从 GitHub 下载。
"""
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "fonts"
CACHE = Path.home() / ".cache" / "softminilabs-fonts"

SOURCE = "https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/SC/"
WEIGHTS = {
    "NotoSerifSC-Regular.otf": "serif-sc-regular.woff2",
    "NotoSerifSC-SemiBold.otf": "serif-sc-semibold.woff2",
}

SCAN = ["*.html", "*.md", "_layouts/*.html", "_includes/*.html", "_data/*.yml", "assets/js/*.js"]
# 和 style.css 里 @font-face 的 unicode-range 保持一致
CJK = re.compile(r"[⺀-⻿　-〿㐀-䶿一-鿿豈-﫿︰-﹏＀-￯]")
# 页面里没出现、但以后很可能用到的标点，一起带上
EXTRA = "，。、；：？！「」『』（）《》〈〉【】—…·～"


def collect_chars() -> str:
    chars = set(EXTRA)
    for pattern in SCAN:
        for path in ROOT.glob(pattern):
            if "_site" in path.parts:
                continue
            chars.update(CJK.findall(path.read_text(encoding="utf-8")))
    return "".join(sorted(chars))


def ensure_source(name: str) -> Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    target = CACHE / name
    if not target.exists():
        print(f"downloading {name} ...")
        urllib.request.urlretrieve(SOURCE + name, target)
    return target


def main() -> int:
    try:
        import fontTools  # noqa: F401
        import brotli  # noqa: F401
    except ImportError:
        print("需要先安装：pip3 install fonttools brotli", file=sys.stderr)
        return 1

    text = collect_chars()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    text_file = OUT_DIR / "chars.txt"
    text_file.write_text(text, encoding="utf-8")
    print(f"{len(text)} chars")

    for src_name, out_name in WEIGHTS.items():
        src = ensure_source(src_name)
        out = OUT_DIR / out_name
        subprocess.run([
            sys.executable, "-m", "fontTools.subset", str(src),
            f"--text-file={text_file}",
            f"--output-file={out}",
            "--flavor=woff2",
            "--layout-features=*",
            "--no-hinting",
            "--desubroutinize",
        ], check=True)
        print(f"{out_name}: {out.stat().st_size // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
