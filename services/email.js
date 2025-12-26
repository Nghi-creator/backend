import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const service = {
  send: async function (to, subject, text) {
    try {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: to, 
        subject: subject,
        html: `<strong>${text}</strong>`
      });

      console.log('Email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Resend Error:', error);
      throw error;
    }
  }
};

export default service;