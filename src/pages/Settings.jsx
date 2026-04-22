// src/pages/DashboardSettings.jsx
//
// Your exact UI is kept 100% intact — same tabs, same Card/Input/Toggle/ActionButton
// components, same styling. What's added:
//
// Profile tab  → calls PATCH /api/auth/profile, updates AuthContext immediately
// Security tab → calls POST  /api/auth/change-password, validates locally first
// Preferences  → three working toggles wired to emailPreferences in MongoDB
//                (weeklyDigest, reminderEmails, streakMilestones)
//                Auto-saves after every toggle flip

import { useState, useEffect } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword } from "../api/UserApi";


export default function SettingsPage() {
  const { user, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  // ── Profile state ──────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name:         "",
    email:        "",
    classLevel:   "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg,     setProfileMsg]     = useState({ type: "", text: "" });

  // ── Security (password) state ──────────────────────────────────────────────
  const [password, setPassword] = useState({
    current: "",
    new:     "",
    confirm: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwLoading,   setPwLoading]   = useState(false);
  const [pwMsg,       setPwMsg]       = useState({ type: "", text: "" });

  // ── Preferences state ──────────────────────────────────────────────────────
  // Seeded from MongoDB user.emailPreferences on load
  const [prefs, setPrefs] = useState({
    weeklyDigest:     true,
    reminderEmails:   true,
    streakMilestones: true,
  });
  const [prefsSaving, setPrefsSaving] = useState(false);
  const [prefsMsg,    setPrefsMsg]    = useState({ type: "", text: "" });

  // ── Seed all state from user object ───────────────────────────────────────
  useEffect(() => {
    if (user) {
      setForm({
        name:       user.displayName || "",
        email:      user.email       || "",
        classLevel: user.classLevel  || "",
      });

      if (user.emailPreferences) {
        setPrefs({
          weeklyDigest:     user.emailPreferences.weeklyDigest     ?? true,
          reminderEmails:   user.emailPreferences.reminderEmails   ?? true,
          streakMilestones: user.emailPreferences.streakMilestones ?? true,
        });
      }
    }
  }, [user]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const setPw = (key) => (e) =>
    setPassword((p) => ({ ...p, [key]: e.target.value }));

  const showFeedback = (setter, type, text, ms = 4000) => {
    setter({ type, text });
    setTimeout(() => setter({ type: "", text: "" }), ms);
  };

  // ── Save profile ───────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!form.name.trim()) {
      showFeedback(setProfileMsg, "error", "Name cannot be empty.");
      return;
    }
    setProfileLoading(true);
    try {
      await updateProfile({
        displayName: form.name.trim(),
        classLevel:  form.classLevel,
      });
      await refreshUser();
      showFeedback(setProfileMsg, "success", "Profile updated successfully.");
    } catch (err) {
      showFeedback(setProfileMsg, "error", err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // ── Change password ────────────────────────────────────────────────────────
  const handleUpdatePassword = async () => {
    setPwMsg({ type: "", text: "" });

    if (!password.current) {
      showFeedback(setPwMsg, "error", "Enter your current password.");
      return;
    }
    if (password.new.length < 6) {
      showFeedback(setPwMsg, "error", "New password must be at least 6 characters.");
      return;
    }
    if (password.new !== password.confirm) {
      showFeedback(setPwMsg, "error", "Passwords do not match.");
      return;
    }
    if (password.new === password.current) {
      showFeedback(setPwMsg, "error", "New password must be different from your current one.");
      return;
    }

    setPwLoading(true);
    try {
      await changePassword({
        currentPassword: password.current,
        newPassword:     password.new,
      });
      setPassword({ current: "", new: "", confirm: "" });
      showFeedback(
        setPwMsg,
        "success",
        "Password changed. A security email has been sent to you. Please log in again."
      );
    } catch (err) {
      const msg =
        err.status === 401
          ? "Current password is incorrect."
          : err.message || "Failed to change password.";
      showFeedback(setPwMsg, "error", msg);
    } finally {
      setPwLoading(false);
    }
  };

  // ── Toggle a preference and auto-save ─────────────────────────────────────
  const handleTogglePref = async (key) => {
    // Flip the value immediately in local state (optimistic update)
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);

    setPrefsSaving(true);
    try {
      await updateProfile({ emailPreferences: updated });
      await refreshUser();
      showFeedback(setPrefsMsg, "success", "Preferences saved.", 2000);
    } catch (err) {
      // Roll back on failure
      setPrefs(prefs);
      showFeedback(setPrefsMsg, "error", err.message || "Failed to save preferences.");
    } finally {
      setPrefsSaving(false);
    }
  };

  const tabs = ["profile", "security", "preferences"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* ─── HEADER ─── */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b px-6 py-4">
        <div className="max-w-5xl mx-auto space-y-4">

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Settings</p>
            <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">Account Center</h1>
          </div>

          {/* TAB NAV */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? "bg-white shadow-sm text-gray-900 scale-100"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/70 hover:scale-105"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* USER CARD */}
        <div className="bg-white rounded-2xl border p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#1a2a5e] text-white flex items-center justify-center font-semibold text-lg">
            {form.name?.[0]?.toUpperCase() || "S"}
          </div>
          <div>
            <p className="font-medium text-gray-900">{form.name || "Student"}</p>
            <p className="text-sm text-gray-500">{form.email}</p>
            {user?.classLevel && (
              <p className="text-xs text-gray-400 mt-0.5">{user.classLevel}</p>
            )}
          </div>
          {/* Verified badge */}
          <div className="ml-auto">
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
              user?.isVerified
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}>
              {user?.isVerified ? "✓ Verified" : "Unverified"}
            </span>
          </div>
        </div>

        {/* ─── PROFILE TAB ─── */}
        {activeTab === "profile" && (
          <Card title="Profile Information">
            <Input
              icon={<FiUser />}
              label="Full Name"
              value={form.name}
              onChange={setField("name")}
              placeholder="Your full name"
            />

            <Input
              icon={<FiMail />}
              label="Email Address"
              value={form.email}
              disabled
              placeholder="Your email"
            />
            <p className="text-xs text-gray-400 -mt-3">
              Email cannot be changed here.
            </p>

            <div>
              <label className="text-xs text-gray-500">Class Level</label>
              <div className="mt-1 flex items-center border rounded-lg px-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition">
                <select
                  value={form.classLevel}
                  onChange={setField("classLevel")}
                  className="w-full py-2 text-sm bg-transparent outline-none text-gray-700 cursor-pointer"
                >
                  <option value="">Select class level</option>
                  {["JSS1","JSS2","JSS3","SS1","SS2","SS3"].map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <Feedback msg={profileMsg} />

            <ActionButton
              label={profileLoading ? "Saving..." : "Save Changes"}
              onClick={handleSaveProfile}
              disabled={profileLoading}
            />
          </Card>
        )}

        {/* ─── SECURITY TAB ─── */}
        {activeTab === "security" && (
          <Card title="Security">

            <p className="text-xs text-gray-400 -mt-2 mb-2 leading-relaxed">
              After changing your password you will be logged out automatically
              and a security email will be sent to <strong>{form.email}</strong>.
            </p>

            {/* Current password */}
            <div>
              <label className="text-xs text-gray-500">Current Password</label>
              <div className="mt-1 flex items-center border rounded-lg px-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition">
                <FiLock className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type={showCurrent ? "text" : "password"}
                  value={password.current}
                  onChange={setPw("current")}
                  placeholder="Enter current password"
                  className="w-full py-2 text-sm bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 transition ml-2 flex-shrink-0"
                  tabIndex={-1}
                >
                  {showCurrent ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="text-xs text-gray-500">New Password</label>
              <div className="mt-1 flex items-center border rounded-lg px-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition">
                <FiLock className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type={showNew ? "text" : "password"}
                  value={password.new}
                  onChange={setPw("new")}
                  placeholder="At least 6 characters"
                  className="w-full py-2 text-sm bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 transition ml-2 flex-shrink-0"
                  tabIndex={-1}
                >
                  {showNew ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {/* Password strength bar */}
              {password.new && <StrengthBar password={password.new} />}
            </div>

            {/* Confirm password */}
            <div>
              <label className="text-xs text-gray-500">Confirm New Password</label>
              <div className={`mt-1 flex items-center border rounded-lg px-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition ${
                password.confirm && password.confirm !== password.new
                  ? "border-red-300 bg-red-50"
                  : ""
              }`}>
                <FiLock className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={password.confirm}
                  onChange={setPw("confirm")}
                  placeholder="Repeat new password"
                  className="w-full py-2 text-sm bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 transition ml-2 flex-shrink-0"
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {password.confirm && password.confirm !== password.new && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <Feedback msg={pwMsg} />

            <ActionButton
              label={pwLoading ? "Updating..." : "Update Password"}
              onClick={handleUpdatePassword}
              disabled={pwLoading || !password.current || !password.new || !password.confirm}
            />
          </Card>
        )}

        {/* ─── PREFERENCES TAB ─── */}
        {activeTab === "preferences" && (
          <Card title="Preferences">

            <p className="text-xs text-gray-400 -mt-2 mb-1 leading-relaxed">
              These control which emails StudyFlow sends you. Changes save automatically.
              {prefsSaving && (
                <span className="ml-2 text-blue-500">Saving...</span>
              )}
            </p>

            <Toggle
              label="Weekly resource digest"
              description="New resources added to your subjects every Monday"
              on={prefs.weeklyDigest}
              onToggle={() => handleTogglePref("weeklyDigest")}
            />

            <Toggle
              label="Study reminders"
              description="Email alerts for study reminders you create"
              on={prefs.reminderEmails}
              onToggle={() => handleTogglePref("reminderEmails")}
            />

            <Toggle
              label="Streak milestone emails"
              description="Celebrate when you hit 7, 14, 30 or 60-day streaks"
              on={prefs.streakMilestones}
              onToggle={() => handleTogglePref("streakMilestones")}
            />

            <Feedback msg={prefsMsg} />

          </Card>
        )}

      </div>
    </div>
  );
}

/* ─── CARD ─── */
function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm">
      <h2 className="font-semibold text-gray-800">{title}</h2>
      {children}
    </div>
  );
}

/* ─── INPUT WITH ICON ─── */
function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <div className="mt-1 flex items-center border rounded-lg px-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition">
        {icon && <span className="text-gray-400 mr-2">{icon}</span>}
        <input
          {...props}
          className={`w-full py-2 text-sm bg-transparent outline-none ${
            props.disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
          }`}
        />
      </div>
    </div>
  );
}

/* ─── BUTTON ─── */
function ActionButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-2 px-5 py-2 text-sm rounded-lg bg-black text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}

/* ─── TOGGLE — now has description + controlled on/off ─── */
function Toggle({ label, description, on, onToggle }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1">
        <span className="text-sm text-gray-700 font-medium">{label}</span>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <button
        onClick={onToggle}
        className={`mt-0.5 w-10 h-5 flex items-center rounded-full p-1 transition-colors flex-shrink-0 ${
          on ? "bg-black" : "bg-gray-300"
        }`}
        role="switch"
        aria-checked={on}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

/* ─── FEEDBACK MESSAGE ─── */
function Feedback({ msg }) {
  if (!msg?.text) return null;
  return (
    <div className={`text-sm px-4 py-2.5 rounded-lg border ${
      msg.type === "success"
        ? "bg-green-50 border-green-200 text-green-700"
        : "bg-red-50 border-red-200 text-red-600"
    }`}>
      {msg.text}
    </div>
  );
}

/* ─── PASSWORD STRENGTH BAR ─── */
function StrengthBar({ password }) {
  const strength =
    password.length >= 12 && /[^a-zA-Z0-9]/.test(password) ? 4 :
    password.length >= 10 ? 3 :
    password.length >= 6  ? 2 : 1;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors  = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-500"];
  const textCol = ["", "text-red-500", "text-amber-500", "text-blue-500", "text-green-600"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= strength ? colors[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-[10px] font-semibold ${textCol[strength]}`}>
        {labels[strength]}
      </p>
    </div>
  );
}