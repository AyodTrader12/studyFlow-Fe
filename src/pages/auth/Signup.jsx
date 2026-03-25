import { useState } from "react"
import { signUp,signInWithGoogle } from "../../Firebase"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/studylogo.png"
const Signup = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const navigate = useNavigate()
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      const user = await signUp(form.name, form.email, form.password);
      navigate("/auth/verify", { state: { name: user.displayName, email: user.email } });
    } catch (error) {
      const msg =
        error.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : error.code === "auth/weak-password"
          ? "Password is too weak. Use at least 6 characters."
          : "Something went wrong. Please try again.";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };
 
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      // Google accounts are pre-verified — go straight to dashboard (or onboarding)
      navigate("/dashboard", { state: { name: user.displayName, email: user.email } });
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        setErrors({ general: "Google sign-up failed. Please try again." });
      }
    } finally {
      setGoogleLoading(false);
    }
  };
 
  return (
   <div className="min-h-screen bg-white flex flex-col items-center justify-start    px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 w-full h-30">
        <img src={logo} alt="Logo" className="w-80 h-70 " />
      
      </div>
 
      <div className="text-center mb-6">
        
        <p className="text-[#1a2a5e] mt-1 text-md">Create an account to Get Started</p>
      </div>
 
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg px-8 py-8 mb-3">
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
            {errors.general}
          </div>
        )}
 
     
      
  <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name */}
          <div>
            <input
              type="text" name="name" placeholder="Enter Name"
              value={form.name} onChange={handleChange}
              className={`w-full px-4 py-3 rounded-2xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/30 ${
                errors.name ? "border-red-400 bg-red-50" : "border-gray-300 bg-white focus:border-[#1a2a5e]"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>}
          </div>
 
          {/* Email */}
          <div>
            <input
              type="email" name="email" placeholder="Enter Email"
              value={form.email} onChange={handleChange}
              className={`w-full px-4 py-3 rounded-2xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/30 ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-white focus:border-[#1a2a5e]"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
          </div>
 
          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password" placeholder="Create Password"
                value={form.password} onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-2xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/30 ${
                  errors.password ? "border-red-400 bg-red-50" : "border-gray-300 bg-white focus:border-[#1a2a5e]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a2a5e] transition"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
          </div>
 
          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword" placeholder="Confirm Password"
                value={form.confirmPassword} onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-2xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/30 ${
                  errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-300 bg-white focus:border-[#1a2a5e]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a2a5e] transition"
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-2">{errors.confirmPassword}</p>}
          </div>
 
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3 mt-1 rounded-2xl bg-[#1a2a5e] text-white font-bold text-base tracking-wide transition  hover:bg-gray-900  active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating account...
              </span>
            ) : "Sign Up"}
          </button>
        </form>
 
 
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#1a2a5e] font-medium hover:underline">
            Login
          </Link>
        </p>
          {/* Divider */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-semibold text-[#1a2a5e] tracking-widest">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
           {/* Google Button — placed ABOVE form for prominence */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-black text-white font-semibold text-sm transition hover:bg-gray-900 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-4 cursor-pointer"
        >
          {googleLoading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {googleLoading ? "Connecting to Google..." : "Sign Up with Google"}
        </button>
 
      </div>
   <p className="text-xs text-gray-400 mt-2 pb-3 text-center">© {new Date().getFullYear()} StudyFlow. All rights reserved.</p>
     
 
    </div>
  )
}

export default Signup
