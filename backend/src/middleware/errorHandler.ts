import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Custom error handler middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('Error:', err);

  // Default error
  let error = { ...err };
  error.message = err.message;
  
  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    // Handle unique constraint violations
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[]) || ['record'];
      error = new AppError(`A ${field.join(', ')} with that value already exists`, 400);
    }
    
    // Handle record not found
    else if (err.code === 'P2025') {
      error = new AppError('Record not found', 404);
    }
  }
  
  // Handle validation errors (express-validator would add them to req)
  if (req.validationErrors) {
    return res.status(400).json({
      success: false,
      errors: req.validationErrors,
    });
  }

  // Send response
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err,
    }),
  });
};

export default errorHandler;

// Add validation errors property to Express Request
declare global {
  namespace Express {
    interface Request {
      validationErrors?: any[];
      user?: any;
    }
  }
}