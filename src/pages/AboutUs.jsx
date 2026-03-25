import React from 'react'

import { NavLink } from "react-router-dom";
import bg from "../assets/bgimage.jpeg"
const About = () => {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero Banner ── */}
    
<section style={{
  backgroundImage: `url(${bg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  maxWidth: '100vw',
  height: '70vh'
}} className="relative w-full h-[340px] flex items-center justify-center overflow-hidden">
  {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1a2a5e]/65" /> 
        {/* Text */}
         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4 leading-snug">
            Find the Right Study Resources Faster
          </h1>
          <p className="text-sm md:text-sm text-blue-100 ">
            StudyFlow is building a smarter way for students to find, share, and use study resources. Our goal is simple:
            make learning materials easy to access, organized, and actually useful when it matters most.
          </p>
        </div>
</section>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 text-center">
 
          {/* Our Vision */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1a2a5e]">Our Vision</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[300px] text-center">
              To build the most reliable platform for student-driven learning resources.
            </p>
          </div>
 
          {/* Our Mission */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1a2a5e]">Our Mission</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[350px] text-center">
              To use technology to eliminate the stress of finding academic resources by making them fast, organized, and accessible.
            </p>
          </div>
 
          {/* Our Values */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1a2a5e]">Our Values</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[350px] text-center">
              Innovation, integrity, and inclusivity guide everything we do as we work to transform learning seamlessly.
            </p>
          </div>
 
        </div>
      </section>
 

      {/* ── Why The Name StudyFlow ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24 ">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Left — stacked screenshots mockup */}
          <div className="w-full md:w-[44%] flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              {/* Top green banner card */}
              <div className="bg-[#1a6b3c] text-white px-6 py-5">
                <p className="text-lg font-bold leading-snug">
                  For Every Student,<br />
                  Every <span className="text-orange-400">Classroom.</span>
                </p>
                <p className="text-xs text-green-200 mt-2 leading-relaxed">
                  Dramatically supply transparent deliverables before backward-comp
                  internal or "organic" sources. Competently leverage other.
                </p>
                <button className="mt-3 px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-md">
                  Explore Course
                </button>
              </div>
              {/* Bottom white card */}
              <div className="bg-white px-6 py-5 border-t border-gray-100">
                <p className="text-center text-sm font-semibold text-[#1a2a5e] mb-4">
                  What We Offer
                </p>
                <p className="text-center text-xs text-gray-500 mb-4 font-medium">
                  For Your Future Learning.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {["Online Courses", "Expert Trainer", "Get Certificate", "Life Time Access"].map((item) => (
                    <div key={item} className="flex flex-col items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a6b3c" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      <p className="text-[9px] text-gray-500 text-center leading-tight">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bottom image strip */}
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=70"
                alt="books"
                className="w-full h-16 object-cover"
              />
            </div>
          </div>

          {/* Right — text */}
          <div className="w-full md:w-[56%]">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
              Why The Name{" "}
              <span className="text-[#1a2a5e]">StudyFlow</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              In life, the best moments happen when things just flow — when there's no friction, no confusion,
              just clarity and progress. StudyFlow brings that same feeling to learning, helping students move
              from searching to studying without the usual stress, so learning feels natural and continuous.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
export default About