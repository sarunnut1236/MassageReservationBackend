const nodemailer = require("nodemailer");
const Users = require("../models/Users");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

async function getEmail(userId) {
    const user = await Users.findById(userId);

    return user.email;
}

async function sendEmail(userId, subject, content) {
    const email = await getEmail(userId);

    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: subject,
        text: content,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending email:', err.message);
        }
    });
}

module.exports = sendEmail;