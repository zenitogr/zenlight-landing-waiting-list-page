const express = require('express');
const sgMail = require('@sendgrid/mail');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

// Basic middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle email captures
app.post('/api/waiting-list', async (req, res) => {
    const { email } = req.body;

    try {
        // Add email to your waiting list database here

        // Send confirmation email using SendGrid
        const msg = {
            to: `${email}`,
            from: 'your@sendgrid.from.email',
            subject: 'Thank you for joining our waiting list!',
            text: `Hello, thank you for joining our waiting list. We'll notify you when we launch.`,
        };

        await sgMail.send(msg);
        res.status(200).json({ message: 'Email added to waiting list and confirmation sent.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to add email to waiting list.' });
    }
});

// Simple form page
app.get('/', (req , res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>Waiting List</title></head>
            <body>
                <h1>Join Our Waiting List</h1>
                <form action="/api/waiting-list" method="POST">
                    <input type="email" name="email" placeholder="Enter your email" required>
                    <button type="submit">Join Now</button>
                </form>
            </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
