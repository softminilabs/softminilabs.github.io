const translations = {
    en: {
        navTerms: "Terms of Service",
        navPrivacy: "Privacy Policy",
        navContact: "Contact",
        heroKicker: "Independent iPhone Utilities",
        heroTitle: "Small apps, carefully made for daily use.",
        heroDescription: "Softminilabs builds focused tools for scanning, counting, prompting, lighting, and staying in flow. Each app keeps the interface simple and the purpose clear.",
        sectionLabel: "Selected Work",
        appsTitle: "Apps",
        qrcodeDescription: "Fast QR and barcode scanning for everyday use.",
        counterDescription: "A simple tally counter for tracking counts clearly.",
        ligitDescription: "A lightweight flashlight tool with a clean interface.",
        aipromptDescription: "Prompt ideas and writing support for AI workflows.",
        zenpomoDescription: "Pomodoro focus sessions designed for calm, steady work.",
        openAppStore: "Open App Store",
        htmlLang: "en",
        langToggle: "中文",
        otherApps: "Other apps from Softminilabs"
    },
    zh: {
        navTerms: "服务条款",
        navPrivacy: "隐私政策",
        navContact: "联系我们",
        heroKicker: "独立 iPhone 工具应用",
        heroTitle: "为日常使用认真打磨的小应用。",
        heroDescription: "Softminilabs 专注于扫描、计数、提示词、照明与专注类工具。每个应用都保持清晰目的和简洁体验。",
        sectionLabel: "精选作品",
        appsTitle: "应用列表",
        qrcodeDescription: "快速扫描二维码和条形码，适合日常使用。",
        counterDescription: "简洁直观的计数工具，适合日常记录与统计。",
        ligitDescription: "轻量好用的手电筒工具，界面干净直接。",
        aipromptDescription: "为 AI 工作流提供提示词灵感与写作辅助。",
        zenpomoDescription: "帮助你平静进入节奏的番茄钟专注应用。",
        openAppStore: "前往 App Store",
        htmlLang: "zh-CN",
        langToggle: "EN",
        otherApps: "Softminilabs 的其他应用"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const languageButton = document.querySelector("[data-language-toggle]");
    const translatableNodes = document.querySelectorAll("[data-i18n]");

    function applyLanguage(language) {
        const locale = translations[language] || translations.en;
        document.documentElement.lang = locale.htmlLang;
        translatableNodes.forEach((node) => {
            const key = node.dataset.i18n;
            if (locale[key]) {
                node.textContent = locale[key];
            }
        });

        // Dual-Language Screenshot swap logic
        const i18nImages = document.querySelectorAll("[data-i18n-src-en]");
        i18nImages.forEach(img => {
            if (language === "zh" && img.dataset.i18nSrcZh) {
                img.src = img.dataset.i18nSrcZh;
            } else {
                img.src = img.dataset.i18nSrcEn;
            }
        });
        
        if (languageButton) {
            languageButton.textContent = locale.langToggle;
        }
        localStorage.setItem("Softminilabs-language", language);
    }

    const savedLanguage = localStorage.getItem("Softminilabs-language");
    const browserPrefersZh = (navigator.language || "").toLowerCase().startsWith("zh");
    const initialLanguage = savedLanguage ? savedLanguage : (browserPrefersZh ? "zh" : "en");
    applyLanguage(initialLanguage);

    if (languageButton) {
        languageButton.addEventListener("click", () => {
            const nextLanguage = document.documentElement.lang === "zh-CN" ? "en" : "zh";
            applyLanguage(nextLanguage);
        });
    }
});
