const logoElement = document.querySelector('#logo');

logoElement.addEventListener('mouseover', () => {
    if (logoElement.classList.contains('hovered')) {
        return;
    }
    logoElement.classList.add('hovered');

    setTimeout(() => {
        logoElement.classList.remove('hovered');
    }, 1000);
});
