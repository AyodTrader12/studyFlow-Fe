import React from 'react'
import heroImage from "../../assets/heroImage.png"
import { NavLink } from 'react-router-dom'
const Subjects = () => {
  return (
    <div>
      <section className="bg-gray-50 py-4 sm:py-5 lg:py-5">
      <div className="max-w-6xl mx-auto px-5 ">
        
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* LEFT */}
          <div className="flex-1 text-center lg:text-left">
            
            <p className="text-blue-600 font-medium text-md tracking-wide mb-2">
              SMART STUDY PLATFORM
            </p>

            <h1 className="
              font-semibold text-[#1a2a5e] 
              text-2xl sm:text-3xl md:text-4xl lg:text-[35px]
              leading-[1.15] 
              max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[650px]
              mx-auto lg:mx-0
            ">
              Find, Organize and Master Your Study Resources in One Place.
            </h1>

            <p className="
              text-gray-600 mt-3
              text-sm sm:text-base
              max-w-md mx-auto lg:mx-0
              leading-relaxed
            ">
              Discover tutorials, notes, and past questions, save what matters,
              and keep all your learning materials neatly organized for easy access.
            </p>

            <NavLink
            to="/signup" 
            className="
             inline-block mt-6
             bg-[#1a2a5e] text-white 
             px-8 py-2.5 text-sm cursor-pointer
             rounded-md hover:bg-blue-800 transition
            ">
              Get Started
            </NavLink>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex justify-center ">
            <img
              src={heroImage}
              alt="StudyFlow Preview"
              className="w-74  sm:w-82 md:w-90 lg:w-[470px]  object-contain"
            />
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Subjects
