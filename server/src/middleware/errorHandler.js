export const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err);
  
    const errorResponse = {
      error: process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'Une erreur est survenue',
      status: err.status || 500,
      path: req.path,
    };
  
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
      errorResponse.details = err.details || undefined;
    }
  
    res.status(errorResponse.status).json(errorResponse);
  };
  
  export class AppError extends Error {
    constructor(message, status = 500, details = {}) {
      super(message);
      this.status = status;
      this.details = details;
      Error.captureStackTrace(this, this.constructor);
    }
  }