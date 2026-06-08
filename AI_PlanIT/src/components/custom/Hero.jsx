import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[52px] text-center mt-16'>
        
        <span className='text-[#f56551]'>Plan It: Plan your next trip with AI!</span> Your personalized travel guide, making every trip unforgettable!</h1>
        
        <p className='text-xl text-gray-500 text-center'>Our AI-powered travel curator crafts personalized itineraries that perfectly match your interests and budget</p>
        
        <Link to={'./create-trip'}>
          <Button>Get Started, It's Free</Button>
        </Link>
        
    </div>
  )
}

export default Hero
