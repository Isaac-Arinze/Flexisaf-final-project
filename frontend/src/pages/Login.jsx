import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hospitalImage from '../assets/hospital_image.jpg';
import { EmailVerification } from '../components/EmailVerification';
import { AppContext } from '../context/AppContext';

export const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const { registerUser, loginUser, loading } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      // Registration
      const result = await registerUser(name, email, password);
      if (result.success) {
        setPendingEmail(email);
        setShowVerification(true);
      }
    } else {
      // Login
      const result = await loginUser(email, password);
      if (result.success) {
        navigate('/');
      } else if (result.requiresVerification) {
        setPendingEmail(email);
        setShowVerification(true);
      }
    }
  }

  // Handle verification success
  const handleVerificationSuccess = () => {
    setShowVerification(false);
    setState('Login');
    setEmail(pendingEmail);
    setPassword('');
    setName('');
  }

  // Handle back to login
  const handleBackToLogin = () => {
    setShowVerification(false);
    setPendingEmail('');
  }

  // Show email verification component
  if (showVerification) {
    return (
      <EmailVerification
        email={pendingEmail}
        onVerificationSuccess={handleVerificationSuccess}
        onBack={handleBackToLogin}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md md:max-w-lg lg:max-w-2xl flex flex-col lg:flex-row items-center">
        <form className="w-full lg:w-1/2 lg:mr-8" onSubmit={onSubmitHandler}>
          <div className="mb-6 text-center">
            <p className="text-2xl font-semibold">{state === 'Sign Up' ? "Create Account" : "Login"}</p>
            <p className="text-gray-600">Please {state === 'Sign Up' ? "sign up" : "login"} to book an appointment</p>
          </div>
          {state === 'Sign Up' && (
            <div className="mb-4">
              <p className="font-semibold">Full Name</p>
              <input type="text" className="w-full p-2 border rounded mt-1" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          )}
          <div className="mb-4">
            <p className="font-semibold">Email</p>
            <input type="email" className="w-full p-2 border rounded mt-1" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className="mb-4">
            <p className="font-semibold">Password</p>
            <input type="password" className="w-full p-2 border rounded mt-1" onChange={(e) => setPassword(e.target.value)} value={password} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300" disabled={loading}>
            {loading ? 'Processing...' : (state === 'Sign Up' ? "Create Account" : "Login")}
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              {state === 'Sign Up' ? (
                <p>Already have an account? <span onClick={()=>setState ('Login')} className="text-blue-600 hover:text-blue-800 cursor-pointer">Click to Login</span></p>
              ) : (
                <p>Don't have an account? <span onClick={()=>setState ('Sign Up')} className="text-blue-600 hover:text-blue-800 cursor-pointer">Sign Up here</span></p>
              )}
            </p>
          </div>
        </form>
        <div className="mt-8 lg:mt-0 w-full lg:w-1/2">
          <img src={hospitalImage} alt="Hospital" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}
