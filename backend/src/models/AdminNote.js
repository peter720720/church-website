import mongoose from "mongoose";
import { adminDB } from "../config/db.js"; // ✅ Connects to the private Admin Database

const adminNoteSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Note title is required"] 
    },
    content: { 
        type: String, 
        required: [true, "Note content is required"] 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
    // References the ID of the Admin/Pastor from the main User collection
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['Financial', 'Counseling', 'Administrative', 'General'],
        default: 'General'
    }
}, { timestamps: true });

// ✅ Use adminDB to ensure this stays isolated
const AdminNote = adminDB.model("AdminNote", adminNoteSchema);

export default AdminNote;
