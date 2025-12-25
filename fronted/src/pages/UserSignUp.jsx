// import React, {useState} from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { UserDataContext as UserContext } from '../UserContext/UserDataContext'

// const UserSignUp = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [firstname, setFirstName] = useState('')
//     const [lastname, setLastName] = useState('')
//     const [userData, setUserData] = useState({})

//     const navigate = useNavigate();
//     const {user,setUser} = React.useContext(UserContext);
  
//     const submitHandler = async (e) => {
//       e.preventDefault()
//       const newUser={
//         fullname:{
//         firstname:firstname,
//         lastname:lastname  
//       },
//       email:email,
//       password:password
//     }

//     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)
//     if(response.status === 201){
//       const data = response.data;
//       setUser(data.user);
//       navigate('/Home');
//     }

//     console.log(userData);
//     setEmail('')
//     setPassword('')
//     setFirstName('')
//     setLastName('')  

//     navigate('/login');
//     }

//   return (
//     <div className='p-7 h-screen flex flex-col justify-between '>
//       <div>
//       <img className='w-16 mb-10' src='https://logospng.org/download/uber/logo-uber-4096.png'/>

//       <form onSubmit={(e)=>{
//         submitHandler(e)
//       }}>

//         <h3 className='text-base font-medium mb-2'>What's your Name</h3>
//         <div className='flex gap-4 mb-5'>
//         <input required 

//         className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:base' type='text'
//         placeholder='Firstname'
//         value={firstname}
//         onChange={(e)=>{
//           setFirstName(e.target.value)
//         }} />

//         <input required 

//         className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:base' type='text' 
//         placeholder='Lastname'
//         value={lastname}
//         onChange={(e)=>{
//           setLastName(e.target.value)
//         }}  />
//         </div>

//         <h3 className='text-base font-medium mb-2'>What's your email</h3>
//         <input required
//         value={email}
//         onChange={(e)=>{
//           setEmail(e.target.value)
//         }}         

//         className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:base' type='email' placeholder='Email@example.com' />

//         <h3 className='text-base font-medium mb-2'>Enter Password</h3>
//         <input required
//         value={password}
//         onChange={(e)=>{
//           setPassword(e.target.value)
//         }} 

//         className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:base' type='password' placeholder='Password' />

//         <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base'>Create Account </button>

//       </form>

//         <p>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link>
//         </p>

//       </div>

//       <p className='text-xs'>Proceeding with your request now. Please wait while we securely process your submitted details and prepare the next step</p>
//     </div>
//   )
// }

// export default UserSignUp

import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../UserContext/UserDataContext'

const UserSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      )

      if (response.status === 201) {
        setUser(response.data.user)
        localStorage.setItem("token", response.data.token)
        navigate('/home') // ✅ correct & only navigation
      }
    } catch (error) {
      console.error(error.response?.data || error.message)
      alert('Signup failed. Please try again.')
    }

    // reset form
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
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
          <h3 className="text-base font-medium mb-2">What's your Name</h3>

          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="Email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Create Account
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <p className="text-xs">
        Proceeding with your request now. Please wait while we securely process
        your submitted details and prepare the next step.
      </p>
    </div>
  )
}

export default UserSignUp
