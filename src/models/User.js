import mongoose from "mongoose";
import { memberDB } from "../config/db.js"; // ✅ Correct import

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your full name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false, 
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add a phone number"],
    },
    profileImage: {
        type: String,
        default: "", 
    },
    resetPasswordOtp: {
        type: String,
        default: null,
    },
    resetPasswordOtpExpires: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        enum: ["member", "admin", "pastor"],
        default: "member",
    }
}, { timestamps: true });

// ✅ Use memberDB so it points to 'church_db'
const User = memberDB.model("User", userSchema);

export default User; // ✅ This allows other files to use 'import User'
