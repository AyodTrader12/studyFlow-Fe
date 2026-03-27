import { NavLink } from "react-router-dom";
import logo from "../assets/footerLogo.png"
const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a2a5e] text-white ">
      <div className="max-w-6xl  mx-auto px-5 justify-center py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

        {/* ── Brand col ── */}
        <div className="flex flex-col items-center gap-4 text-center justify-start max-w-[300px]">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 no-underline ">
         <img src={logo} alt="StudyFlow Logo" className="w-35 h-10" />
          </NavLink>
          <p className="text-sm text-blue-200 leading-relaxed max-w-[250px]">
            Your smart companion for finding study resources in seconds.
          </p>
        </div>

        {/* ── Quick Links col ── */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 tracking-wide">Quick Links</h3>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className="text-sm text-blue-200 hover:text-white transition no-underline"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Legal col ── */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 tracking-wide">Legal</h3>
          <ul className="flex flex-col gap-2.5">
            {legalLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="text-sm text-blue-200 hover:text-white transition no-underline"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Follow Us col ── */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 tracking-wide">Follow Us</h3>
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-md border border-blue-400/40 flex items-center justify-center hover:bg-white/10 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-md border border-blue-400/40 flex items-center justify-center hover:bg-white/10 transition">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-md border border-blue-400/40 flex items-center justify-center hover:bg-white/10 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="white" stroke="none"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-md border border-blue-400/40 flex items-center justify-center hover:bg-white/10 transition">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-blue-400/20">
        <div className="max-w-6xl mx-auto px-6 py-4 text-center text-xs text-blue-300">
          © {new Date().getFullYear()} StudyFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}