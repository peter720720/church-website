import mongoose from "mongoose";
import { memberDB } from "../config/db.js";

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

// ✅ Use memberDB for consistency
const AdminNote = memberDB.model("AdminNote", adminNoteSchema);

export default AdminNote;
