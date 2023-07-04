import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: 'mailfornascenia11@gmail.com',
    pass: 'ofhxmxgdbaxsnrup',
  },
});

 
export const sendEmail = async (to: string, subject: string, message: string) => {
    await transporter.sendMail({
      from: '"VMS" <info@vms.com>',
      to: to, 
      subject: subject,
      text: message,
    });
  }
