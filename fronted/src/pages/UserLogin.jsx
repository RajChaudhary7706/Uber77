// import React, {useState} from 'react'
// import { Link } from 'react-router-dom'

// const UserLogin = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [userData, setUserData] = useState({})

//   const submitHandler = (e) => {
//     e.preventDefault()
//     setUserData({
//       email,
//       password
//     })
//     console.log(userData);
//     setEmail('')
//     setPassword('')
//   }
  
//   return (
//     <div className='p-7 h-screen flex flex-col justify-between '>
//       <div>
//       <img className='w-16 mb-10' src='https://logospng.org/download/uber/logo-uber-4096.png'/>

//       <form onSubmit={(e)=>{
//         submitHandler(e)
//       }}>
//         <h3 className='text-lg font-medium mb-2'>What's your email</h3>
//         <input required 
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:base' type='email' placeholder='Email@example.com' />

//         <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
//         <input required
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:base' type='password' placeholder='Password' />

//         <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base'>Login</button>

//       </form>

//         <p>New here? <Link to='/signup' className='text-blue-600'>Create New Account</Link>
//         </p>

//       </div>

//       <div>
//         <Link to='/captain-login' className='bg-[#3c8a3c] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:base'>Sign in as Captain</Link>
//       </div>
//     </div>
//   )
// }

// export default UserLogin


import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserDataContext } from "../UserContext/UserDataContext"

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      )

      if (response.status === 200) {
        setUser(response.data.user)
        localStorage.setItem("token", response.data.token)
        navigate("/home")
      }
    } catch (error) {
      console.error(error.response?.data || error.message)
      alert(error.response?.data?.message || "Login failed")
    }

    setEmail("")
    setPassword("")
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://logospng.org/download/uber/logo-uber-4096.png"
          alt="Uber logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="Email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="Password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>

        <p>
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create New Account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="bg-[#3c8a3c] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
