import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendWelcomeEmail(email: string) {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL as string,
    subject: 'Welcome to ZenLight Waiting List!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6d28d9;">Welcome to ZenLight! 🎉</h1>
        <p>Thank you for joining our waiting list! We're thrilled to have you on board.</p>
        <p>We'll keep you updated on our progress and let you know as soon as we launch.</p>
        <p>In the meantime, join our Discord community to stay connected and get the latest updates:</p>
        <p style="margin: 20px 0;">
          <a href="https://discord.gg/uB5XcA35hq" 
             style="background-color: #5865F2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Join our Discord Server
          </a>
        </p>
        <div style="margin-top: 20px;">
          <p>Best regards,<br>The ZenLight Team</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', error);
    return { success: false, error };
  }
} 