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
    gsap.from(home, { opacity: 0, duration: 4, delay: 10, y: 60 });
}

// Custom mouse
document.body.style.cursor = 'none';
const bigBall = document.querySelector('.cursorXL');
const smallBall = document.querySelector('.cursorSM');
const hoverables = document.querySelectorAll('.hoverable');

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

document.addEventListener('mousedown', () => {
    TweenMax.to(bigBall, 0.3, {
        scale: 0
    });
});

document.addEventListener('mouseup', () => {
    TweenMax.to(bigBall, 0.3, {
        scale: 1
    });
});

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
        } else {
            // Scrolling up
            if (!isScrolling) {
                scrollEffect.reverse();
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
