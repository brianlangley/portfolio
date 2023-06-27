// Function to redirect to the homepage after 10 seconds
function redirectHome() {
    let countdown = 10;
    let countdownElement = document.getElementById("countdown");

    countdownElement.innerText = `Redirecting in ${countdown} seconds`;

    let countdownInterval = setInterval(function () {
        countdown--;
        countdownElement.innerText = `Redirecting in ${countdown} seconds`;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            window.location.href = "index.html";
        }
    }, 1000); // Update countdown every second
}

// Call the redirectHome function when the page finishes loading
window.addEventListener("load", redirectHome);