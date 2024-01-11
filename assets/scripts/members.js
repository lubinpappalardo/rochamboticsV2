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

const shift_strenght = 10;

members.forEach(member => {
    member.addEventListener("mousemove", function (event) {
        var card = member;
        var positionInfo = card.getBoundingClientRect();

        var mouseX = event.clientX - positionInfo.left;
        var mouseY = event.clientY - positionInfo.top;

        var x_percent = (mouseX / positionInfo.width) * 100;
        var y_percent = (mouseY / positionInfo.height) * 100;

        card.style.setProperty("--reflectionX", x_percent + "%");
        card.style.setProperty("--reflectionY", y_percent + "%");
    });

    member.addEventListener("mouseout", function (event) {
        var card = member;
        card.style.setProperty("--opacity", "0");
    });

    member.addEventListener("mousemove", function (event) {
        var card = member;
        card.style.setProperty("--opacity", "0.5");
    });
    //     var card = member;
    //     card.style.transitionDuration = "1s";
    //     card.style.setProperty("--transition", "1s");
    //     card.style.setProperty("--shiftX", "0deg");
    //     card.style.setProperty("--shiftY", "0deg");
    // });
});
