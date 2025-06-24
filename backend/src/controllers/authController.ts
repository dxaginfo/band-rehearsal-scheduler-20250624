import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../server';
import { AppError } from '../utils/appError';

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('User with this email already exists', 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      profileImageUrl: true,
      timezone: true,
      createdAt: true,
    },
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '30d' }
  );

  res.status(201).json({
    success: true,
    token,
    user,
  });
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '30d' }
  );

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    success: true,
    token,
    user: userWithoutPassword,
  });
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      profileImageUrl: true,
      timezone: true,
      createdAt: true,
      bandMemberships: {
        include: {
          band: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber, timezone, profileImageUrl } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      firstName,
      lastName,
      phoneNumber,
      timezone,
      profileImageUrl,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      profileImageUrl: true,
      timezone: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Change password
export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Check if current password is correct
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError('Current password is incorrect', 401);
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password
  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashedPassword },
  });

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  // In a real application, you would:
  // 1. Generate a reset token
  // 2. Send an email with a reset link
  // 3. Save the reset token and expiry in the database
  
  // For this example, we'll just acknowledge the request
  res.status(200).json({
    success: true,
    message: 'If a user with that email exists, a password reset link will be sent',
  });
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  // In a real application, you would:
  // 1. Verify the reset token
  // 2. Check if the token is expired
  // 3. Reset the password
  
  // For this example, we'll just acknowledge the request
  res.status(200).json({
    success: true,
    message: 'Password has been reset successfully',
  });
};