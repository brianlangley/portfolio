const nav = document.querySelector('.navbar');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const cursor = document.querySelector('.cursor');
const bigBall = document.querySelector('.cursorXL');
const smallBall = document.querySelector('.cursorSM');
const hoverables = document.querySelectorAll('.hoverable');
const startMouse = document.getElementById('startMouse');
const projectsSection = document.querySelector("#projects");
const projectTitle = document.querySelector("#project-title");
const sectionsContact = document.querySelectorAll('#contact');
const sectionsAbout = document.querySelectorAll('#about');

document.body.style.cursor = 'none'; // Hide mouse cursor

// Touch screen detection, disable the cursor
if ('ontouchstart' in window) {
    document.body.style.cursor = 'default';
    cursor.style.display = 'none';
    bigBall.style.display = 'none';
    smallBall.style.display = 'none';
}

// Check if preloader has played
const preloaderPlayed = sessionStorage.getItem('preloader') === 'true';

// Fade in effect with gsap
if (preloaderPlayed) {
    gsap.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 3, delay: 2 });
    gsap.from(home, { opacity: 0, duration: 2, delay: 1, y: -120 });
} else {
    gsap.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 1, delay: 9 });
    gsap.from(home, { opacity: 0, duration: 4, delay: 16, y: 60 });
}

TweenMax.set(bigBall, {
    x: startMouse.getBoundingClientRect().left - 15,
    y: startMouse.getBoundingClientRect().top - 15
});

TweenMax.set(smallBall, {
    x: startMouse.getBoundingClientRect().left - 5,
    y: startMouse.getBoundingClientRect().top - 14
});

function onMouseMove(e) {
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    TweenMax.to(bigBall, 0.4, {
        x: e.clientX - 15 + scrollX,
        y: e.clientY - 15 + scrollY
    });

    TweenMax.to(smallBall, 0.1, {
        x: e.clientX - 5 + scrollX,
        y: e.clientY - 14 + scrollY
    });
}

function onMouseHoverOut() {
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    TweenMax.to(bigBall, 0.3, {
        scale: 1,
        x: scrollX,
        y: scrollY
    });
}

function onMouseDown() {
    TweenMax.to(bigBall, 0.3, {
        scale: 0
    });
}

function onMouseUp() {
    TweenMax.to(bigBall, 0.3, {
        scale: 1
    });
}

function onMouseHover() {
    TweenMax.to(bigBall, 0.3, {
        scale: 2
    });
}

document.body.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', onMouseHover);
    hoverable.addEventListener('mouseleave', onMouseHoverOut);
});

document.addEventListener('selectstart', e => {
    e.preventDefault();
});

window.addEventListener('mousemove', onMouseMove);

// Function to animate the articles in the #projects section
function animateArticles() {
    const articles = [document.querySelector("#project1"), document.querySelector("#project2"), document.querySelector("#project3"), document.querySelector('#project4'), document.querySelector("#githubLink")];

    articles.forEach((article, index) => {
        let direction = index % 2 === 0 ? "100%" : "-100%";
        gsap.from(article, {
            scrollTrigger: {
                trigger: article,
                start: "top 75%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
            },
            x: direction,
            opacity: 0,
            duration: 1,
            delay: index * 0.5,
        });
    });
}

// Function to initialize the animations when the #projects section is in view
function initProjectAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateArticles();
                    observer.unobserve(projectsSection);
                }
            });
        },
        { rootMargin: "0px" }
    );

    observer.observe(projectsSection);
}

// Function to animate the project title
function animateProjectTitle() {
    gsap.from(projectTitle, {
        scrollTrigger: {
            trigger: projectTitle,
            start: "top 80%",
            end: "bottom 80%",
            toggleActions: "play none none reverse",
        },
        opacity: 0,
        duration: 1,
    });
}

// Call the initialization functions once the document is ready
document.addEventListener("DOMContentLoaded", function () {
    initProjectAnimations();
    animateProjectTitle();

    // Animate sections in the 'contact' category
    sectionsContact.forEach(section => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(section, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 40%',
                end: 'bottom 80%',
                toggleActions: 'play none none reverse',
            }
        });
    });

    // Animate sections in the 'about' category
    sectionsAbout.forEach(section => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(section, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 80%',
                toggleActions: 'play none none reverse',
            }
        });
    });
});
