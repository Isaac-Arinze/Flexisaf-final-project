import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import { verifyEmailConfig } from './config/email.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import doctorModel from './models/doctorModel.js';
import userModel from './models/userModel.js';

const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
    await connectDB();
    await connectCloudinary();
    await verifyEmailConfig();

    // Middlewares
    app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);

    app.get('/', (req, res) => {
        res.send('API WORKING confirm');
    });

    app.listen(port, () => console.log(`Server started on port ${port}`));
};

startServer();
