# Softminilabs

独立 iOS 工作室的作品展示站，Jekyll 构建，托管在 GitHub Pages。

地址：[https://softminilabs.github.io/](https://softminilabs.github.io/)

## 结构

- `_data/apps.yml`：所有 App 的名称、一句话介绍、分类、图标与 App Store ID。首页、详情页、sitemap 都从这里读。
- `<app-id>.md`：每个 App 一个详情页，中英文正文各一个 `data-lang` 块。
- `assets/images/icons/`：512px 图标；`assets/images/screenshots/`：750px webp 截图，命名 `<id>_<zh|en>_<n>.webp`。
- `privacy.html`、`terms.html`：地址被各 App 引用，不要改名或移动。

## 加一个 App

1. 在 `_data/apps.yml` 顶部加一条（新的在前）。
2. 放图标到 `assets/images/icons/`，两张中文两张英文截图到 `assets/images/screenshots/`。
3. 复制任一 `<app-id>.md` 改成新页面。
4. 跑一次字体子集（见下）。

## 字体

中文用思源宋体（Noto Serif SC，OFL），按站内实际用到的字子集化后自托管在 `assets/fonts/`。改过中文文案后重新生成：

```bash
pip3 install fonttools brotli
python3 tools/build_fonts.py
```

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```
