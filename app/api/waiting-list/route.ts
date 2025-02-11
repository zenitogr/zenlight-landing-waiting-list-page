import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // For now, just store the email and return success
        // This allows the waiting list to work even without SendGrid configured
        console.log('New waiting list signup:', email);

        // Only attempt to send email if SendGrid is configured
        if (SENDGRID_API_KEY) {
            try {
                sgMail.setApiKey(SENDGRID_API_KEY);
                
                const msg = {
                    to: email,
                    from: 'zenlight-mailer@em3154.zenlight.app',
                    subject: 'Thank you for joining our waiting list!',
                    text: 'Hello, thank you for joining our waiting list. We\'ll notify you when we launch.',
                    html: `
                        <div>
                            <h1>Welcome to Zenlight!</h1>
                            <p>Thank you for joining our waiting list. We'll notify you when we launch.</p>
                        </div>
                    `,
                };

                await sgMail.send(msg);
                console.log('Confirmation email sent to:', email);
            } catch (emailError) {
                console.error('Failed to send confirmation email:', emailError);
                // Continue execution - we don't want to fail the signup just because email failed
            }
        } else {
            console.log('SendGrid not configured - skipping confirmation email');
        }

        return NextResponse.json(
            { message: 'Successfully joined waiting list' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing waiting list signup:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
