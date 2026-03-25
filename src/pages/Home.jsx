import React from 'react'
import heroImage from '../assets/heroImage.png'

const Home = () => {
  return (
    <div>
      <section className="bg-gray-50 py-4 sm:py-8 lg:py-6">
      <div className="max-w-6xl mx-auto px-5 lg:px-12">
        
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* LEFT */}
          <div className="flex-1 text-center lg:text-left">
            
            <p className="text-blue-600 font-medium text-md tracking-wide mb-2">
              SMART STUDY PLATFORM
            </p>

            <h1 className="
              font-semibold text-[#1a2a5e] 
              text-2xl sm:text-3xl md:text-4xl lg:text-[40px]
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

            <button className="
              mt-5
              bg-[#1a2a5e] text-white 
              px-5 py-2.5 text-sm cursor-pointer
              rounded-md hover:bg-blue-800 transition
            ">
              Get Started
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex justify-center ">
            <img
              src={heroImage}
              alt="StudyFlow Preview"
              className="w-64  sm:w-72 md:w-80 lg:w-[400px]  object-cover"
            />
          </div>

        </div>
      </div>
    </section>
          {/* How it Works Section */}
      <section className="bg-gray-50 py-24 px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1a2b4b] mb-4">How StudyFlow Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Follow these simple steps to find, save, and manage your study resources with ease.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Search Resources', desc: 'Discover tutorials, notes and past questions tailored to your needs.', icon: '🔍' },
            { step: '02', title: 'Save & Organize', desc: 'Keep important study material saved neatly in one place.', icon: '📁' },
            { step: '03', title: 'Track Progress', desc: 'Monitor your learning progress and stay motivated.', icon: '📈' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative pt-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a2b4b] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div className="text-4xl mb-6 flex justify-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1a2b4b] mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="bg-[#1a2b4b] text-white px-8 py-3 rounded-md font-semibold hover:hover:bg-blue-800 transition cursor-pointer">
            Get Started
          </button>
        </div>
      </section>
      {/* Why Choose StudyFlow Section */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Why Choose StudyFlow
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Experience a smarter way to organize, learn, and grow with tools built 
        specifically for academic excellence.
      </p>
    </div>

    <div className="space-y-20">

      {/* 01 Stay Organized */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">01</span>
            <h3 className="text-3xl font-semibold text-gray-900">Stay Organized</h3>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Keep all your study materials in one intuitive place. 
            No more scattered files across internet or platforms.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Centralized resource library
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Smart Categorization and tagging
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Instant access to everything you need
            </li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-80 h-80 bg-blue-50 rounded-3xl flex items-center justify-center">
            {/* Replace with your actual image later */}
            <div className="text-8xl">📁💡</div>
          </div>
        </div>
      </div>

      {/* 02 Save Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="lg:order-2">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">02</span>
            <h3 className="text-3xl font-semibold text-gray-900">Save Time</h3>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Spend less time searching and more time learning. 
            Find exactly what you need in seconds, not minutes.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Advanced search and filtering
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Quick access to recent materials
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Personalized recommendations
            </li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-start">
          <div className="w-80 h-80 bg-amber-50 rounded-3xl flex items-center justify-center">
            <div className="text-8xl">⏱️⚡</div>
          </div>
        </div>
      </div>

      {/* 03 Study Smarter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">03</span>
            <h3 className="text-3xl font-semibold text-gray-900">Study Smarter</h3>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Eliminate distraction and focus on what truly matters. 
            Our platform helps you concentrate on learning, not logistics.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Distraction-free study environment
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Focused learning paths
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Evidence-based study techniques
            </li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-80 h-80 bg-purple-50 rounded-3xl flex items-center justify-center">
            <div className="text-8xl">🧠🎓</div>
          </div>
        </div>
      </div>

      {/* 04 Track Your Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="lg:order-2">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">04</span>
            <h3 className="text-3xl font-semibold text-gray-900">Track Your Progress</h3>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            See your growth in real-time. Monitor your learning journey 
            and stay motivated with actionable insights.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Detailed progress analytics
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Personalized achievement milestones
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-emerald-500 mt-1">•</span>
              Motivation through visual feedback
            </li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-start">
          <div className="w-80 h-80 bg-emerald-50 rounded-3xl flex items-center justify-center">
            <div className="text-8xl">📊🚀</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
    </div>
  )
}

export default Home

