import transporter from '../config/email.js';

class EmailService {
  // Send welcome email to new users
  async sendWelcomeEmail(email, name) {
    try {
      const mailOptions = {
        from: `"FlexiDigi Health" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Welcome to FlexiDigi Health! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to FlexiDigi Health, ${name}!</h2>
            <p>Thank you for joining our healthcare platform. We're excited to have you on board!</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">What you can do now:</h3>
              <ul style="color: #4b5563;">
                <li>Book appointments with qualified doctors</li>
                <li>Access your medical records securely</li>
                <li>Manage your healthcare needs online</li>
                <li>Receive important health notifications</li>
              </ul>
            </div>

            <p style="color: #6b7280;">
              If you have any questions, feel free to contact our support team.
            </p>

            <p style="color: #2563eb; font-weight: bold;">
              Best regards,<br>
              The FlexiDigi Health Team
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send email verification code
  async sendVerificationEmail(email, verificationCode) {
    try {
      const mailOptions = {
        from: `"FlexiDigi Health" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Verify Your Email Address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Verify Your Email Address</h2>
            <p>Please use the verification code below to complete your registration:</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h1 style="color: #1f2937; font-size: 32px; margin: 0; letter-spacing: 5px;">
                ${verificationCode}
              </h1>
            </div>

            <p style="color: #6b7280;">
              This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
            </p>

            <p style="color: #2563eb; font-weight: bold;">
              Best regards,<br>
              The FlexiDigi Health Team
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending verification email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email, resetToken) {
    try {
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

      const mailOptions = {
        from: `"FlexiDigi Health" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Reset Your Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Reset Your Password</h2>
            <p>You requested a password reset for your FlexiDigi Health account.</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
            </div>

            <p style="color: #6b7280;">
              This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
            </p>

            <p style="color: #6b7280; font-size: 14px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetLink}" style="color: #2563eb;">${resetLink}</a>
            </p>

            <p style="color: #2563eb; font-weight: bold;">
              Best regards,<br>
              The FlexiDigi Health Team
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send appointment confirmation email
  async sendAppointmentConfirmation(email, appointmentDetails) {
    try {
      const mailOptions = {
        from: `"FlexiDigi Health" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Appointment Confirmed',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Appointment Confirmed! ✅</h2>
            <p>Your appointment has been successfully booked.</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Appointment Details:</h3>
              <ul style="color: #4b5563;">
                <li><strong>Doctor:</strong> ${appointmentDetails.doctorName}</li>
                <li><strong>Specialty:</strong> ${appointmentDetails.specialty}</li>
                <li><strong>Date:</strong> ${appointmentDetails.date}</li>
                <li><strong>Time:</strong> ${appointmentDetails.time}</li>
                <li><strong>Location:</strong> ${appointmentDetails.location || 'Online Consultation'}</li>
              </ul>
            </div>

            <p style="color: #6b7280;">
              Please arrive 15 minutes early for your appointment. You can manage your appointments through your dashboard.
            </p>

            <p style="color: #2563eb; font-weight: bold;">
              Best regards,<br>
              The FlexiDigi Health Team
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Appointment confirmation email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending appointment confirmation email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send appointment reminder email
  async sendAppointmentReminder(email, appointmentDetails) {
    try {
      const mailOptions = {
        from: `"FlexiDigi Health" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Appointment Reminder - Tomorrow',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Appointment Reminder ⏰</h2>
            <p>This is a friendly reminder about your upcoming appointment.</p>

            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin-top: 0;">Tomorrow's Appointment:</h3>
              <ul style="color: #78350f;">
                <li><strong>Doctor:</strong> ${appointmentDetails.doctorName}</li>
                <li><strong>Specialty:</strong> ${appointmentDetails.specialty}</li>
                <li><strong>Time:</strong> ${appointmentDetails.time}</li>
                <li><strong>Location:</strong> ${appointmentDetails.location || 'Online Consultation'}</li>
              </ul>
            </div>

            <p style="color: #6b7280;">
              Please arrive 15 minutes early. If you need to reschedule, contact us as soon as possible.
            </p>

            <p style="color: #2563eb; font-weight: bold;">
              Best regards,<br>
              The FlexiDigi Health Team
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Appointment reminder email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending appointment reminder email:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new EmailService();
