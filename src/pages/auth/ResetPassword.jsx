import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { auth } from "../../Firebase";
import { confirmPasswordReset,verifyPasswordResetCode } from "firebase/auth";
import logo from "../../assets/studylogo.png"
const ResetPassword = () => {
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [oobCode, setOobCode] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [success, setSuccess] = useState(false);
 
  // On mount — extract the oobCode from the URL and verify it's still valid
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    const mode = params.get("mode");
 
    if (!code || mode !== "resetPassword") {
      setCodeError("Invalid or missing reset link. Please request a new one.");
      setVerifying(false);
      return;
    }
 
    verifyPasswordResetCode(auth, code)
      .then(() => {
        setOobCode(code);
        setVerifying(false);
      })
      .catch(() => {
        setCodeError("This reset link has expired or already been used. Please request a new one.");
        setVerifying(false);
      });
  }, []);
 
  const validate = () => {
    const e = {};
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err) {
      setErrors({ general: "Failed to reset password. The link may have expired. Please request a new one." });
    } finally {
      setLoading(false);
    }
  };
 
  const EyeIcon = ({ visible }) => visible ? (
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
  );
  return (
     <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-10 px-4">
      {/* Logo */}
     <div className="flex flex-col items-center mb-6 w-full h-30">
                <img src={logo} alt="Logo" className="w-80 h-70 " />
              
              </div>
 
      {/* Loading — verifying the code */}
      {verifying && (
        <div className="flex flex-col items-center mt-20 gap-4">
          <svg className="animate-spin h-8 w-8 text-[#1a2a5e]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-gray-500 text-sm">Verifying your reset link...</p>
        </div>
      )}
 
      {/* Invalid / expired code */}
      {!verifying && codeError && (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#1a2a5e]">Link Expired</h1>
            <p className="text-gray-500 mt-1 text-sm">This reset link is no longer valid</p>
          </div>
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg px-8 py-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e24b4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">{codeError}</p>
            <button
              onClick={() => onNavigate?.("forgot-password")}
              className="w-full py-4 rounded-2xl bg-[#1a2a5e] text-white font-bold text-base tracking-wide transition hover:bg-[#14234d] active:scale-[0.98]"
            >
              Request New Reset Link
            </button>
          </div>
        </>
      )}
 
      {/* Reset form */}
      {!verifying && !codeError && !success && (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#1a2a5e]">Reset Password</h1>
            <p className="text-gray-500 mt-1 text-sm">Create a new password for your account</p>
          </div>
 
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg px-8 py-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#eef1f9] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a2a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
            </div>
 
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {errors.general}
              </div>
            )}
 
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* New Password */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                    className={`w-full px-5 py-4 pr-12 rounded-2xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/30 ${
                      errors.password ? "border-red-400 bg-red-50" : "border-gray-300 bg-white focus:border-[#1a2a5e]"
                    }`}
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a2a5e] transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
              </div>
 
              {/* Confirm New Password */}
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: "" })); }}
                    className={`w-full px-5 py-4 pr-12 rounded-2xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/30 ${
                      errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-300 bg-white focus:border-[#1a2a5e]"
                    }`}
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a2a5e] transition"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                    <EyeIcon visible={showConfirmPassword} />
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-2">{errors.confirmPassword}</p>}
              </div>
 
              {/* Password strength hint */}
              <p className="text-xs text-gray-400 -mt-1 ml-1">Use at least 6 characters with a mix of letters and numbers.</p>
 
              <button
                type="submit" disabled={loading}
                className="w-full py-4 mt-1 rounded-2xl bg-[#1a2a5e] text-white font-bold text-base tracking-wide transition hover:bg-[#14234d] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Resetting password...
                  </span>
                ) : "Reset Password"}
              </button>
            </form>
          </div>
        </>
      )}
 
      {/* Success state */}
      {!verifying && success && (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-[#1a2a5e]">Password Reset!</h1>
            <p className="text-gray-500 mt-1 text-sm">Your password has been updated</p>
          </div>
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg px-8 py-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#eef1f9] flex items-center justify-center mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a2a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <button
              onClick={() => onNavigate?.("login")}
              className="w-full py-4 rounded-2xl bg-[#1a2a5e] text-white font-bold text-base tracking-wide transition hover:bg-[#14234d] active:scale-[0.98]"
            >
              Go to Login
            </button>
          </div>
        </>
      )}
 
  
    </div>
  )
}

export default ResetPassword
