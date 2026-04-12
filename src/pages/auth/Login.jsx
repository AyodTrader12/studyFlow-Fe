// src/pages/Login.jsx
// Calls POST /api/auth/login directly. No Firebase.
// On success the backend sets an httpOnly cookie and returns the user profile.

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../../api/UserApi";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { refreshUser } = useAuth();

  // Where to go after login (if coming from a protected route)
  const from = location.state?.from?.pathname || "/dashboard";

  // Show a "verified" banner if coming from VerifyOtp
  const justVerified = location.state?.verified === true;

  const [form,    setForm]    = useState({ email: "", password: "" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim())    errs.email    = "Email is required";
    if (!form.password)        errs.password = "Password is required";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      // Refresh AuthContext so the user is available immediately
      await refreshUser();
      navigate(from, { replace: true });
    } catch (err) {
      if (err.status === 403 && err.data?.needsVerify) {
        // Account not verified — send to OTP page
        navigate("/verify", { state: { email: form.email.trim() } });
        return;
      }
      const msg =
        err.status === 401
          ? "Invalid email or password."
          : err.message || "Login failed. Please try again.";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
      errors[field]
        ? "border-red-300 bg-red-50 text-red-700 placeholder-red-300"
        : "border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:border-[#1a2a5e]/50"
    }`;

  return (
    <div className="min-h-screen bg-[#f0f3fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <path d="M8 12C8 10.3 9.3 9 11 9H24V39H11C9.3 39 8 37.7 8 36V12Z" fill="#1a2a5e"/>
            <path d="M40 12C40 10.3 38.7 9 37 9H24V39H37C38.7 39 40 37.7 40 36V12Z" fill="#1a2a5e" opacity="0.7"/>
          </svg>
          <span className="text-xl font-extrabold text-[#1a2a5e]">StudyFlow</span>
        </div>

        {/* Verified banner */}
        {justVerified && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium text-center">
            Email verified! You can now log in.
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8">
          <h1 className="text-2xl font-extrabold text-[#1a2a5e] mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-6">
            Don't have an account?{" "}
            <Link to="/auth" className="text-[#3b6fd4] font-semibold hover:underline">
              Sign up free
            </Link>
          </p>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
                autoFocus
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#3b6fd4] font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  className={`${inputClass("password")} pr-10`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a2a5e] transition"
                >
                  {showPwd ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#1a2a5e] hover:bg-[#14234d] text-white font-bold text-sm transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Logging in...
                </span>
              ) : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}