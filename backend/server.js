import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorModel from './models/doctorModel.js';
import userModel from './models/userModel.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('API WORKING confirm');
});

app.listen(port, () => console.log(`Server started on port ${port}`));