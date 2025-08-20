const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// POST route for contact form
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Transporter for Gmail (you can use others like Outlook, SMTP etc.)
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yourgmail@gmail.com", // your Gmail
                pass: "your-app-password"    // use Google App Password (not your real password)
            }
        });

        // Email options
        let mailOptions = {
            from: email,
            to: "devasothnikitha06@gmail.com",  // where you want to receive
            subject: `New Contact Form Message from ${name}`,
            text: `You got a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "✅ Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error sending message" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

