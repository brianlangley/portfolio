// Preloader

// Session storage to prevent preloader from showing again after refresh
if (sessionStorage.getItem('preloader') == null) {
    sessionStorage.setItem('preloader', 'true');
} else {
    const preloaderContainer = document.querySelector('.preloader-container');
    if (preloaderContainer) {
        preloaderContainer.parentNode.removeChild(preloaderContainer);
    }
}

// Graffiti effect
window.addEventListener('DOMContentLoaded', () => {
    const preloaderText = document.querySelector('.preloader-text');
    if (preloaderText) {
        const letters = preloaderText.textContent.split('');
        preloaderText.textContent = '';
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            preloaderText.append(span);

            // Apply GSAP animation with delay
            gsap.fromTo(
                span,
                { x: -100, opacity: 0, textShadow: '0 0 20px rgba(0, 0, 0, 1)' }, // Initial properties with shadow
                {
                    x: 0,
                    opacity: 1,
                    duration: 3,
                    delay: 1.6 + index * 0.8, // Delay each letter
                    textShadow: '0 0 10px rgba(0, 0, 0, 1)', // Keep the shadow after the animation
                }
            );
        });
    }

    // Remove preloader after delay with fade out effect
    setTimeout(function () {
        const preloaderContainer = document.querySelector('.preloader-container');
        if (preloaderContainer) {
            gsap.to(preloaderContainer, {
                opacity: 0,
                duration: 1,
                onComplete: function () {
                    preloaderContainer.style.display = 'none';
                },
            });
        }
    }, 7000);
});
