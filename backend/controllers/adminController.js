import doctorModel from '../models/doctorModel.js';
import cloudinary from 'cloudinary';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address, gender, dob, phone } = req.body;

        const imageFile = req.file;

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing doctor's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary (if provided)
        const imageURL = imageFile ? await cloudinary.uploader.upload(imageFile.path).then((result) => result.secure_url) : '';

        // Create new doctor document
        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            image: imageURL,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
            gender,
            dob,
            phone,
        });

        await newDoctor.save();

        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addDoctor, loginAdmin };