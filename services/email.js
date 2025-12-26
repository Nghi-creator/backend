import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});

const service = {
  send: async function (to, subject, text) {
    const msg = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };
    return transporter.sendMail(msg);
  },
};

export default service;