const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(() => {
            // Handle success, such as displaying a success message
            console.log("Form successfully submitted");
            // You can also redirect the user to a thank-you page if desired
            window.location.href = "confirmation.html";
        })
        .catch((error) => {
            // Handle error, such as displaying an error message
            alert(error);
        });
};

document.querySelector("form").addEventListener("submit", handleSubmit);
