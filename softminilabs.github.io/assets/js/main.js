// 没有英文地址的页面（404）仍用页内切换：只改 <html lang>，中英文显隐由 CSS 的 [data-lang] 规则完成
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("[data-language-toggle]");
    if (!button) return;
    const root = document.documentElement;

    function apply(language) {
        root.lang = language === "zh" ? "zh-CN" : "en";
        button.textContent = language === "zh" ? "EN" : "中文";
        try { localStorage.setItem("Softminilabs-language", language); } catch (e) {}
    }

    apply(root.lang === "en" ? "en" : "zh");

    button.addEventListener("click", () => {
        apply(root.lang === "zh-CN" ? "en" : "zh");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelector("[data-filters]");
    if (!filters) return;
    const items = document.querySelectorAll(".app-list [data-category]");

    filters.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        const category = button.dataset.filter;
        filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        items.forEach((item) => { item.hidden = category !== "" && item.dataset.category !== category; });
    });
});

// 中英文是两套地址：点切换链接时记住选择，下次打开任一页面会直接跳到对应语言
document.addEventListener("DOMContentLoaded", () => {
    const link = document.querySelector("[data-language-switch]");
    if (!link) return;
    link.addEventListener("click", () => {
        try { localStorage.setItem("Softminilabs-language", link.dataset.languageSwitch); } catch (e) {}
    });
});
