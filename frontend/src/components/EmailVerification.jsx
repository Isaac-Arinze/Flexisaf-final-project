import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../context/AppContext'

export const EmailVerification = ({ email, onVerificationSuccess, onBack }) => {
  const [verificationCode, setVerificationCode] = useState('')
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { verifyEmail, resendVerificationCode, loading } = useContext(AppContext)

  const handleVerification = async (e) => {
    e.preventDefault()
    if (!verificationCode.trim()) {
      return
    }

    const result = await verifyEmail(email, verificationCode)
    if (result.success) {
      onVerificationSuccess()
    }
  }

  const handleResendCode = async () => {
    const result = await resendVerificationCode(email)
    if (result.success) {
      setResendDisabled(true)
      setCountdown(60)

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setResendDisabled(false)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Verify Your Email</h2>
          <p className="text-gray-600 mt-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-blue-600 font-medium">{email}</p>
        </div>

        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                setVerificationCode(value)
              }}
              className="w-full p-3 border rounded text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength="6"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || verificationCode.length !== 6}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <div>
            <p className="text-sm text-gray-600">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendCode}
              disabled={resendDisabled || loading}
              className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed text-sm font-medium"
            >
              {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
            </button>
          </div>

          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Login
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Tips:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Check your spam/junk folder</li>
            <li>• The code expires in 10 minutes</li>
            <li>• Make sure to enter all 6 digits</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

EmailVerification.propTypes = {
  email: PropTypes.string.isRequired,
  onVerificationSuccess: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}
