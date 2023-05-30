<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

//email parameters to Brian
$to = "brousslang@lotustechnical.com";
$subject = "Tennis Tournament Contact Form Submission";
$body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";

//Sending contact email
if (mail($to, $subject, $body, $headers)) {
    //Redirect user to thank you page
    header("Location: thank_you.html");
    exit();
} else {
    echo "Error: failed to send email."
}
?>