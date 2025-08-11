/* eslint-disable @typescript-eslint/no-unused-vars */
// Email service configuration
// You can use any email service provider like SendGrid, Resend, Nodemailer, etc.

export const emailConfig = {
  // Example for SendGrid
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.FROM_EMAIL || "noreply@rahajoecreativa.com",
    toEmail: process.env.TO_EMAIL || "info@rahajoecreativa.com",
  },

  // Example for Resend
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.FROM_EMAIL || "noreply@rahajoecreativa.com",
    toEmail: process.env.TO_EMAIL || "info@rahajoecreativa.com",
  },

  // Example for Nodemailer (SMTP)
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    fromEmail: process.env.FROM_EMAIL || "noreply@rahajoecreativa.com",
    toEmail: process.env.TO_EMAIL || "info@rahajoecreativa.com",
  },
};

// Email service functions
export const sendEmail = async (data: {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}) => {
  // Choose your preferred email service
  // return await sendWithSendGrid(data);
  // return await sendWithResend(data);
  // return await sendWithNodemailer(data);

  // For now, just log the email data
  //   console.log("Email to be sent:", data);
  return { success: true };
};

// Example SendGrid implementation
export const sendWithSendGrid = async (data: {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}) => {
  // Uncomment and install @sendgrid/mail to use SendGrid
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(emailConfig.sendgrid.apiKey);

  const msg = {
    to: data.to,
    from: data.from,
    subject: data.subject,
    text: data.text,
    html: data.html,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
  */
  //   console.log("SendGrid email (mock):", data);
  return { success: true };
};

// Example Resend implementation
export const sendWithResend = async (data: {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}) => {
  // Uncomment and install resend to use Resend
  /*
  import { Resend } from 'resend';
  const resend = new Resend(emailConfig.resend.apiKey);

  try {
    const result = await resend.emails.send({
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Resend error:', error);
    throw error;
  }
  */
  //   console.log("Resend email (mock):", data);
  return { success: true };
};

// Example Nodemailer implementation
export const sendWithNodemailer = async (data: {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}) => {
  // Uncomment and install nodemailer to use SMTP
  /*
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    host: emailConfig.smtp.host,
    port: emailConfig.smtp.port,
    secure: emailConfig.smtp.secure,
    auth: emailConfig.smtp.auth,
  });

  try {
    const info = await transporter.sendMail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer error:', error);
    throw error;
  }
  */
  //   console.log("Nodemailer email (mock):", data);
  return { success: true };
};
