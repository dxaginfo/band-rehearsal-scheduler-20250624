import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

// Middleware to handle routes that don't exist
const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

export default notFoundHandler;