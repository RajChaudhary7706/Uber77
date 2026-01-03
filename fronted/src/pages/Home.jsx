import React, { useState } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationPanel from '../components/LocationPanel'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelopen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const panelRef = useRef(null)
  const panelCloseRef=useRef('')
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
      height:'70%',
      padding:24
      // opacity:1
    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
  }
    else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:0
        // opacity:1
    })
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
    }

  },[panelOpen,panelCloseRef])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src='https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png'/>
      <div className='h-screen w-screen'>
        <img className=' h-full w-full object-cover ' src='https://i.stack.imgur.com/gtiI7.gif'/>
      </div>
      <div className=' flex flex-col justify-end  h-screen absolute w-full top-0'>

        <div className='relative h-[30%] p-5 bg-white'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelopen(false)
          }}>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e)=>{
              submitHandler(e)
            }}>
              <div className='line absolute h-16 w-1 top-[38%] left-10 bg-gray-900 '></div>
              <input 
              onClick={()=>{
                setPanelopen(true)
              }}
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 test-base rounded-lg w-full mt-3' type="text" 
              placeholder='Add a pickup location'/>
              <input 
              onClick={()=>{
                setPanelopen(true)
              }}
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 test-base rounded-lg w-full mt-3' type='text' 
              placeholder='Enter your destination'/>
            </form>
          </div>

        <div ref={panelRef} className='bg-white h-0'>
              <LocationPanel/>
        </div>
      </div>
      <div className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
        <h3 className='text-2xl font-semibold mb-2'>Choose a Vehicle</h3>
<div
  onClick={() => setSelectedVehicle("go")}
  className={`flex border-2 mb-2 rounded-xl w-full p-3 items-center justify-between
    cursor-pointer transition-all duration-200
    ${
      selectedVehicle === "go"
        ? "border-black bg-gray-100"
        : "border-gray-300 hover:border-gray-400"
    }`}
>
  <img
    className="h-14 object-contain"
    src="https://tse2.mm.bing.net/th/id/OIP.3yBdcvCnuV9dkWXOQS_akwHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3"
    alt="UberGo"
  />

  <div className="ml-3 w-1/2">
    <h4 className="font-medium text-base flex items-center gap-1">
      UberGo <i className="ri-user-3-fill"></i> 4
    </h4>
    <h5 className="font-medium text-sm text-gray-600">2 mins away</h5>
    <p className="font-medium text-xs text-gray-500">
      Affordable, compact rides
    </p>
  </div>

  <h2 className="text-lg font-semibold">₹193.20</h2>
</div>


<div
  onClick={() => setSelectedVehicle("Moto")}
  className={`flex border-2 mb-2 rounded-xl w-full p-3 items-center justify-between
    cursor-pointer transition-all duration-200
    ${
      selectedVehicle === "Moto"
        ? "border-black bg-gray-100"
        : "border-gray-300 hover:border-gray-400"
    }`}
>
  <img
    className="h-14 object-contain"
    src="https://tse3.mm.bing.net/th/id/OIP.X0fWNPCUDNzhSyJlSpe8wgHaHV?rs=1&pid=ImgDetMain&o=7&rm=3"
    alt="Moto"
  />

  <div className="ml-3 w-1/2">
    <h4 className="font-medium text-base flex items-center gap-1">
      Moto <i className="ri-user-3-fill"></i> 1
    </h4>
    <h5 className="font-medium text-sm text-gray-600">3 mins away</h5>
    <p className="font-medium text-xs text-gray-500">
      Affordable motorcycle rides
    </p>
  </div>

  <h2 className="text-lg font-semibold">₹65.20</h2>
</div>


<div
  onClick={() => setSelectedVehicle("UberAuto")}
  className={`flex border-2 mb-2 rounded-xl w-full p-3 items-center justify-between
    cursor-pointer transition-all duration-200
    ${
      selectedVehicle === "UberAuto"
        ? "border-black bg-gray-100"
        : "border-gray-300 hover:border-gray-400"
    }`}
>
  <img
    className="h-14 object-contain"
    src="https://st3.depositphotos.com/5934840/12812/v/600/depositphotos_128128242-stock-illustration-isolated-three-wheeler-vehicle-design.jpg"
    alt="Auto"
  />

  <div className="ml-3 w-1/2">
    <h4 className="font-medium text-base flex items-center gap-1">
      UberAuto <i className="ri-user-3-fill"></i> 4
    </h4>
    <h5 className="font-medium text-sm text-gray-600">5 mins away</h5>
    <p className="font-medium text-xs text-gray-500">
      Affordable auto rides
    </p>
  </div>

  <h2 className="text-lg font-semibold">₹115.20</h2>
</div>

      </div>
    </div>


  )
}

export default Home
