import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    const msg = {
      to: email,
      from: 'zenlight-mailer@em3154.zenlight.app', // Change to your verified sender
      subject: 'Welcome to the Zenlight Waiting List',
      text: 'Thank you for joining the Zenlight waiting list!',
      html: '<strong>Thank you for joining the Zenlight waiting list!</strong>',
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
        res.status(200).json({ message: "Email added to the waiting list" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
      });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
