import React from 'react'
import { NavLink } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    title: "Smart Resource Search",
    desc: "Find textbooks, past questions, study notes and more in seconds. Our intelligent search filters results by subject, class level, and resource type.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    title: "Organised Study Library",
    desc: "All your resources in one place — neatly categorised by subject and level so you spend less time searching and more time learning.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "Student Community",
    desc: "Connect with fellow students, share resources, ask questions, and collaborate on study material with peers from your school or across Nigeria.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Progress Tracking",
    desc: "Monitor your study activity, track the resources you've accessed, and stay on top of your learning goals with your personal dashboard.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: "Subject Coverage",
    desc: "From Mathematics and English to Biology, Commerce and beyond — we cover all core secondary school subjects for JSS and SS levels.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: "Expert Q&A Support",
    desc: "Stuck on a topic? Post your question and get clear, helpful answers from tutors and senior students in the StudyFlow community.",
  },
];

const steps = [
  { step: "01", title: "Create Your Account", desc: "Sign up in seconds with your email or Google account — it's completely free." },
  { step: "02", title: "Choose Your Subjects", desc: "Select your class level and the subjects you're studying to personalise your feed." },
  { step: "03", title: "Find & Save Resources", desc: "Search, browse, and bookmark the materials you need for exams and assignments." },
  { step: "04", title: "Study & Excel", desc: "Use your saved resources anytime, track your progress, and ace your exams." },
];

const Features = () => {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#1a2a5e] py-20 px-6 text-center">
        <p className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-3">What We Offer</p>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight max-w-2xl mx-auto">
          Everything You Need to Study Smarter
        </h1>
        <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
          StudyFlow gives secondary school students the tools, resources, and community to make learning faster, easier, and more enjoyable.
        </p>
        <NavLink
          to="/signup"
          className="inline-block px-7 py-3.5 rounded-lg bg-white text-[#1a2a5e] font-bold text-sm tracking-wide transition hover:bg-blue-50 active:scale-[0.97] no-underline"
        >
          Get Started 
        </NavLink>
      </section>

      {/* ── Features Grid ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2a5e] mb-3">Packed With Powerful Features</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            Built specifically for  secondary school students — every feature solves a real problem you face daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <h3 className="text-base font-bold text-[#1a2a5e]">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-[#f5f7fc] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2a5e] mb-3">How It Works</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Getting started takes less than two minutes. Here's how StudyFlow works.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center gap-3">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-blue-200 z-0" />
                )}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#1a2a5e] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{step}</span>
                </div>
                <h3 className="text-sm font-bold text-[#1a2a5e]">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[180px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-[#1a2a5e] rounded-3xl px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
            Ready to Transform How You Study?
          </h2>
          <p className="text-blue-200 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Join thousands of secondary school students already using StudyFlow to study smarter and score higher.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink
              to="/auth"
              className="inline-block px-7 py-3.5 rounded-lg bg-white text-[#1a2a5e] font-bold text-sm tracking-wide transition hover:bg-blue-50 active:scale-[0.97] no-underline"
            >
              Create Free Account
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-block px-7 py-3.5 rounded-lg border border-white/40 text-white font-semibold text-sm tracking-wide transition hover:bg-white/10 active:scale-[0.97] no-underline"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Features