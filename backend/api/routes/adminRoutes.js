import express from "express";
import { getAllMembers, deleteMember } from "../controllers/adminController.js";

const router = express.Router();

router.get("/members", getAllMembers);
router.delete("/member/:id", deleteMember); // ✅ Ensure it uses :id

export default router;
