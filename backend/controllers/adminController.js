import doctorModel from '../models/doctorModel.js';
import cloudinary from 'cloudinary';

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address, gender, dob, phone } = req.body;

        const imageFile = req.file;

        // Upload image to Cloudinary (if provided)
        const imageURL = imageFile ? await cloudinary.uploader.upload(imageFile.path).then((result) => result.secure_url) : '';

        // Create new doctor document
        const newDoctor = new doctorModel({
            name,
            email,
            password,
            image: imageURL,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
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

export { addDoctor };