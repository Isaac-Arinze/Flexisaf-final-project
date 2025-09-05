import express from 'express';
import { getAllDoctors, getDoctorById, getDoctorsBySpeciality, loginDoctor } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

// Get all doctors
doctorRouter.get('/list', getAllDoctors);

// Get doctor by ID
doctorRouter.get('/:id', getDoctorById);

// Get doctors by speciality
doctorRouter.get('/speciality/:speciality', getDoctorsBySpeciality);

// Doctor login
doctorRouter.post('/login', loginDoctor);

export default doctorRouter;
