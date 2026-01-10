import React from 'react'
import Home from '../pages/Home'

const WaitingForDriver = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
          props.WaitingForDriver(false)
        }}><i className='text-xl ri-arrow-down-wide-line'/></h5>

        <div className='flex items-center justify-between'>
          <img className='h-12' src='https://tse2.mm.bing.net/th/id/OIP.3yBdcvCnuV9dkWXOQS_akwHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3'/>
          <div className='text-right'>
            <h2 className='text-lg font-medium'>Shourya</h2>
            <h4 className='text-lg font-semibold -mt-1 -mb-1'>MP04 SH 1213</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki alto</p>
          </div> 
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-3 p-3 border-b-2'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm-mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm-mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>
                <div className='flex items-center gap-3 p-3'>
                    <i className="ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>$5.44</h3>
                        <p className='text-sm-mt-1 text-gray-600'>Cash Cash</p>  
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WaitingForDriver
