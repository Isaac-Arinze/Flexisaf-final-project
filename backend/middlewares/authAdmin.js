import jwt from 'jsonwebtoken';

// admin auth middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            console.log('Token not provided');
            return res.json({ success: false, message: 'Not Authorized login again' });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        console.log('Decoded token:', token_decode);

        if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD) {
            console.log('Token does not match admin credentials');
            return res.json({ success: false, message: 'Not Authorized login again' });
        }

        next();
    } catch (error) {
        console.log('Error in authAdmin middleware:', error);
        res.json({ success: false, message: error.message });
    }
}
export default authAdmin;
