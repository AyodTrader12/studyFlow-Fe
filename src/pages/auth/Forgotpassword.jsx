import { useState } from "react"
import { auth } from "../../Firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import logo from "../../assets/studylogo.png"
import { Link } from "react-router-dom"
const Forgotpassword = () => {
    const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return; }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      const msg =
        err.code === "auth/user-not-found"
          ? "No account found with this email."
          : err.code === "auth/too-many-requests"
          ? "Too many requests. Please wait a moment and try again."
          : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4">
      {/* Logo */}
    <div className="flex flex-col items-center mb-10 w-full h-10 pt-2">
           <img src={logo} alt="Logo" className="w-60 h-15" />
         
         </div>
      {!sent ? (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#1a2a5e] mb-4">Forgot Password?</h1>
            <p className="text-gray-500 mt-1 text-sm max-w-xs mx-auto">
              No worries — enter your email and we'll send you a reset link.
            </p>
          </div>
 
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg px-8 py-8">
            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#eef1f9] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a2a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
            </div>
 
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}
 
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/30 ${
                    error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white focus:border-[#1a2a5e]"
                  }`}
                />
              </div>
 
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-[#1a2a5e] text-white font-bold text-base tracking-wide transition  hover:bg-gray-900  active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending reset link...
                  </span>
                ) : "Send Reset Link"}
              </button>
            </form>
 
            <Link to="/auth/login"
             
              className="mt-5 w-full flex items-center justify-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back to Login
            </Link>
          </div>
        </>
      ) : (
        /* ── Sent confirmation state ── */
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#1a2a5e]">Check Your Email</h1>
            <p className="text-gray-500 mt-1 text-sm">We've sent the reset link</p>
          </div>
 
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg px-8 py-10 flex flex-col items-center text-center">
            {/* Animated checkmark */}
            <div className="w-20 h-20 rounded-full bg-[#eef1f9] flex items-center justify-center mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="#1a2a5e" strokeWidth="1.8" fill="none"/>
                <path d="M2 7l10 7 10-7" stroke="#1a2a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
 
            <p className="text-gray-500 text-sm mb-2">We sent a password reset link to</p>
            <p className="text-[#1a2a5e] font-semibold text-sm bg-[#eef1f9] px-4 py-2 rounded-xl mb-5">
              {email}
            </p>
 
            <p className="text-gray-400 text-xs leading-relaxed mb-8 max-w-xs">
              Click the link in the email to reset your password. The link expires in <span className="font-semibold text-gray-500">1 hour</span>. Check your spam folder if you don't see it.
            </p>
 
            <Link to="/auth/login" className="w-full py-4 rounded-2xl bg-[#1a2a5e] text-white font-bold text-base tracking-wide transition hover:bg-[#14234d] active:scale-[0.98]">
              Back to Login
            </Link>
 
            <p className="text-sm text-gray-500 mt-5">
              Didn't receive it?{" "}
              <button
                onClick={() => { setSent(false); }}
                className="text-[#1a2a5e] font-medium hover:underline"
              >
                Try again
              </button>
            </p>
             
     
          </div>
        </>
        
      )}
 
      
    </div>
  )
}

export default Forgotpassword
