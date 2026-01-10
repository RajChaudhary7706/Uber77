import React, { useState } from 'react'
import ConfirmedVehicle from './confirmedVehicle'

import { Link } from 'react-router-dom'

const VehiclePanel = (props) => {
      const [selectedVehicle, setSelectedVehicle] = useState(null)
    
  return (
    <div>
              <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
          props.setVehiclePanel(false)
        }}><i className='text-xl ri-arrow-down-wide-line'/></h5>
        <h3 className='text-2xl font-semibold mb-2'>Choose a Vehicle</h3>

<div 

  onClick={() =>{setSelectedVehicle("go");
    props.setConfirmRidePanel(true);
  }}
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
    onClick={() =>{setSelectedVehicle("Moto");
    props.setConfirmRidePanel(true);
  }}
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
    onClick={() =>{setSelectedVehicle("UberAuto");
    props.setConfirmRidePanel(true);
  }}
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
  )
}

export default VehiclePanel
