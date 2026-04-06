import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, resendVerificationEmail, isEmailVerified } from "../../Firebase"
import { confirmEmailVerified } from "../../api/UserApi"
const Verify = () => {
  const navigate = useNavigate()
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [notVerifiedMsg, setNotVerifiedMsg] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      setDisplayName(user.displayName || "User")
      setDisplayEmail(user.email || "")
    }
  }, [])
 
  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail();
      setResent(true);
      setTimeout(() => setResent(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setResending(false);
    }
  };
 
  const handleContinue = async () => {
    setChecking(true);
    setNotVerifiedMsg("");
    try {
      const verified = await isEmailVerified();
      if (verified) {
        await confirmEmailVerified();

        navigate("/auth/login");
      } else {
        setNotVerifiedMsg("Your email isn't verified yet. Please check your inbox and click the link first.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setChecking(false);
    }
  };
  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-10 py-10 flex flex-col items-center text-center">
 
        {/* Green checkmark circle */}
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.15"/>
            <path
              d="M6 12.5l4 4 8-8"
              stroke="#16a34a"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
 
        {/* Title */}
        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Account Created Successfully!
        </h1>
 
        {/* Welcome + email message */}
        <p className="text-gray-500 text-sm mb-1">
          Welcome, <span className="font-bold text-gray-800">{displayName}!</span>
        </p>
        <p className="text-gray-500 text-sm mb-1">We've sent a verification email to</p>
        <p className="font-bold text-gray-800 text-sm mb-6">{displayEmail}</p>
 
        {/* Not verified warning */}
        {notVerifiedMsg && (
          <div className="w-full mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-xs text-center">
            {notVerifiedMsg}
          </div>
        )}
 
        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={checking}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1a2a5e] hover:bg-gray-900 active:scale-[0.98] text-white font-bold text-base transition disabled:opacity-60 disabled:cursor-not-allowed mb-3 cursor-pointer"
        >
          {checking ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Checking...
            </>
          ) : (
            <>
              Login to Continue 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
 
        {/* Hint */}
        <p className="text-gray-400 text-xs mb-4">
          Please check your email to verify your account
        </p>
 
        {/* Resend */}
        {resent ? (
          <p className="text-[#1a2a5e] text-xs font-medium">✓ Verification email resent!</p>
        ) : (
          <p className="text-xs text-gray-400">
            Didn't get the email?{" "}
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-[#1a2a5e] font-semibold hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend"}
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Verify
