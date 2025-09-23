/**
 * Wraps async route handlers to automatically catch errors
 * and forward them to the Express error middleware.
 *
 * @param {Function} theFunction - Async route handler
 * @returns {Function} Express middleware function
 */
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
