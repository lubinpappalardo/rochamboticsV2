const logoElement = document.querySelector('#logo');
const mobileNavigationPanel = document.querySelector('#mobile-navigation-panel');
const mobileNavigationButton = document.querySelector('#mobile-navigation-btn');
const mobileNavigationButtonClose = document.querySelector('#mobile-navigation-btn-close');

logoElement.addEventListener('mouseover', () => {
    if (logoElement.classList.contains('hovered')) {
        return;
    }
    logoElement.classList.add('hovered');

    setTimeout(() => {
        logoElement.classList.remove('hovered');
    }, 1000);
});

mobileNavigationButton.addEventListener('click', () => {
    mobileNavigationPanel.classList.add('active');
});

mobileNavigationButtonClose.addEventListener('click', () => {
    mobileNavigationPanel.classList.remove('active');
});