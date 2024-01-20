const loadingScreen = document.querySelector('#loading-screen');

window.addEventListener('load', () => {
    loadingScreen.style.opacity = 0;
    loadingScreen.style.filter = 'blur(20px)';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
});