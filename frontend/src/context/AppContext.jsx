import { createContext, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { doctors as staticDoctors } from "../assets/assets"

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₦'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    const [doctors, setDoctors] = useState(staticDoctors)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [loading, setLoading] = useState(false)

    // Check if user is logged in on app start
    useEffect(() => {
        if (token) {
            loadUserProfile()
        }
        loadDoctors()
    }, [token])

    // Load user profile
    const loadUserProfile = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/profile`, {}, {
                headers: { token }
            })
            if (data.success) {
                setUser(data.user)
            }
        } catch (error) {
            console.error('Error loading user profile:', error)
            // If token is invalid, clear it
            if (error.response?.status === 401) {
                logout()
            }
        }
    }

    // Load doctors
    const loadDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`)
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                // Fallback to static data if API fails
                setDoctors(staticDoctors)
            }
        } catch (error) {
            console.error('Error loading doctors:', error)
            // Fallback to static data if API fails
            setDoctors(staticDoctors)
        }
    }

    // User registration
    const registerUser = async (name, email, password) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${backendUrl}/api/user/register`, {
                name, email, password
            })

            if (data.success) {
                toast.success('Registration successful! Please check your email for verification code.')
                return { success: true, userId: data.userId }
            } else {
                toast.error(data.message || 'Registration failed')
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Registration error:', error)
            const message = error.response?.data?.message || 'Registration failed'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // Email verification
    const verifyEmail = async (email, verificationCode) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${backendUrl}/api/user/verify-email`, {
                email, verificationCode
            })

            if (data.success) {
                toast.success('Email verified successfully! You can now login.')
                return { success: true }
            } else {
                toast.error(data.message || 'Email verification failed')
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Email verification error:', error)
            const message = error.response?.data?.message || 'Email verification failed'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // Resend verification code
    const resendVerificationCode = async (email) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${backendUrl}/api/user/resend-verification`, {
                email
            })

            if (data.success) {
                toast.success('Verification code sent successfully!')
                return { success: true }
            } else {
                toast.error(data.message || 'Failed to send verification code')
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Resend verification error:', error)
            const message = error.response?.data?.message || 'Failed to send verification code'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // User login
    const loginUser = async (email, password) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${backendUrl}/api/user/login`, {
                email, password
            })

            if (data.success) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                toast.success('Login successful!')
                return { success: true }
            } else {
                if (data.requiresVerification) {
                    toast.error('Please verify your email before logging in.')
                    return { success: false, requiresVerification: true, message: data.message }
                } else {
                    toast.error(data.message || 'Login failed')
                    return { success: false, message: data.message }
                }
            }
        } catch (error) {
            console.error('Login error:', error)
            const message = error.response?.data?.message || 'Login failed'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, {
                email
            })

            if (data.success) {
                toast.success('Password reset email sent successfully!')
                return { success: true }
            } else {
                toast.error(data.message || 'Failed to send password reset email')
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Forgot password error:', error)
            const message = error.response?.data?.message || 'Failed to send password reset email'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // Reset password
    const resetPassword = async (token, newPassword) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
                token, newPassword
            })

            if (data.success) {
                toast.success('Password reset successfully!')
                return { success: true }
            } else {
                toast.error(data.message || 'Password reset failed')
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Reset password error:', error)
            const message = error.response?.data?.message || 'Password reset failed'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // Logout user
    const logout = () => {
        setToken('')
        setUser(null)
        localStorage.removeItem('token')
        toast.success('Logged out successfully')
    }

    // Update user profile
    const updateProfile = async (profileData) => {
        try {
            setLoading(true)
            const { data } = await axios.put(`${backendUrl}/api/user/profile`, profileData, {
                headers: { token }
            })

            if (data.success) {
                setUser(prev => ({ ...prev, ...profileData }))
                toast.success('Profile updated successfully!')
                return { success: true }
            } else {
                toast.error(data.message || 'Profile update failed')
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Profile update error:', error)
            const message = error.response?.data?.message || 'Profile update failed'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // Book an appointment
    const bookAppointment = async (appointmentData) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${backendUrl}/api/user/appointments`, appointmentData, {
                headers: { token }
            })

            if (data.success) {
                toast.success('Appointment booked successfully!')
                return { success: true }
            } else {
                toast.error(data.message || 'Appointment booking failed')
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Appointment booking error:', error)
            const message = error.response?.data?.message || 'Appointment booking failed'
            toast.error(message)
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    // Load user appointments
    const loadUserAppointments = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
                headers: { token }
            })
            if (data.success) {
                return data.appointments
            }
            return []
        } catch (error) {
            console.error('Error loading user appointments:', error)
            return []
        } finally {
            setLoading(false)
        }
    }

    const value = {
        doctors,
        currencySymbol,
        backendUrl,
        user,
        token,
        loading,
        registerUser,
        verifyEmail,
        resendVerificationCode,
        loginUser,
        forgotPassword,
        resetPassword,
        logout,
        updateProfile,
        bookAppointment,
        loadUserAppointments
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppContextProvider
