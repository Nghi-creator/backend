import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const service = {
  send: async function (to, subject, text) {
    try {
      const url = 'https://api.brevo.com/v3/smtp/email';
      
      const data = {
        sender: { 
          name: "Student Project", 
          email: process.env.EMAIL_FROM
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: `<strong>${text}</strong>`
      };

      const response = await axios.post(url, data, {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        }
      });

      console.log('Brevo Email Sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('Brevo Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export default service;