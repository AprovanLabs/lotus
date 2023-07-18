import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as aws from "@aws-sdk/client-ses";
import formidable from 'formidable';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
}

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.LT_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.LT_AWS_SECRET_ACCESS_KEY!,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendEmail = async (toEmail: string, {
  name, email, phoneNumber, message,
}: {
  name: string,
  email: string,
  phoneNumber: string,
  message: string,
}, attachment?: { name: string; path: string }) => {
  console.log(`Sending email to ${toEmail}`)

  return transporter.sendMail({
    from: "noreply@highlystrung.tennis",
    to: toEmail,
    html: `
          <h1>Highly Strung Tennis Submition</h1>
          <p>
            Name: ${name || 'N/A'}<br />
            Email: ${email || 'N/A'}<br />
            Phone Number: ${phoneNumber || 'N/A'}<br />
          </p>
          <pre>${message || ''}</pre>
          `,
    subject: "Highly Strung Tennis Submission",
    attachments: attachment ? [{
      filename: attachment?.name,
      content: createReadStream(attachment?.path)
    }] : [],
  });
};

const submitForm = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log(`Invalid method: ${req.method}`)
    return res.status(405).send({
      error: 'Method Not Allowed',
    });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    try {
      const attachment = (files as any)?.file?.[0];

      console.log(`Sending message. Has attachment: ${attachment ? 'TRUE' : 'FALSE'}`)

      sendEmail(process.env.SEND_TO_EMAIL!, {
        name: fields?.name?.[0],
        email: fields?.email?.[0],
        phoneNumber: fields?.phoneNumber?.[0],
        message: fields?.message?.[0],
      }, attachment ? {
        path: attachment?.filepath,
        name: attachment?.originalFilename ?? 'submission.pdf',
      } : undefined).then(() => {
        console.log('✅ Email sent successfully')
        throw new Error('Failed to send')

        res.redirect(302, '/contact-us?success=true');
      }).catch((error) => {
        console.error(`❌ Failed to send email: `, error);
        throw error;
      });

    } catch (error) {
      console.error(`❌ Failed to send email: `, error);

      return res.redirect(302, '/contact-us?success=false')
    }
  });
};

export default submitForm;
