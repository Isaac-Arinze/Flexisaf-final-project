import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import emailService from '../services/emailService.js';
import crypto from 'crypto';

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
      isVerified: false
    });

    await user.save();

    // Send verification email
    const emailResult = await emailService.sendVerificationEmail(email, verificationCode);

    if (emailResult.success) {
      res.json({
        success: true,
        message: 'Account created successfully, check your email to verify',
        userId: user._id
      });
    } else {
      res.json({
        success: false,
        message: 'User registered but failed to send verification email. Please try again.'
      });
    }

  } catch (error) {
    console.error('Registration error:', error);
    res.json({ success: false, message: 'Registration failed. Please try again.' });
  }
};

// Verify email
const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await userModel.findOne({
      email,
      verificationCode,
      verificationCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ success: false, message: 'Invalid or expired verification code' });
    }

    // Update user as verified
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    // Send welcome email
    await emailService.sendWelcomeEmail(email, user.name);

    res.json({ success: true, message: 'Email verified successfully' });

  } catch (error) {
    console.error('Email verification error:', error);
    res.json({ success: false, message: 'Email verification failed' });
  }
};

// Resend verification code
const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: 'Email already verified' });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;
    await user.save();

    // Send verification email
    const emailResult = await emailService.sendVerificationEmail(email, verificationCode);

    if (emailResult.success) {
      res.json({ success: true, message: 'Verification code sent successfully' });
    } else {
      res.json({ success: false, message: 'Failed to send verification code' });
    }

  } catch (error) {
    console.error('Resend verification error:', error);
    res.json({ success: false, message: 'Failed to resend verification code' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.json({
        success: false,
        message: 'Please verify your email before logging in',
        requiresVerification: true
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.json({ success: false, message: 'Login failed' });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // Send password reset email
    const emailResult = await emailService.sendPasswordResetEmail(email, resetToken);

    if (emailResult.success) {
      res.json({ success: true, message: 'Password reset email sent successfully' });
    } else {
      res.json({ success: false, message: 'Failed to send password reset email' });
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    res.json({ success: false, message: 'Failed to process password reset request' });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ success: false, message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.json({ success: false, message: 'Failed to reset password' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select('-password -verificationCode -resetPasswordToken');
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });

  } catch (error) {
    console.error('Get profile error:', error);
    res.json({ success: false, message: 'Failed to get user profile' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (dob) user.dob = dob;
    if (gender) user.gender = gender;

    await user.save();

    res.json({ success: true, message: 'Profile updated successfully' });

  } catch (error) {
    console.error('Update profile error:', error);
    res.json({ success: false, message: 'Failed to update profile' });
  }
};

// Book appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, doctorImage, speciality, date, time, fees } = req.body;
    const userId = req.body.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Check if appointment slot is already booked
    const existingAppointment = user.appointments.find(
      appointment => appointment.date === date && appointment.time === time && appointment.doctorId === doctorId
    );

    if (existingAppointment) {
      return res.json({ success: false, message: 'This time slot is already booked' });
    }

    // Create new appointment
    const newAppointment = {
      doctorId,
      doctorName,
      doctorImage,
      speciality,
      date,
      time,
      fees,
      status: 'pending',
      createdAt: new Date()
    };

    user.appointments.push(newAppointment);
    await user.save();

    res.json({ success: true, message: 'Appointment booked successfully' });

  } catch (error) {
    console.error('Book appointment error:', error);
    res.json({ success: false, message: 'Failed to book appointment' });
  }
};

// Get user appointments
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, appointments: user.appointments });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.json({ success: false, message: 'Failed to get appointments' });
  }
};

export {
  registerUser,
  verifyEmail,
  resendVerificationCode,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  getUserAppointments
};
