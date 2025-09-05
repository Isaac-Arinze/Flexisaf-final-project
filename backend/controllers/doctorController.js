import doctorModel from '../models/doctorModel.js';

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');

        // If no doctors in database, use static data
        if (doctors.length === 0) {
            const staticDoctors = [
                {
                    _id: 'doc1',
                    name: 'Dr. Richard James',
                    image: 'https://via.placeholder.com/150?text=Dr.+Richard+James',
                    speciality: 'General physician',
                    degree: 'MBBS',
                    experience: '4 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 50,
                    address: {
                        line1: '17th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc2',
                    name: 'Dr. Emily Larson',
                    image: '/src/assets/doc2.png',
                    speciality: 'Gynecologist',
                    degree: 'MBBS',
                    experience: '3 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 60,
                    address: {
                        line1: '27th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc3',
                    name: 'Dr. Sarah Patel',
                    image: '/src/assets/doc3.png',
                    speciality: 'Dermatologist',
                    degree: 'MBBS',
                    experience: '1 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 30,
                    address: {
                        line1: '37th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc4',
                    name: 'Dr. Christopher Lee',
                    image: '/src/assets/doc4.png',
                    speciality: 'Pediatricians',
                    degree: 'MBBS',
                    experience: '2 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 40,
                    address: {
                        line1: '47th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc5',
                    name: 'Dr. Jennifer Garcia',
                    image: '/src/assets/doc5.png',
                    speciality: 'Neurologist',
                    degree: 'MBBS',
                    experience: '4 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 50,
                    address: {
                        line1: '57th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc6',
                    name: 'Dr. Andrew Williams',
                    image: '/src/assets/doc6.png',
                    speciality: 'Neurologist',
                    degree: 'MBBS',
                    experience: '4 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 50,
                    address: {
                        line1: '57th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc7',
                    name: 'Dr. Christopher Davis',
                    image: '/src/assets/doc7.png',
                    speciality: 'General physician',
                    degree: 'MBBS',
                    experience: '4 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 50,
                    address: {
                        line1: '17th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc8',
                    name: 'Dr. Timothy White',
                    image: '/src/assets/doc8.png',
                    speciality: 'Gynecologist',
                    degree: 'MBBS',
                    experience: '3 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 60,
                    address: {
                        line1: '27th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc9',
                    name: 'Dr. Ava Mitchell',
                    image: '/src/assets/doc9.png',
                    speciality: 'Dermatologist',
                    degree: 'MBBS',
                    experience: '1 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 30,
                    address: {
                        line1: '37th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc10',
                    name: 'Dr. Jeffrey King',
                    image: '/src/assets/doc10.png',
                    speciality: 'Pediatricians',
                    degree: 'MBBS',
                    experience: '2 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 40,
                    address: {
                        line1: '47th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc11',
                    name: 'Dr. Zoe Kelly',
                    image: '/src/assets/doc11.png',
                    speciality: 'Neurologist',
                    degree: 'MBBS',
                    experience: '4 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 50,
                    address: {
                        line1: '57th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc12',
                    name: 'Dr. Patrick Harris',
                    image: '/src/assets/doc12.png',
                    speciality: 'Neurologist',
                    degree: 'MBBS',
                    experience: '4 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 50,
                    address: {
                        line1: '57th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc13',
                    name: 'Dr. Chloe Evans',
                    image: '/src/assets/doc13.png',
                    speciality: 'General physician',
                    degree: 'MBBS',
                    experience: '4 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 50,
                    address: {
                        line1: '17th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc14',
                    name: 'Dr. Ryan Martinez',
                    image: '/src/assets/doc14.png',
                    speciality: 'Gynecologist',
                    degree: 'MBBS',
                    experience: '3 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 60,
                    address: {
                        line1: '27th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                },
                {
                    _id: 'doc15',
                    name: 'Dr. Amelia Hill',
                    image: '/src/assets/doc15.png',
                    speciality: 'Dermatologist',
                    degree: 'MBBS',
                    experience: '1 Years',
                    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                    fees: 30,
                    address: {
                        line1: '37th Cross, Richmond',
                        line2: 'Circle, Ring Road, London'
                    }
                }
            ];
            return res.json({ success: true, doctors: staticDoctors });
        }

        res.json({ success: true, doctors });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        // Fallback to static data when database is not available
        const staticDoctors = [
            {
                _id: 'doc1',
                name: 'Dr. Richard James',
                image: '/src/assets/doc1.png',
                speciality: 'General physician',
                degree: 'MBBS',
                experience: '4 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 50,
                address: {
                    line1: '17th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc2',
                name: 'Dr. Emily Larson',
                image: '/src/assets/doc2.png',
                speciality: 'Gynecologist',
                degree: 'MBBS',
                experience: '3 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 60,
                address: {
                    line1: '27th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc3',
                name: 'Dr. Sarah Patel',
                image: '/src/assets/doc3.png',
                speciality: 'Dermatologist',
                degree: 'MBBS',
                experience: '1 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 30,
                address: {
                    line1: '37th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc4',
                name: 'Dr. Christopher Lee',
                image: '/src/assets/doc4.png',
                speciality: 'Pediatricians',
                degree: 'MBBS',
                experience: '2 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 40,
                address: {
                    line1: '47th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc5',
                name: 'Dr. Jennifer Garcia',
                image: '/src/assets/doc5.png',
                speciality: 'Neurologist',
                degree: 'MBBS',
                experience: '4 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 50,
                address: {
                    line1: '57th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc6',
                name: 'Dr. Andrew Williams',
                image: '/src/assets/doc6.png',
                speciality: 'Neurologist',
                degree: 'MBBS',
                experience: '4 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 50,
                address: {
                    line1: '57th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc7',
                name: 'Dr. Christopher Davis',
                image: '/src/assets/doc7.png',
                speciality: 'General physician',
                degree: 'MBBS',
                experience: '4 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 50,
                address: {
                    line1: '17th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc8',
                name: 'Dr. Timothy White',
                image: '/src/assets/doc8.png',
                speciality: 'Gynecologist',
                degree: 'MBBS',
                experience: '3 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 60,
                address: {
                    line1: '27th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc9',
                name: 'Dr. Ava Mitchell',
                image: '/src/assets/doc9.png',
                speciality: 'Dermatologist',
                degree: 'MBBS',
                experience: '1 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 30,
                address: {
                    line1: '37th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc10',
                name: 'Dr. Jeffrey King',
                image: '/src/assets/doc10.png',
                speciality: 'Pediatricians',
                degree: 'MBBS',
                experience: '2 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 40,
                address: {
                    line1: '47th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc11',
                name: 'Dr. Zoe Kelly',
                image: '/src/assets/doc11.png',
                speciality: 'Neurologist',
                degree: 'MBBS',
                experience: '4 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 50,
                address: {
                    line1: '57th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc12',
                name: 'Dr. Patrick Harris',
                image: '/src/assets/doc12.png',
                speciality: 'Neurologist',
                degree: 'MBBS',
                experience: '4 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 50,
                address: {
                    line1: '57th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc13',
                name: 'Dr. Chloe Evans',
                image: '/src/assets/doc13.png',
                speciality: 'General physician',
                degree: 'MBBS',
                experience: '4 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 50,
                address: {
                    line1: '17th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc14',
                name: 'Dr. Ryan Martinez',
                image: '/src/assets/doc14.png',
                speciality: 'Gynecologist',
                degree: 'MBBS',
                experience: '3 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 60,
                address: {
                    line1: '27th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            },
            {
                _id: 'doc15',
                name: 'Dr. Amelia Hill',
                image: '/src/assets/doc15.png',
                speciality: 'Dermatologist',
                degree: 'MBBS',
                experience: '1 Years',
                about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
                fees: 30,
                address: {
                    line1: '37th Cross, Richmond',
                    line2: 'Circle, Ring Road, London'
                }
            }
        ];
        res.json({ success: true, doctors: staticDoctors });
    }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorModel.findById(id).select('-password');
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' });
        }
        res.json({ success: true, doctor });
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.json({ success: false, message: 'Error fetching doctor' });
    }
};

// Get doctors by speciality
const getDoctorsBySpeciality = async (req, res) => {
    try {
        const { speciality } = req.params;
        const doctors = await doctorModel.find({ speciality: new RegExp(speciality, 'i') }).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error('Error fetching doctors by speciality:', error);
        res.json({ success: false, message: 'Error fetching doctors' });
    }
};

// Doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        // For now, simple password check (in production, use bcrypt)
        if (password !== doctor.password) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        res.json({ success: true, doctor: { ...doctor._doc, password: undefined } });
    } catch (error) {
        console.error('Doctor login error:', error);
        res.json({ success: false, message: 'Login failed' });
    }
};

export { getAllDoctors, getDoctorById, getDoctorsBySpeciality, loginDoctor };
