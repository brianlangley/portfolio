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

// Nav
const navBurger = document.getElementById('navBurger');
const navContainer = document.getElementById('nav-container');
const burgerIcon = document.querySelector('.burger');

navBurger.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    navBurger.classList.toggle('active');

    if (navContainer.classList.contains('active')) {

        // Make html and body background color black
        document.documentElement.style.backgroundColor = 'black';
        document.body.style.backgroundColor = 'black';

        // Gsap fade-in animation
        gsap.fromTo(navContainer, { opacity: 0 }, { opacity: 1, duration: 1 });
        const navLinks = document.getElementById('navLinks');
        const navInfo = document.getElementById('navInfo');
        const navName = document.getElementById('navName');

        // For each anchor link in navLinks, apply a one-by-one GSAP animation
        navLinks.querySelectorAll('a').forEach((link, index) => {
            // GSAP appear from top animation
            gsap.fromTo(
                link,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: index * 0.25 }
            );
        });

        // For each anchor link in navInfo, apply a one-by-one GSAP animation
        navInfo.querySelectorAll('a').forEach((link, index) => {
            // Load from left animation
            gsap.fromTo(
                link,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, delay: index * 0.25 }
            );
        });

        // navName fade-in animation
        gsap.fromTo(navName, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });

        // Change burger icon color to white
        burgerIcon.classList.add('active');

        // Disable scrolling
        document.body.style.overflow = 'hidden';
    } else {

        // Change back to the default background color (or any other desired color)
        document.documentElement.style.backgroundColor = '';
        document.body.style.backgroundColor = '';

        // Gsap fade-out animation when closing the menu
        gsap.to(navContainer, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                navLinks.querySelectorAll('a').forEach((link) => {
                    gsap.set(link, { clearProps: 'all' }); // Clear GSAP properties to reset the initial state
                });

                navInfo.querySelectorAll('a').forEach((link) => {
                    gsap.set(link, { clearProps: 'all' }); // Clear GSAP properties to reset the initial state
                });

                gsap.set(navName, { clearProps: 'all' }); // Clear GSAP properties to reset the initial state
            },
        });

        // Change burger icon color back to black
        burgerIcon.classList.remove('active');

        // Enable scrolling
        document.body.style.overflow = 'auto';
    }
});

// Mobile
// JavaScript code to implement hover color effects for burger icon on touch-based devices
const burger = document.querySelector('.burger');

burger.addEventListener('touchstart', () => {
    burger.classList.add('active');
});

burger.addEventListener('touchend', () => {
    burger.classList.remove('active');
});
