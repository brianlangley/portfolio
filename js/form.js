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
            console.log("Form successfully submitted");
            window.location.href = "confirmation.html";
        })
        .catch((error) => {
            console.log(error);
        });
};

document.querySelector("form").addEventListener("submit", handleSubmit);
