const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10) || 587,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Golden Scissor Spa <noreply@goldenscissorspa.com>',
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Email sending failed: ${error.message}`);
    // Do not throw error to prevent breaking user action, just log
  }
};

const sendBookingConfirmation = async (email, details) => {
  const html = `
    <div style="font-family: 'Playfair Display', Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #131313; color: #e5e2e1; border: 1px solid #4d4635;">
      <h2 style="color: #f2ca50; text-align: center; font-size: 24px; letter-spacing: 1px;">GOLDEN SCISSOR SPA</h2>
      <p style="font-family: 'Manrope', Arial, sans-serif; text-align: center; color: #d0c5af;">The Sanctuary of Grooming</p>
      <hr style="border-color: #4d4635; margin: 20px 0;" />
      <h3 style="color: #f2ca50;">Reservation Confirmed</h3>
      <p style="font-family: 'Manrope', Arial, sans-serif;">Dear ${details.customerName},</p>
      <p style="font-family: 'Manrope', Arial, sans-serif;">Your reservation has been confirmed. Below are the details of your luxurious grooming experience:</p>
      
      <table style="width: 100%; border-collapse: collapse; font-family: 'Manrope', Arial, sans-serif; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; color: #d0c5af;">Service:</td>
          <td style="padding: 8px 0; text-align: right; color: #e5e2e1; font-weight: bold;">${details.serviceName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #d0c5af;">Stylist:</td>
          <td style="padding: 8px 0; text-align: right; color: #e5e2e1; font-weight: bold;">${details.staffName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #d0c5af;">Date:</td>
          <td style="padding: 8px 0; text-align: right; color: #e5e2e1; font-weight: bold;">${details.date}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #d0c5af;">Time:</td>
          <td style="padding: 8px 0; text-align: right; color: #e5e2e1; font-weight: bold;">${details.timeSlot}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #d0c5af;">Price:</td>
          <td style="padding: 8px 0; text-align: right; color: #f2ca50; font-weight: bold;">$${details.price}</td>
        </tr>
      </table>

      <div style="background-color: #1c1b1b; padding: 15px; border-left: 3px solid #f2ca50; margin: 20px 0; font-family: 'Manrope', Arial, sans-serif;">
        <p style="margin: 0; font-size: 13px; color: #d0c5af;">Please arrive 10 minutes prior to your appointment. Cancellations must be made 24 hours in advance.</p>
      </div>

      <p style="font-family: 'Manrope', Arial, sans-serif;">If you need to make changes or have any inquiries, contact us directly via WhatsApp or call us.</p>
      
      <hr style="border-color: #4d4635; margin: 20px 0;" />
      <p style="font-family: 'Manrope', Arial, sans-serif; font-size: 11px; text-align: center; color: #d0c5af;">
        © 2024 Golden Scissor Spa. 122 Golden Plaza, Fifth Avenue, New York, NY 10001
      </p>
    </div>
  `;
  return sendEmail({ to: email, subject: 'Your Golden Scissor Reservation Confirmed', html });
};

const sendPasswordResetEmail = async (email, url) => {
  const html = `
    <div style="font-family: 'Playfair Display', Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #131313; color: #e5e2e1; border: 1px solid #4d4635;">
      <h2 style="color: #f2ca50; text-align: center; font-size: 24px; letter-spacing: 1px;">GOLDEN SCISSOR SPA</h2>
      <hr style="border-color: #4d4635; margin: 20px 0;" />
      <h3 style="color: #f2ca50; text-align: center;">Reset Your Password</h3>
      <p style="font-family: 'Manrope', Arial, sans-serif; text-align: center;">You are receiving this email because you (or someone else) requested a password reset for your account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #f2ca50; color: #3c2f00; padding: 12px 30px; text-decoration: none; font-weight: bold; font-family: 'Manrope', Arial, sans-serif; letter-spacing: 1px; display: inline-block;">RESET PASSWORD</a>
      </div>
      <p style="font-family: 'Manrope', Arial, sans-serif; text-align: center; font-size: 12px; color: #d0c5af;">This link is valid for 10 minutes only. If you did not request this, please ignore this email.</p>
      <hr style="border-color: #4d4635; margin: 20px 0;" />
      <p style="font-family: 'Manrope', Arial, sans-serif; font-size: 11px; text-align: center; color: #d0c5af;">
        © 2024 Golden Scissor Spa.
      </p>
    </div>
  `;
  return sendEmail({ to: email, subject: 'Golden Scissor Spa - Password Reset Request', html });
};

module.exports = {
  sendEmail,
  sendBookingConfirmation,
  sendPasswordResetEmail
};
