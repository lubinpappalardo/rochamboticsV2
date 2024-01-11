const mobileNavigationPanel = document.querySelector('#mobile-navigation-panel');
const mobileNavigationButton = document.querySelector('#mobile-navigation-btn');
const mobileNavigationButtonClose = document.querySelector('#mobile-navigation-btn-close');

mobileNavigationButton.addEventListener('click', () => {
    mobileNavigationPanel.classList.add('active');
});

mobileNavigationButtonClose.addEventListener('click', () => {
    mobileNavigationPanel.classList.remove('active');
});
