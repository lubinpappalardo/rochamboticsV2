// Get all #member elements
const members = document.querySelectorAll('.member');
let paused;

// Add click event listener to the document
document.addEventListener('click', () => {
    // Stop all animations
    paused = !paused;
    members.forEach(member => {
        member.style.animationPlayState = paused ? 'paused' : 'running';
    });
});



( function( $ ) {

	"use strict";

    $('.member-container').tilt({
        maxTilt: 15,
        perspective: 1400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 1200,
        glare: true,
        maxGlare: 0.2,
        scale: 1.04
    });
  
}( jQuery ) );