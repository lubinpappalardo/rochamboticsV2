const logoElement = document.querySelector('#logo');
const aboutSection = document.querySelector('#about-section');
const navbar = document.querySelector('#navbar');

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

    // Numbers section gears
    tunedValue = mapRange(scrollPosition, 1.3, 1.9);
    elem = document.querySelector('#inner-gear');
    elem.style.scale = tunedValue;

    tunedValue = mapRange(scrollPosition, 1.1, 1.9);
    elem = document.querySelector('#outer-gear');
    elem.style.scale = tunedValue;

}

scrollReveal();


const numbersContainer = document.querySelector('.numbers-container');
const arrowLeft = document.querySelector('#number-left-arrow');
const arrowRight = document.querySelector('#number-right-arrow');
const innerGear = document.querySelector('#inner-gear');
const outerGear = document.querySelector('#outer-gear');

let currentNumberIndex = 0;

const numbers = [
    {
        number: '8',
        alt: 'members in our team'
    },
    {
        number: '7',
        alt: 'nationalities in our team'
    },
    {
        number: '2',
        alt: 'seasons we participated in'
    },
    {
        number: '1+',
        alt: 'years, age of the club'
    },
    {
        number: '2',
        alt: 'competitions we participated in'
    },
    {
        number: '1',
        alt: 'award won'
    }
]

let currentNumber;
let oldNumber;
let isThrottled = false;
let throttleDuration = 500;
const numberAlt = document.getElementById('number-alt');

function appendNumber() {
    const divElement = document.createElement('div');
    divElement.classList.add('number');
    divElement.textContent = numbers[currentNumberIndex].number;
    currentNumber = numbersContainer.appendChild(divElement);
    numberAlt.textContent = numbers[currentNumberIndex].alt.toUpperCase();
    setTimeout(() => {
        hackText(numbers[currentNumberIndex].alt.toUpperCase());
    }, 0);
    //numberAlt.getElementById('number-alt').textContent = numbers[currentNumberIndex].alt;
}


const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let hackedTextInterval = null;

function hackText(targetValue) {
    let iteration = 0;
    const words = targetValue.split(" ");
    
    clearInterval(hackedTextInterval);
    
    hackedTextInterval = setInterval(() => {
        numberAlt.innerText = words
        .map((word, wordIndex) => {
            return word
            .split("")
            .map((letter, letterIndex) => {
                if(letterIndex < iteration) {
                    return letter;
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        })
        .join(" ");
        
        if(iteration >= targetValue.length){ 
            clearInterval(hackedTextInterval);
        }
        
        iteration += 1 / 3;
    }, 30);
}



appendNumber();
currentNumber.style.transitionDuration = '.5s';


arrowRight.addEventListener('click', () => {

    if (isThrottled) {
        return;
    }

    isThrottled = true;
    oldNumber = currentNumber;
    oldNumber.style.filter = 'blur(10px)';
    oldNumber.style.opacity = '0';
    oldNumber.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        oldNumber.remove();
        isThrottled = false;
    }, 500);

    if (currentNumberIndex >= numbers.length - 1) {
        currentNumberIndex = 0;
    } else {
        currentNumberIndex++;
    }

    appendNumber();

    currentNumber.style.filter = 'blur(10px)';
    currentNumber.style.opacity = '0';
    currentNumber.style.transform = 'translateX(100%)';
    currentNumber.style.transitionDuration = '.5s';
    setTimeout(() => {
        currentNumber.style.filter = 'none';
        currentNumber.style.opacity = '1';
        currentNumber.style.transform = 'translateX(0%)';
    }, 0);
    
    gearSpinAnimation();  
});


arrowLeft.addEventListener('click', () => {

    if (isThrottled) {
        return;
    }

    isThrottled = true;
    oldNumber = currentNumber;
    oldNumber.style.filter = 'blur(10px)';
    oldNumber.style.opacity = '0';
    oldNumber.style.transform = 'translateX(100%)';
    setTimeout(() => {
        oldNumber.remove();
        isThrottled = false;
    }, 500);


    if (currentNumberIndex <= 0) {
        currentNumberIndex = numbers.length - 1;
    } else {
        currentNumberIndex--;
    }

    appendNumber();
    
    currentNumber.style.filter = 'blur(10px)';
    currentNumber.style.opacity = '0';
    currentNumber.style.transform = 'translateX(-100%)';
    currentNumber.style.transitionDuration = '.5s';
    setTimeout(() => {
        currentNumber.style.filter = 'none';
        currentNumber.style.opacity = '1';
        currentNumber.style.transform = 'translateX(0%)';
    }, 0);

    gearSpinAnimation();    
});




let rotationDegree = 0; // Adjust the rotation speed as desired
let gearRotationSpeed = 0.1; // Adjust the rotation speed as desired

// Function to rotate the gears
function rotateGears() {
    rotationDegree += gearRotationSpeed;
    innerGear.style.transform = `rotate(${rotationDegree}deg)`;
    outerGear.style.transform = `rotate(${rotationDegree * -1}deg)`;
}

// Call the rotateGears function periodically to continuously rotate the gears
setInterval(rotateGears, 10); // Adjust the interval as desired

let gearRotationInterval;

function gearSpinAnimation() {
    if (gearRotationInterval) {
        return;
    }

    let increment = 0.05;
    let targetSpeed = -2;
    gearRotationInterval = setInterval(() => {
        if (gearRotationSpeed > targetSpeed) {
            gearRotationSpeed -= increment;
        } else {
            clearInterval(gearRotationInterval);

            targetSpeed = 0.1;
            gearRotationInterval = setInterval(() => {
                if (gearRotationSpeed < targetSpeed) {
                    gearRotationSpeed += increment;
                } else {
                    clearInterval(gearRotationInterval);
                    gearRotationInterval = null;
                }
            }, 10);
        }
    }, 10);
}