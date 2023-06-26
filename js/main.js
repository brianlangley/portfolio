const nav = document.querySelector('.navbar');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const cursor = document.querySelector('.cursor');

// Touch screen detection, disable the cursor
if ('ontouchstart' in window) {
    document.body.style.cursor = 'default';
    // Disable the cursor
    cursor.style.display = 'none';
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

document.body.style.cursor = 'none';
const bigBall = document.querySelector('.cursorXL');
const smallBall = document.querySelector('.cursorSM');
const hoverables = document.querySelectorAll('.hoverable');
const startMouse = document.getElementById('startMouse');

TweenMax.set(bigBall, {
    x: startMouse.getBoundingClientRect().left - 15,
    y: startMouse.getBoundingClientRect().top - 15
});

TweenMax.set(smallBall, {
    x: startMouse.getBoundingClientRect().left - 5,
    y: startMouse.getBoundingClientRect().top - 14
});

document.body.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', onMouseHover);
    hoverable.addEventListener('mouseleave', onMouseHoverOut);
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

document.addEventListener('selectstart', e => {
    e.preventDefault();
});

window.addEventListener('mousemove', onMouseMove);

if ('ontouchstart' in window) {
    bigBall.style.display = 'none';
    smallBall.style.display = 'none';
    document.body.style.cursor = 'default';
}

const scrollEffect = gsap.from(about, { x: '-100%', opacity: 0, duration: 1, paused: true });
const isSmallScreen = window.innerWidth < 800;
let isScrolling = false;
let lastScrollTop = 0;

if (!isSmallScreen) {
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop) {
            // Scrolling down
            if (!isScrolling) {
                scrollEffect.play();
                isScrolling = true;
            }
        }

        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            isScrolling = false;
        }, 500);

        lastScrollTop = st <= 0 ? 0 : st;
    });
} else {
    setTimeout(() => {
        scrollEffect.play();
    }, 1000);
}

// Function to animate the articles
function animateArticles() {
    const article1 = document.querySelector("#project1");
    const article2 = document.querySelector("#project2");
    const article3 = document.querySelector("#project3");
    const github = document.querySelector("#githubLink");

    const articles = [article1, article2, article3, github];

    articles.forEach((article, index) => {
        let direction = index % 2 === 0 ? "100%" : "-100%";
        gsap.from(article, {
            scrollTrigger: {
                trigger: article,
                start: "top 80%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
            },
            x: direction,
            opacity: 0,
            duration: 1,
            delay: index * 0.5, // Adjust the delay value as desired
        });
    });
}

// Function to initialize the animations when the #projects section is in view
function initProjectAnimations() {
    const projectsSection = document.querySelector("#projects");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateArticles();
                    observer.unobserve(projectsSection); // Stop observing once the animations are triggered
                }
            });
        },
        { rootMargin: "0px" } // Adjust the rootMargin value as desired
    );

    observer.observe(projectsSection);
}

// Function to animate the project title
function animateProjectTitle() {
    const projectTitle = document.querySelector("#project-title");
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

// Call the initialization function once the document is ready
document.addEventListener("DOMContentLoaded", function () {
    const isSmallScreen = window.innerWidth < 800;

    if (isSmallScreen) {
        // Remove animations for smaller screens
        const articles = document.querySelectorAll(".article");
        articles.forEach((article) => {
            article.style.opacity = 1;
        });
        const projectTitle = document.querySelector("#project-title");
        projectTitle.style.opacity = 1;
    } else {
        initProjectAnimations();
        animateProjectTitle();
    }
});

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select the elements you want to animate
    const sections = document.querySelectorAll('.mainContent');

    // Loop through each section
    sections.forEach(section => {
        // Create a new ScrollTrigger for each section
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
