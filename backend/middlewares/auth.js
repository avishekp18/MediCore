import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

/**
 * Generic authentication middleware
 * @param {String} role - Required role ('Admin', 'Patient', etc.)
 * @param {String} tokenName - Cookie name storing JWT ('adminToken', 'patientToken', etc.)
 */
export const authenticate = (role, tokenName) =>
  catchAsyncErrors(async (req, res, next) => {
    // Get token from cookies
    const token = req.cookies?.[tokenName];
    if (!token)
      return next(new ErrorHandler(`${role} not authenticated!`, 401));

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return next(new ErrorHandler("Invalid or expired token!", 401));
    }

    // Get user from DB and exclude password
    const user = await User.findById(decoded.id).select("-password");
    if (!user || user.role !== role) {
      return next(new ErrorHandler(`Access denied: ${role}s only!`, 403));
    }

    req.user = user;
    next();
  });

/**
 * Flexible role-based authorization middleware
 * Usage: isAuthorized('Admin', 'Doctor')
 */
export const isAuthorized =
  (...roles) =>
  (req, res, next) => {
    if (!req.user)
      return next(new ErrorHandler("User not authenticated!", 401));

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Access denied: ${req.user.role} cannot access this resource`,
          403
        )
      );
    }

    next();
  };
