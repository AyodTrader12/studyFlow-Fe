import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/studylogo.png"
const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          padding-bottom: 4px;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #1a2a5e;
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover {
          color: #1a2a5e;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link.active {
          color: #1a2a5e;
          font-weight: 600;
        }
        .nav-link.active::after {
          width: 100%;
        }

        /* Mobile nav links */
        .mobile-nav-link {
          position: relative;
          font-size: 1rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          padding: 10px 0;
          display: block;
          border-bottom: 1px solid #f3f4f6;
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #1a2a5e;
          padding-left: 8px;
        }
        .mobile-nav-link.active {
          font-weight: 700;
        }

        /* Slide down animation for mobile menu */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu {
          animation: slideDown 0.22s ease forwards;
        }
      `}</style>

      <header className="w-full bg-white border-b border-gray-100 fixed top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-16 lg:px-12 flex items-center justify-between">

          {/* ── Logo ── */}
          <NavLink to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
            {/* Book SVG matching the StudyFlow brand */}
            <div className="relative">
              <img src={logo} alt="StudyFlow Logo" className="w-35 h-10 "/> 
            </div>
          
          </NavLink>

          {/* ── Desktop Nav + CTA in one div ── */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-12">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <NavLink
              to="/auth"
              className="inline-block px-5 py-2.5 rounded-lg bg-[#1a2a5e] text-white text-sm font-bold tracking-wide transition hover:bg-[#14234d] active:scale-[0.97] no-underline"
            >
              Get Started
            </NavLink>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="block h-[2px] bg-[#1a2a5e] rounded-full transition-all duration-300 origin-center"
              style={{
                width: menuOpen ? "20px" : "20px",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[2px] bg-[#1a2a5e] rounded-full transition-all duration-300"
              style={{
                width: "14px",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block h-[2px] bg-[#1a2a5e] rounded-full transition-all duration-300 origin-center"
              style={{
                width: menuOpen ? "20px" : "20px",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div className="mobile-menu md:hidden bg-white border-t border-gray-100 px-5 pt-2 pb-5">
            <nav className="flex flex-col items-center">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) => `mobile-nav-link${isActive ? " active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <NavLink
              to="/auth"
              className="mt-4 block text-center px-5 py-3 rounded-lg bg-[#1a2a5e] text-white text-sm font-bold tracking-wide transition hover:bg-[#14234d] no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
}