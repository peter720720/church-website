import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from 'resend';

// Helper: Generate JWT and set Cookie
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    return token;
};

// --- 1. SIGNUP ---
export const signup = async (req, res) => {
    // ✅ Updated to include 'role' from the request body
    const { name, email, password, phoneNumber, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: "Member already registered" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            role: role || "member" // ✅ Use provided role (admin) or default to member
        });

        generateToken(res, user._id);
        res.status(201).json({
            success: true,
            message: `${user.name} registered successfully!`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 2. LOGIN ---
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        
        if (user && (await bcrypt.compare(password, user.password))) {
            generateToken(res, user._id);
            res.json({
                success: true,
                message: "Logged in successfully!",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 3. FORGOT PASSWORD (Sends OTP) ---
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const resend = new Resend(process.env.RESEND_API_KEY); 

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpires = Date.now() + 15 * 60 * 1000; 
        await user.save();

        await resend.emails.send({
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Your Church Account OTP Code',
            html: `
                <div style="font-family: sans-serif; text-align: center; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>Hello ${user.name},</p>
                    <p>Use the code below to reset your password. It expires in 15 minutes.</p>
                    <h1 style="color: #4f46e5; letter-spacing: 8px; background: #f4f4f9; padding: 10px; display: inline-block;">${otp}</h1>
                    <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
                </div>
            `
        });

        res.status(200).json({ success: true, message: "OTP code sent to your email successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 4. VERIFY OTP & RESET PASSWORD ---
export const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ 
            email, 
            resetPasswordOtp: otp,
            resetPasswordOtpExpires: { $gt: Date.now() } 
        });

        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful! You can now log in." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 5. LOGOUT ---
export const logout = (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ success: true, message: "Logged out successfully!" });
};
