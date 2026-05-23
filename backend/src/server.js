// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import { v2 as cloudinary } from 'cloudinary';
// import authRoutes from './routes/authRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

// // Load Environment Variables
// dotenv.config();

// // Create Express App
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Cloudinary Configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // ✅ CORS FIX (allow Netlify frontend)
// const allowedOrigins = [
//     process.env.FRONTEND_URL,
//     'https://ecclesia-faith-assembly.vercel.app',
//     'http://localhost:5173',
//     'http://127.0.0.1:5173'
// ].filter(Boolean);

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('CORS not allowed'));
//         }
//     },
//     credentials: true
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);

// // Database Connection
// let cachedConnection = global.mongoose;

// if (!cachedConnection) {
//     cachedConnection = global.mongoose = { conn: null, promise: null };
// }

// const connectDB = async () => {
//     if (cachedConnection.conn) return cachedConnection.conn;

//     if (!cachedConnection.promise) {
//         cachedConnection.promise = mongoose.connect(process.env.MONGO_URL, {
//             dbName: process.env.MONGO_DB_NAME
//         }).then((mongooseInstance) => {
//             console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host}`);
//             return mongooseInstance;
//         }).catch((error) => {
//             console.error(`❌ Database Connection Error: ${error.message}`);
//             cachedConnection.promise = null;
//             throw error;
//         });
//     }

//     cachedConnection.conn = await cachedConnection.promise;
//     return cachedConnection.conn;
// };

// // Basic test route
// app.get('/', (req, res) => {
//     res.send('Church API is running 🚀');
// });

// // API test route
// app.get('/api', async (req, res) => {
//     try {
//         await connectDB();
//         res.json({ message: 'Welcome to the Church Management API' });
//     } catch (error) {
//         res.status(500).json({ error: 'Database connection failed' });
//     }
// });

// // Start Server
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`🚀 Server running on port ${PORT}`);
//     });
// }).catch(() => {
//     console.error('❌ Failed to connect to database');
// });

// export default app;


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load Environment Variables
dotenv.config();

// Create Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ CORS FIX (Handles all Vercel previews, local development, and production)
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://ecclesia-faith-assembly.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // 1. Allow internal requests or exact matches from the list
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        // 2. Dynamic check: Allow ANY generated preview URL ending with vercel.app
        const isVercelPreview = origin.endsWith('.vercel.app') && origin.includes('ecclesia-faith-assembly');
        
        if (isVercelPreview) {
            return callback(null, true);
        }
        
        // 3. Reject other unauthorized domains
        callback(new Error('CORS not allowed'));
    },
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Database Connection
let cachedConnection = global.mongoose;

if (!cachedConnection) {
    cachedConnection = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cachedConnection.conn) return cachedConnection.conn;

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

// Basic test route
app.get('/', (req, res) => {
    res.send('Church API is running 🚀');
});

// API test route
app.get('/api', async (req, res) => {
    try {
        await connectDB();
        res.json({ message: 'Welcome to the Church Management API' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch(() => {
    console.error('❌ Failed to connect to database');
});

export default app;
