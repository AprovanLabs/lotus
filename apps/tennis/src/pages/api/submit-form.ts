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
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.LT_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.LT_AWS_SECRET_ACCESS_KEY!,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendEmail = (toEmail: string, {
  name, email, phoneNumber, message,
}: {
  name: string,
  email: string,
  phoneNumber: string,
  message: string,
}, attachment?: { name: string; path: string }) => {
  console.log('toEmail', toEmail, attachment)
  return transporter.sendMail({
    from: "noreply@highlystrung.tennis",
    to: toEmail,
    html: `
          <h1>Highly Strung Tennis Submittino</h1>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Phone Number: ${phoneNumber}</p>
          <pre>${message}</pre>
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
    return res.status(405).send({
      error: 'Method Not Allowed',
    });
  }

  const form = formidable();

  form.parse(req, (err, fields, files) => {
    try {
      const attachment = (files as any)?.file?.[0];

      sendEmail(process.env.SEND_TO_EMAIL!, {
        name: fields?.name?.[0],
        email: fields?.email?.[0],
        phoneNumber: fields?.phoneNumber?.[0],
        message: fields?.message?.[0],
      }, attachment ? {
        path: attachment?.filepath,
        name: attachment?.originalFilename ?? 'submission.pdf',
      } : undefined);

      res.status(200).redirect('/contact-us');
    } catch (error) {
      console.error(`❌ Failed to send email: `, error);

      return res.status(400).json({
        error: `Something went wrong! ${error}`,
      })
    }
  });
};

export default submitForm;
