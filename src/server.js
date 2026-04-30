import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load Environment Variables
dotenv.config();

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary Configuration (For Church Media/Profile Photos)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Serve frontend static files
const frontendBuildPath = path.join(__dirname, '../church-frontend/dist');
app.use(express.static(frontendBuildPath));

// Database Connection
let cachedConnection = global.mongoose;

if (!cachedConnection) {
    cachedConnection = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cachedConnection.conn) {
        return cachedConnection.conn;
    }

    if (!cachedConnection.promise) {
        cachedConnection.promise = mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.MONGO_DB_NAME
        }).then((mongooseInstance) => {
            console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host}`);
            return mongooseInstance;
        }).catch((error) => {
            console.error(`❌ Database Connection Error: ${error.message}`);
            cachedConnection.promise = null;
            throw error;
        });
    }

    cachedConnection.conn = await cachedConnection.promise;
    return cachedConnection.conn;
};

// Define API Endpoints
app.get('/api', async (req, res) => {
    try {
        await connectDB();
        res.json({ message: 'Welcome to the Church Management API' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', async (req, res) => {
    try {
        await connectDB();
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    } catch (error) {
        res.status(500).json({ error: 'Failed to load app' });
    }
});

if (process.env.VERCEL !== '1') {
    connectDB().catch(() => {});
    app.listen(PORT, () => {
        console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}

export default app;
