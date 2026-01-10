import React from 'react'

const LocationPanel = (props) => {
  
  console.log(props)
  const locations = [
    "24B, Near Kanpoor's, Sher Coding Classes, Bhopal",
    "23C, Near Malhotra's, Sher Coding Classes, Bhopal",
    "25H, Near Nagpura's, Sher Coding Classes, Bhopal",
    "29P, Near NayaRaipur's, Sher Coding Classes, Bhopal",
  ]
  return (
    <div>
      {
        locations.map(function(elem,idx){
          return <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelopen(false)
          }} className='flex gap-4 border-2 border-white active:border-black rounded-xl items-center my-3 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill" /></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }


{/* not in use these are examples */}
      {/* <div className='flex gap-4 border-2 border-white active:border-black rounded-xl items-center my-3 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill" /></h2>
        <h4 className='font-medium'>24B, Near Kanpoor's, Sher Coding Classes, Bhopal</h4>
      </div> */}
      {/* <div className='flex gap-4 border-2 border-white active:border-black rounded-xl items-center my-3 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill" /></h2>
        <h4 className='font-medium'>24B, Near Kanpoor's, Sher Coding Classes, Bhopal</h4>
      </div>

      <div className='flex gap-4 border-white active:border-black border-2 rounded-xl items-center my-3 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill" /></h2>
        <h4 className='font-medium'>24B, Near Kanpoor's, Sher Coding Classes, Bhopal</h4>
      </div>

      <div className='flex gap-4 border-white active:border-black border-2 rounded-xl items-center my-3 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill" /></h2>
        <h4 className='font-medium'>24B, Near Kanpoor's, Sher Coding Classes, Bhopal</h4>
      </div>
      
      <div className='flex gap-4 border-white active:border-black border-2 rounded-xl items-center my-3 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill" /></h2>
        <h4 className='font-medium'>24B, Near Kanpoor's, Sher Coding Classes, Bhopal</h4>
      </div> */}

    </div>
  )
}

export default LocationPanel
