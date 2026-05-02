import User from "../models/User.js";

// --- 1. GET ALL MEMBERS ---
export const getAllMembers = async (req, res) => {
    try {
        // Fetches all users from church_db via the memberDB connection
        const members = await User.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: members.length,
            members
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 2. DELETE A MEMBER ---
export const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Member not found" });
        }

        res.status(200).json({
            success: true,
            message: "Member removed from church records successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
