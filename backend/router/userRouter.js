import express from "express";
import { authenticate, isAuthorized } from "../middlewares/auth.js";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  logout,
  login,
  patientRegister,
} from "../controller/userController.js";

const router = express.Router();

router.get("/admin/me", authenticate("Admin", "adminToken"), getUserDetails);

router.get(
  "/patient/me",
  authenticate("Patient", "patientToken"),
  getUserDetails
);

// Admin routes
router.post("/admin/addnew", authenticate("Admin", "adminToken"), addNewAdmin);
router.post(
  "/doctor/addnew",
  authenticate("Admin", "adminToken"),
  addNewDoctor
);
router.get("/doctors", authenticate("Admin", "adminToken"), getAllDoctors);
router.get("/admin/me", authenticate("Admin", "adminToken"), getUserDetails);
router.get(
  "/admin/logout",
  authenticate("Admin", "adminToken"),
  logout("adminToken")
);

//login
router.post("/login", login);
// Patient Registration
router.post("/patient/register", patientRegister);

// Patient routes
router.get(
  "/patient/me",
  authenticate("Patient", "patientToken"),
  getUserDetails
);
router.get(
  "/patient/logout",
  authenticate("Patient", "patientToken"),
  logout("patientToken")
);

export default router;
