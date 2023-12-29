const logoElement = document.querySelector('#logo');
const mobileNavigationPanel = document.querySelector('#mobile-navigation-panel');
const mobileNavigationButton = document.querySelector('#mobile-navigation-btn');
const mobileNavigationButtonClose = document.querySelector('#mobile-navigation-btn-close');
const aboutSection = document.querySelector('#about-section');
const navbar = document.querySelector('#navbar');

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

// Linear interpolation. It's used to map a value from one range to another.
function mapRange(value, inputMin, inputMax) {
    const outputMin = 0;
    const outputMax = 1;

    // Ensure the value is within the input range
    value = Math.max(inputMin, Math.min(inputMax, value));

    // Map the value from the input range to the output range
    return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
}


window.addEventListener('scroll', function() {
    scrollReveal();
});

function scrollReveal() {

    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
    }


    let scrollPosition = window.scrollY / (document.body.offsetHeight - window.innerHeight);
    let textElement;
    let tunedValue;

    // Logo
    tunedValue = mapRange(scrollPosition, 0.0, 0.5); // Invert the value
    textElement = document.querySelector('#logo');
    textElement.style.transform = 'rotate(' + tunedValue * 360 + 'deg)';

    // Image overlay
    tunedValue = (mapRange(scrollPosition, 0.2, 0.8) - 1) * -1; // Invert the value
    textElement = document.querySelector('#image-overlay');
    textElement.style.opacity = tunedValue;

    // Title
    tunedValue = mapRange(scrollPosition, 0.3, 0.5);
    textElement = document.querySelector('.scroll-reveal-title');
    textElement.style.backgroundSize = tunedValue * 100 + '% 100%';
    
    // Text
    tunedValue = window.scrollY / (document.body.offsetHeight - window.innerHeight);
    scrollPosition = mapRange(scrollPosition, 0.5, 1);
    textElement = document.querySelector('.scroll-reveal-text');
    textElement.style.backgroundSize = tunedValue * 100 + '% 100%';
}

scrollReveal();