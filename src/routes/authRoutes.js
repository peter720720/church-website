import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { 
    signup, 
    login, 
    logout, 
    forgotPassword, 
    verifyOtpAndResetPassword 
} from "../controllers/authController.js"; 



const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new church member
 */
router.post("/register", data);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate member & get token
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/logout
 * @desc    Clear member session/cookies
 */
router.post("/logout", logout);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request OTP for password reset (Sends Email)
 */
router.post("/forgot-password", forgotPassword); 

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify OTP code and update to new password
 */
router.post("/verify-otp", verifyOtpAndResetPassword); 
router.get("/check-auth", protectRoute, (req, res) => {
    res.json({ success: true, user: req.user });
});

export default router;
