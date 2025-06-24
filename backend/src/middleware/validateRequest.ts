import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Middleware to validate request using express-validator
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Add validation errors to request for error handler
    req.validationErrors = errors.array();
    
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  
  next();
};