import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../UserContext/CaptainDataContext'

const CaptainLogin = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isSubmitting, setIsSubmitting] = useState(false)
const [error, setError] = useState(null)
const navigate = useNavigate();
const location = useLocation();
const { setCaptain } = useContext(CaptainDataContext)

useEffect(() => {
  const params = new URLSearchParams(location.search)
  const prefEmail = params.get('email')
  if (prefEmail) setEmail(prefEmail)
}, [location.search])


const submitHandler = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError(null)

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, { email, password })
    if (response.status === 200) {
      setCaptain(response.data.captain)
      localStorage.setItem('token', response.data.token)
      navigate('/captain-home')
    }
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message)
    setError(err.response?.data?.message || 'Login failed. Please try again.')
  } finally {
    setIsSubmitting(false)
    setPassword('')
  }
}


  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
      <img className='w-16 h-3 mb-5' src='https://pngimg.com/uploads/uber/uber_PNG6.png'/>

      {error && <div className='text-red-600 mb-4'>{error}</div>}
      <form onSubmit={submitHandler}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:base' type='email' placeholder='Email@example.com' />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:base' type='password' placeholder='Password' />

        <button disabled={isSubmitting} className='bg-[#111] disabled:opacity-60 text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base'>{isSubmitting ? 'Signing in...' : 'Login'}</button>

      </form>

        <p>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
        </p>

      </div>

      <div>
        <Link to='/login' className='bg-[#8f782c] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
