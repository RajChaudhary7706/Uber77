import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://tse3.mm.bing.net/th/id/OIP.meqWmj1MlP1QY-jidG3WFwHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
            <img className='w-16 ml-8' src='https://logospng.org/download/uber/logo-uber-4096.png'/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
                <Link to='/login' className='flex items-center justify-center  w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start

