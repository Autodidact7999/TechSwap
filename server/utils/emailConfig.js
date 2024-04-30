// emailConfig.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

// Verify the connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error("Error configuring the email transporter:", error);
    } else {
        console.log("Email transporter is ready to send messages.");
    }
});

module.exports = transporter;
