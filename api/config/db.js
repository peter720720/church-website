// api/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URL) {
    throw new Error("Missing required environment variable: MONGO_URL");
}

// ✅ Ensure your MONGO_URL in .env ends with /church_db
const memberDB = mongoose.createConnection(process.env.MONGO_URL);

memberDB.on("connected", () => {
    console.log("✅ Member Database (church_db) Connected");
});

export { memberDB };
