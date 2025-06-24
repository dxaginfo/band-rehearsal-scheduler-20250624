import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('firstName')
      .notEmpty()
      .withMessage('First name is required'),
    body('lastName')
      .notEmpty()
      .withMessage('Last name is required'),
    body('phoneNumber')
      .optional()
      .isMobilePhone('any')
      .withMessage('Please provide a valid phone number'),
  ],
  validateRequest,
  authController.register
);

// Login route
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  validateRequest,
  authController.login
);

// Get current user route (protected)
router.get('/me', protect, authController.getCurrentUser);

// Update profile route (protected)
router.put(
  '/profile',
  protect,
  [
    body('firstName')
      .optional()
      .notEmpty()
      .withMessage('First name cannot be empty if provided'),
    body('lastName')
      .optional()
      .notEmpty()
      .withMessage('Last name cannot be empty if provided'),
    body('phoneNumber')
      .optional()
      .isMobilePhone('any')
      .withMessage('Please provide a valid phone number'),
    body('timezone')
      .optional()
      .isString()
      .withMessage('Timezone must be a string'),
    body('profileImageUrl')
      .optional()
      .isURL()
      .withMessage('Profile image URL must be a valid URL'),
  ],
  validateRequest,
  authController.updateProfile
);

// Change password route (protected)
router.put(
  '/password',
  protect,
  [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long'),
  ],
  validateRequest,
  authController.changePassword
);

// Forgot password route
router.post(
  '/forgot-password',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
  ],
  validateRequest,
  authController.forgotPassword
);

// Reset password route
router.post(
  '/reset-password',
  [
    body('token')
      .notEmpty()
      .withMessage('Token is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest,
  authController.resetPassword
);

export default router;