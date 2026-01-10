import React, { useState } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationPanel from '../components/LocationPanel'
import VehiclePanel from '../components/vehiclePanel'
import ConfirmedVehicle from '../components/confirmedVehicle'
import LookingForDriver from '../components/lookingForDriver'
import WaitingForDriver from '../components/waitingForDriver'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelopen] = useState(false)
  // const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [confirmationRidePanel,setConfirmRidePanel] = useState(false)
  const [driverPanel, setDriverPanel] = useState(false)
  const [vehiclePanel,setVehiclePanel] = useState(false)
  const [waitingForDriverPanel, setWaitingForDriver] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmationRideref=useRef(null)
  const panelRef = useRef(null)
  const driverRef = useRef(null)
  const waitingForDriverRef = useRef(null)
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

  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel)
    {
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }   

  },[vehiclePanel])

    useGSAP(function(){
    if(confirmationRidePanel)
    {
      gsap.to(confirmationRideref.current,{
      transform:'translateY(0)'
      })
    }else{
      gsap.to(confirmationRideref.current,{
        transform:'translateY(100%)'
      })
    }   

  },[confirmationRidePanel])

    useGSAP(function(){
    if(driverPanel)
    {
      gsap.to(driverRef.current,{
      transform:'translateY(0)'
      })
    }else{
      gsap.to(driverRef.current,{
        transform:'translateY(100%)'
      })
    }   

  },[driverPanel])

    useGSAP(function(){
    if(waitingForDriverPanel)
    {
      gsap.to(waitingForDriverRef.current,{
      transform:'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(100%)'
      })
    }   

  },[waitingForDriverPanel])


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
              <LocationPanel panelOpen={panelOpen} setPanelopen={setPanelopen} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} setDriverPanel={setDriverPanel} />
      </div>

      <div ref={confirmationRideref} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
        <ConfirmedVehicle setConfirmRidePanel={setConfirmRidePanel} setDriverPanel={setDriverPanel}/>
      </div>

      <div ref={driverRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
        <LookingForDriver setDriverPanel={setDriverPanel} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
        <WaitingForDriver waitingForDriverPanel={waitingForDriverPanel}/>
      </div>
    </div>

  )
}

export default Home
