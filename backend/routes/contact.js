const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check if email credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('WARNING: Email credentials not found in .env. Simulating email send.');
        console.log('--- Mock Email ---');
        console.log(`To: ${process.env.EMAIL_USER || 'Admin'}`);
        console.log(`Subject: Portfolio Contact: ${subject || 'New Message'}`);
        console.log(`Message: ${message}`);
        console.log('------------------');
        return res.status(200).json({ message: 'Message sent successfully (Mock Mode)!' });
    }

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject || 'New Message'}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message. Check server logs.' });
    }
});

module.exports = router;
