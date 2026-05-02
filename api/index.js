import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import serverless from 'serverless-http';
import { v2 as cloudinary } from 'cloudinary';
import './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load Environment Variables
dotenv.config();

// Create Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary Configuration (For Church Media/Profile Photos)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173'].filter(Boolean);
const allowAllOrigins = !process.env.FRONTEND_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowAllOrigins || allowedOrigins.includes(origin)) {
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

// Define API Endpoints
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Church Management API' });
});

if (process.env.VERCEL !== '1' && process.env.NETLIFY !== 'true') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}

export const handler = serverless(app);
