document.addEventListener("DOMContentLoaded", function () {
    // 1. Initialiser chaque conteneur d'onglets de manière indépendante
    function setupTabGroup(navContainer) {
        const tabs = navContainer.querySelectorAll("a[data-toggle='tab']");
        // On cherche le conteneur parent commun (ex: main ou .popup-container)
        const parentScope = navContainer.closest("main, .popup-container") || document.body;
        const panes = parentScope.querySelectorAll(":scope > .tab-pane, .tab-pane");

        if (!tabs.length) return;

        function activateTab(targetId) {
            tabs.forEach(tab => {
                const isActive = tab.getAttribute("href") === targetId;
                tab.classList.toggle("active", isActive);
            });

            panes.forEach(pane => {
                // On n'active que les panneaux appartenant au même groupe/parent
                if (Array.from(tabs).some(t => t.getAttribute("href") === "#" + pane.id)) {
                    const isVisible = "#" + pane.id === targetId;
                    pane.classList.toggle("active", isVisible);
                    pane.style.display = isVisible ? "block" : "none";
                }
            });
        }

        tabs.forEach(tab => {
            tab.addEventListener("click", function (event) {
                event.preventDefault();
                const targetId = this.getAttribute("href");
                activateTab(targetId);

                // On met à jour l'URL uniquement pour la page principale, pas la pop-up
                if (!navContainer.closest("#popupOverlay")) {
                    history.replaceState(null, "", targetId);
                }
            });
        });

        // Activation initiale : hash d'URL pour le contenu principal, premier onglet pour la pop-up
        if (!navContainer.closest("#popupOverlay") && window.location.hash) {
            const matchingTab = Array.from(tabs).find(t => t.getAttribute("href") === window.location.hash);
            if (matchingTab) {
                activateTab(window.location.hash);
                return;
            }
        }

        // Par défaut, activer le premier onglet du groupe
        const defaultHref = tabs[0].getAttribute("href");
        activateTab(defaultHref);
    }

    // Appliquer à chaque liste d'onglets présente dans le document
    document.querySelectorAll(".centre").forEach(setupTabGroup);
});