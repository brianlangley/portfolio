// Roles
const roles = ['Software Developer', 'Front End Developer', 'Bit Academy Student'];
const title = document.querySelector('#roles');
let index = 0; // Initialize index to 0
setInterval(() => {
    gsap.to(title, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            title.innerHTML = roles[index]; // Set innerHTML to the role at current index
            gsap.to(title, { opacity: 1, duration: 1 });
            index = (index + 1) % roles.length; // Increment index and wrap around to 0 when it reaches the end of the list
        },
    });
}, 5000);
