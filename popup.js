// Gestion du popup au chargement
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popupOverlay');
    const mainContent = document.getElementById('mainContent');
    const popupAccept = document.getElementById('popupAccept');
    const popupReject = document.getElementById('popupReject');

    // Bouton Valider/Continuer
    popupAccept.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        mainContent.style.display = 'block';
    });

    // Bouton Quitter/Retour
    popupReject.addEventListener('click', function() {
        window.location.href = '../..';
    });

    // Prévenir l'accès au contenu avant validation du popup
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            //e.preventDefault();
        }
    });
});