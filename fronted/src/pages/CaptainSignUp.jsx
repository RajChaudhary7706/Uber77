import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../UserContext/CaptainDataContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignUp = () => {
  const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    // const [userData, setUserData] = useState({})
    
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [redirecting, setRedirecting] = useState(false)
    const [redirectTimeoutId, setRedirectTimeoutId] = useState(null)

  const { setCaptain } = React.useContext(CaptainDataContext);
  // console.log('existing captain:', captain);

    const submitHandler = async (e) => {
      e.preventDefault()
      if (!['car','auto','bike'].includes(vehicleType)) {
        setError('Please select a valid vehicle type: car, auto, or bike.')
        return
      }

      const newCaptain = {
        fullname: {
          firstname: firstname,
          lastname: lastname
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: Number(vehicleCapacity),
          vehicleType: vehicleType
        }
      }

      setIsSubmitting(true)
      setError(null)

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)
        if (response.status === 201) {
          setCaptain(response.data.captain)
          localStorage.setItem('token', response.data.token)
          // reset form
          setEmail('')
          setPassword('')
          setFirstName('')
          setLastName('')
          setVehicleColor('')
          setVehiclePlate('')
          setVehicleCapacity('')
          setVehicleType('')
          navigate('/captain-home')
        }
      } catch (err) {
        console.error('Signup error:', err.response?.data || err.message)
        const serverMessage = err.response?.data?.message
        if (err.response?.status === 409) {
          const msg = serverMessage || 'An account with this email already exists. Redirecting to login...'
          setError(msg)
          setRedirecting(true)
          const id = setTimeout(() => {
            navigate(`/captain-login?email=${encodeURIComponent(email)}`)
          }, 3000)
          setRedirectTimeoutId(id)
        } else {
          setError(serverMessage || 'Signup failed. Please try again.')
        }
      } finally {
        setIsSubmitting(false)
      }
    }

  React.useEffect(() => {
    return () => {
      if (redirectTimeoutId) clearTimeout(redirectTimeoutId)
    }
  }, [redirectTimeoutId])

  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
      <img className='w-16 mb-10' src='https://pngimg.com/uploads/uber/uber_PNG6.png'/>

      {error && (
        <div className='text-red-600 mb-4'>
          {error}
          {error.toLowerCase().includes('exist') && (
            <>
              <Link to={`/captain-login?email=${encodeURIComponent(email)}`} className='text-blue-600 underline ml-2'>Login</Link>
              {redirecting && <span className='ml-2 text-sm'>(Redirecting in 3s...)</span>}
            </>
          )}
        </div>
      )}

      <form onSubmit={submitHandler}>

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

        <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
        <div className='flex flex-col gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:base'
            type='text'
            placeholder='Vehicle Color'
            value={vehicleColor}
            onChange={(e)=> setVehicleColor(e.target.value)}
          />
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:base'
            type='text'
            placeholder='Vehicle Plate'
            value={vehiclePlate}
            onChange={(e)=> setVehiclePlate(e.target.value)}
          />
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:base'
            type='number'
            min='1'
            placeholder='Vehicle Capacity'
            value={vehicleCapacity}
            onChange={(e)=> setVehicleCapacity(e.target.value)}
          />
          <select
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:base'
            value={vehicleType}
            onChange={(e)=> setVehicleType(e.target.value)}
          >
            <option value=''>Select vehicle type</option>
            <option value='car'>Car</option>
            <option value='auto'>Auto</option>
            <option value='bike'>Bike</option>
          </select>
        </div>

        <button disabled={isSubmitting} className='bg-[#111] disabled:opacity-60 text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:base'>{isSubmitting ? 'Creating...' : 'Create Captain Account'}</button>

      </form>

        <p>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
        </p>

      </div>

      <p className='text-xs leading-tight'>We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you sign up as a Captain on our platform.</p>
    </div>
  )
}

export default CaptainSignUp
