"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require("nodemailer");
require("dotenv/config");
const path = require("path");
const hbs = require('nodemailer-express-handlebars');
const sendMail = async (template, receiver, subject, username, resetCode) => {
    // Create a transporter object using the Gmail SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.PASSWORD,
        },
    });
    const hbsOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.join(__dirname, 'views'),
            layoutsDir: path.join(__dirname, 'views'),
            defaultLayout: false,
        },
        viewPath: path.join(__dirname, 'views'),
        extName: '.handlebars',
    };
    // Debug: Print the resolved viewPath
    console.log('Resolved viewPath:', path.join(__dirname, 'views'));
    // Attach the handlebars plugin to the nodemailer transporter
    transporter.use('compile', hbs(hbsOptions));
    // Define email options
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: receiver,
        subject: subject,
        template: template,
        context: {
            username: username,
            resetCode: resetCode
        }
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ', error.message);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};
exports.sendMail = sendMail;
