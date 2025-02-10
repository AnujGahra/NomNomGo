import express from "express";
import { 
  checkAuth, 
  forgotPassword, 
  login, 
  logout, 
  resetPassword, 
  signup, 
  updateProfile, 
  verifyEmail 
} from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/check-auth", isAuthenticated, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
