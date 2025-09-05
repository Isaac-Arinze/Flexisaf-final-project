import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../context/AppContext'

export const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const { forgotPassword, loading } = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      return
    }

    const result = await forgotPassword(email)
    if (result.success) {
      setEmailSent(true)
    }
  }

  const handleReset = () => {
    setEmail('')
    setEmailSent(false)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>

            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
              >
                Send to Different Email
              </button>

              <button
                onClick={onBack}
                className="w-full bg-gray-500 text-white py-3 rounded hover:bg-gray-600 transition duration-300"
              >
                Back to Login
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Didn't receive the email?</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Check your spam/junk folder</li>
                <li>• The link expires in 1 hour</li>
                <li>• Make sure the email address is correct</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Forgot Password?</h2>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

ForgotPassword.propTypes = {
  onBack: PropTypes.func.isRequired
}
