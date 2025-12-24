import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const CaptainSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [userData, setUserData] = useState({})

  
    const submitHandler = (e) => {
      e.preventDefault()
      setUserData({
        fullname:{
        firstname:firstname,
        lastname:lastname  
      },
      email:email,
      password:password
    })
    console.log(userData);
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')  
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
      <img className='w-16 mb-10' src='https://pngimg.com/uploads/uber/uber_PNG6.png'/>

      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>

        <h3 className='text-base w-full font-medium mb-2'>What's our Captain's Name</h3>
        <div className='flex gap-4 mb-5'>
        <input required 

        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:base' type='text'
        placeholder='Firstname'
        value={firstname}
        onChange={(e)=>{
          setFirstName(e.target.value)
        }} />

        <input required 

        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:base' type='text' 
        placeholder='Lastname'
        value={lastname}
        onChange={(e)=>{
          setLastName(e.target.value)
        }}  />
        </div>

        <h3 className='text-base font-medium mb-2'>What's our Captain's email</h3>
        <input required
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}         

        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:base' type='email' placeholder='Email@example.com' />

        <h3 className='text-base font-medium mb-2'>Enter Password</h3>
        <input required
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }} 

        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:base' type='password' placeholder='Password' />

        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base'>Login</button>

      </form>

        <p>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
        </p>

      </div>

      <p className='text-xs leading-tight'>We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you sign up as a Captain on our platform.</p>
    </div>
  )
}

export default CaptainSignUp
