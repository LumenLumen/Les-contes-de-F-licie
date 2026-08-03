document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".centre a[data-toggle='tab']");
    const panes = document.querySelectorAll(".tab-pane");

    if (!tabs.length || !panes.length) return;

    const normalizeHash = value => value.startsWith("#") ? value : "#" + value;
    const tabTargets = Array.from(tabs)
        .map(tab => tab.getAttribute("href"))
        .filter(Boolean)
        .map(normalizeHash);

    const defaultTab = tabTargets[0] || "#user_lang_en";

    function activateTab(targetId) {
        const normalizedTarget = normalizeHash(targetId);
        const validId = tabTargets.includes(normalizedTarget) ? normalizedTarget : defaultTab;

        tabs.forEach(tab => {
            const isActive = normalizeHash(tab.getAttribute("href")) === validId;
            tab.classList.toggle("active", isActive);
        });

        panes.forEach(pane => {
            const isVisible = "#" + pane.id === validId;
            pane.classList.toggle("active", isVisible);
            pane.style.display = isVisible ? "block" : "none";
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            activateTab(href);
            history.replaceState(null, "", href);
        });
    });

    activateTab(window.location.hash || defaultTab);
});