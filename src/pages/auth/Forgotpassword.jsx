// src/pages/ForgotPassword.jsx
// Step 1: Student enters their email → backend sends a 6-digit reset OTP.

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../api/UserApi";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required."); return; }
    setLoading(true);
    setError("");
    try {
      await forgotPassword({ email: email.trim() });
      // Navigate to reset page passing the email
      navigate("/reset-password", { state: { email: email.trim() } });
    } catch (err) {
      setError(err.message || "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f3fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <path d="M8 12C8 10.3 9.3 9 11 9H24V39H11C9.3 39 8 37.7 8 36V12Z" fill="#1a2a5e"/>
            <path d="M40 12C40 10.3 38.7 9 37 9H24V39H37C38.7 39 40 37.7 40 36V12Z" fill="#1a2a5e" opacity="0.7"/>
          </svg>
          <span className="text-xl font-extrabold text-[#1a2a5e]">StudyFlow</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8">
          <h1 className="text-2xl font-extrabold text-[#1a2a5e] mb-2">Forgot your password?</h1>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Enter your email address and we will send you a 6-digit code to reset your password.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1a2a5e]/50 transition"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#1a2a5e] hover:bg-[#14234d] text-white font-bold text-sm transition active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/auth/login" className="text-xs text-gray-400 hover:text-gray-600 transition">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;