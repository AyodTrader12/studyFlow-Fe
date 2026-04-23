import React from 'react'
import { NavLink } from "react-router-dom";
import bg from "../assets/bgimage.jpeg"

const About = () => {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero Banner — Text Left, Image Right ── */}
      <section className="relative w-full flex flex-col md:flex-row" style={{ minHeight: '90vh' }}>

        {/* Left — Navy text panel */}
        <div className="w-full md:w-1/2 bg-[#1a2a5e] flex items-center px-10 md:px-16 py-20">
          <div>
            <span className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-3">
              About StudyFlow
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Find the Right
              Study Resources Faster.
            </h1>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-sm">
              StudyFlow is building a smarter way for students to find, share, and use study resources. Our goal is simple: make learning materials easy to access, organized, and actually useful when it matters most.
            </p>
          </div>
        </div>

        {/* Right — Background image */}
        <div className="w-full md:w-1/2 relative" style={{ minHeight: '340px' }}>
          <img
            src={bg}
            alt="StudyFlow"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Left-edge fade to blend with navy panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2a5e]/50 to-transparent" />
        </div>

      </section>


      {/* ── Vision / Mission / Values — Unchanged ── */}
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


      {/* ── Why The Name StudyFlow — Redesigned ── */}
      <section className="py-14 bg-[#f8f9ff]">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-5 text-gray-900 leading-tight">
              Why The Name{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#1a2a5e]">StudyFlow</span>
                <span
                  className="absolute left-0 w-full bg-blue-200/60 rounded"
                  style={{ bottom: '4px', height: '10px', zIndex: 0 }}
                />
              </span>
              ?
            </h2>
          </div>

          {/* Main card */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Left — Navy visual panel */}
              <div className="bg-[#1a2a5e] p-10 flex flex-col justify-between gap-8">

                <blockquote className="text-2xl font-bold text-white leading-snug border-l-4 border-blue-400 pl-5">
                  "The best moments happen when things just{' '}
                  <span className="text-blue-300 italic">flow.</span>"
                </blockquote>

                {/* Feature pills */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '📚', label: 'Organized Resources' },
                    { icon: '⚡', label: 'Fast Access' },
                    { icon: '🎯', label: 'Exam Ready' },
                    { icon: '🔓', label: 'Always Free' },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3"
                    >
                      <span style={{ fontSize: '16px' }}>{f.icon}</span>
                      <span className="text-xs font-semibold text-blue-100">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* Books image */}
                <div className="rounded-2xl overflow-hidden h-28">
                  <img
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=70"
                    alt="Study books"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
              </div>

              {/* Right — Text */}
              <div className="p-10 flex flex-col justify-center gap-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  In life, the best moments happen when things just flow when there's no friction, no confusion, just clarity and progress.
                </p>
                <p className="text-gray-500 text-base leading-relaxed">
                  StudyFlow brings that same feeling to learning, helping students move from{' '}
                  <span className="font-semibold text-[#1a2a5e]">searching</span> to{' '}
                  <span className="font-semibold text-[#1a2a5e]">studying</span> without the usual stress, so learning feels natural and continuous.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-gray-100">
                  {[
                    { value: '10K+', label: 'Students' },
                    { value: '500+', label: 'Resources' },
                    { value: '98%', label: 'Satisfaction' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-2xl font-black text-[#1a2a5e]">{s.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

export default About;
