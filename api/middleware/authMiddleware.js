import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        // 1. Get the token from the secure cookie we created
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }

        // 2. Verify the token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        // 3. Find the user in the database (excluding the password)
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 4. Attach the user to the request object so controllers can use it
        req.user = user;

        next(); // Move to the next function (the controller)
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// api/middleware/authMiddleware.js

export const adminOnly = (req, res, next) => {
    // protectRoute must be called before this to attach req.user
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ 
            success: false, 
            message: "Access Denied: Only Admins can view this page" 
        });
    }
};
