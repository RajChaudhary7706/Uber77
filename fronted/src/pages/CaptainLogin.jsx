import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [CaptainData, setCaptainData] = useState({})

const submitHandler = (e) => {
  e.preventDefault()

  const data = {
    email,
    password
  }

  setCaptainData(data)
  console.log(data) // ✅ log the updated data correctly

  setEmail('')
  setPassword('')
}

  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
      <img className='w-16 h-3 mb-5' src='https://pngimg.com/uploads/uber/uber_PNG6.png'/>

      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
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

        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base'>Login</button>

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
