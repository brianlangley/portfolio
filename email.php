<?php
    $errorMessage = "";
    $successMessage = "";
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $message = $_POST['message'];
    
        // Basic form validation
        if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
            $errorMessage = "Please fill in all the required fields.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errorMessage = "Invalid email format. Please enter a valid email address.";
        } else {
            $to = "be.langley@icloud.com";
            $subject = "New Contact Form Submission";
            $body = "First Name: $firstName\n" .
                    "Last Name: $lastName\n" .
                    "Email: $email\n" .
                    "Message: $message\n";
            $headers = "From: $email";
    
            // Send the email
            if (mail($to, $subject, $body, $headers)) {
                $successMessage = "Thank you for your message. We will get back to you soon!";
            } else {
                $errorMessage = "Sorry, there was an error sending your message. Please try again later.";
            }
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
    <script>
        setTimeout(function() {
            window.location.href = "index.html";
        }, 5000); // Redirect back to index.html after 5 seconds
    </script>
</head>
<body>
    <h1>Contact Form</h1>

    <?php if (!empty($errorMessage)) { ?>
        <p><?php echo $errorMessage; ?></p>
    <?php } ?>

    <?php if (!empty($successMessage)) { ?>
        <p><?php echo $successMessage; ?></p>
    <?php } ?>

    <p>Redirecting back to the homepage...</p>
</body>
</html>

