const logoElement = document.querySelector('#logo');
const mobileNavigationPanel = document.querySelector('#mobile-navigation-panel');
const mobileNavigationButton = document.querySelector('#mobile-navigation-btn');
const mobileNavigationButtonClose = document.querySelector('#mobile-navigation-btn-close');
const aboutSection = document.querySelector('#about-section');
const navbar = document.querySelector('#navbar');

// logoElement.addEventListener('mouseover', () => {
//     if (logoElement.classList.contains('hovered')) {
//         return;
//     }
//     logoElement.classList.add('hovered');

//     setTimeout(() => {
//         logoElement.classList.remove('hovered');
//     }, 1000);
// });


mobileNavigationButton.addEventListener('click', () => {
    mobileNavigationPanel.classList.add('active');
});

mobileNavigationButtonClose.addEventListener('click', () => {
    mobileNavigationPanel.classList.remove('active');
});


function isMobile() {
    return (window.innerWidth < 768) ? true : false;
}


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

let aboutSectionImagesPositions;

function setAboutSectionImagesPositions() {
    if (isMobile()) {
        aboutSectionImagesPositions = {
            image1: {
                x: -80,
                y: -20,  
            },
            image2: {
                x: 0,
                y: -10,
            },
            image3: {
                x: 80,
                y: 10,
            }
        };
    } else {
        aboutSectionImagesPositions = {
            image1: {
                x: -60,
                y: -30, 
            },
            image2: {
                x: 0,
                y: 0,
            },
            image3: {
                x: 50,
                y: 50,
            }
        };
    }
}

window.addEventListener('resize', function() {
    isMobile();
    setAboutSectionImagesPositions();
});

setAboutSectionImagesPositions();

function scrollReveal() {

    let scrollPosition = window.scrollY / window.innerHeight; // 0 = home section   1 = about section   2 = number section
    let elem;
    let tunedValue;

    /* check if scroll is near a perfect stop at a section */
    /* == check if scrollPosition is near an integer */
    if (scrollPosition % 1 < 0.05 || scrollPosition % 1 > 0.95) {
        navbar.classList.remove('scrolled');
    }
    else {
        navbar.classList.add('scrolled');
    }

    // Logo
    tunedValue = mapRange(scrollPosition, 0.0, 0.5); // Invert the value
    elem = document.querySelector('#logo');
    elem.style.transform = 'rotate(' + tunedValue * 360 + 'deg)';

    // Image overlay
    tunedValue = mapRange(scrollPosition, 0.2, 0.8);
    elem = document.querySelector('#image-overlay');
    elem.style.opacity = (tunedValue - 1 * -1);  // Invert the value (1 becomes 0 and 0 becomes 1)
    elem.style.transform = 'translate(' + (isMobile() ? -50 : 5) + '%,' + (30 + tunedValue * 50) + '%)';

    // About section title
    tunedValue = mapRange(scrollPosition, 0.3, 0.5);
    elem = document.querySelector('.scroll-reveal-title span');
    elem.style.backgroundSize = tunedValue * 100 + '% 100%';
    
    // text
    tunedValue = mapRange(scrollPosition, 0.5, 1);
    elem = document.querySelector('.scroll-reveal-text');
    elem.style.backgroundSize = tunedValue * 100 + '% 100%';

    // Images
    tunedValue = mapRange(scrollPosition, 0.5, 1);
    elem = document.querySelector('.image1');
    elem.style.transform = 'translate(' + tunedValue * aboutSectionImagesPositions.image1.x + '%, ' + tunedValue * aboutSectionImagesPositions.image1.y + '%) rotate(-10deg)';
    elem = document.querySelector('.image2');
    elem.style.transform = 'translate(' + tunedValue * aboutSectionImagesPositions.image2.x + '%, ' + tunedValue * aboutSectionImagesPositions.image2.y + '%) rotate(' + tunedValue * 5 + 'deg)';
    elem = document.querySelector('.image3');
    elem.style.transform = 'translate(' + tunedValue * aboutSectionImagesPositions.image3.x + '%, ' + tunedValue * aboutSectionImagesPositions.image3.y + '%) rotate(10deg)';

    if (tunedValue >= 1) {
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(elem => {
            elem.style.transitionDuration = '.3s';
            elem.classList.add('hover-allowed');
        });
    } else {
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(elem => {
            elem.style.transitionDuration = '0s';
            elem.classList.remove('hover-allowed');
        });
    }

    // Numbers section title 
    tunedValue = mapRange(scrollPosition, 1.4, 2);
    elem = document.querySelector('.scroll-reveal-numbers-section-title span');
    elem.style.backgroundSize = tunedValue * 100 + '% 100%';

}

scrollReveal();


function borderEffect(e) {
    // have radial gradient follow mouse
    let x = e.clientX;
    let y = e.clientY;
    const elemBoundingClientRect = this.getBoundingClientRect();
    this.style.setProperty('--gradientX', (mapRange(x, elemBoundingClientRect.left, elemBoundingClientRect.left + elemBoundingClientRect.width) * 100) + '%');
    this.style.setProperty('--gradientY', (mapRange(y, elemBoundingClientRect.top, elemBoundingClientRect.top + elemBoundingClientRect.height) * 100) + '%');
};

function borderEffectEnd() {
    this.style.setProperty('--gradientX', '-100%');
    this.style.setProperty('--gradientY', '-100%');
}

let elements = document.getElementsByClassName('number-container');

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('mousemove', borderEffect, false)
    elements[i].addEventListener('mouseleave', borderEffectEnd, false);
}