// 语言切换：只改 <html lang>，中英文内容的显隐由 CSS 的 [data-lang] 规则完成
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("[data-language-toggle]");
    const root = document.documentElement;

    function apply(language) {
        root.lang = language === "zh" ? "zh-CN" : "en";
        if (button) button.textContent = language === "zh" ? "EN" : "中文";
        try { localStorage.setItem("Softminilabs-language", language); } catch (e) {}
    }

    apply(root.lang === "en" ? "en" : "zh");

    if (button) {
        button.addEventListener("click", () => {
            apply(root.lang === "zh-CN" ? "en" : "zh");
        });
    }
});
