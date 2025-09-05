import express from 'express';
import {
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
} from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const userRouter = express.Router();

// User authentication routes
userRouter.post('/register', registerUser);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/resend-verification', resendVerificationCode);
userRouter.post('/login', loginUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

// User profile routes
userRouter.post('/profile', auth, getUserProfile);
userRouter.put('/profile', auth, updateUserProfile);

// Appointment routes
userRouter.post('/appointments', auth, bookAppointment);
userRouter.get('/appointments', auth, getUserAppointments);

export default userRouter;
