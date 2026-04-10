import { useState, useEffect } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

export default function SettingsPage({ user }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    organisation: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        organisation: user.organisation || "",
      });
    }
  }, [user]);

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const setPw = (key) => (e) =>
    setPassword((p) => ({ ...p, [key]: e.target.value }));

  const tabs = ["profile", "security", "preferences"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* ─── HEADER ─── */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b px-6 py-4">
        <div className="max-w-5xl mx-auto space-y-4">

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Settings
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">
              Account Center
            </h1>
          </div>

          {/* NAV */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-all duration-200
                  ${
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

          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold">
            {form.name?.[0] || "U"}
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {form.username || "No username"}
            </p>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>

        </div>

        {/* PROFILE */}
        {activeTab === "profile" && (
          <Card title="Profile Information">
            <Input icon={<FiUser />} label="Full Name" value={form.name} onChange={setField("name")} />
            <Input icon={<FiUser />} label="Username" value={form.username} onChange={setField("username")} />

            <Input
              icon={<FiMail />}
              label="Email"
              value={form.email}
              onChange={setField("email")}
              disabled
            />

            <Input
              label="Organisation"
              value={form.organisation}
              onChange={setField("organisation")}
            />

            <ActionButton label="Save Changes" />
          </Card>
        )}

        {/* SECURITY */}
        {activeTab === "security" && (
          <Card title="Security">
            <Input
              icon={<FiLock />}
              label="Current Password"
              type="password"
              value={password.current}
              onChange={setPw("current")}
            />
            <Input
              icon={<FiLock />}
              label="New Password"
              type="password"
              value={password.new}
              onChange={setPw("new")}
            />
            <Input
              icon={<FiLock />}
              label="Confirm Password"
              type="password"
              value={password.confirm}
              onChange={setPw("confirm")}
            />

            <ActionButton label="Update Password" />
          </Card>
        )}

        {/* PREFERENCES */}
        {activeTab === "preferences" && (
          <Card title="Preferences">
            <Toggle label="Email Notifications" />
            <Toggle label="Study Reminders" />
            <Toggle label="Dark Mode" />
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
          className="w-full py-2 text-sm bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

/* ─── BUTTON ─── */
function ActionButton({ label }) {
  return (
    <button className="mt-2 px-5 py-2 text-sm rounded-lg bg-black text-white hover:opacity-90 transition">
      {label}
    </button>
  );
}

/* ─── TOGGLE ─── */
function Toggle({ label }) {
  const [on, setOn] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-700">{label}</span>

      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
          on ? "bg-black" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transform transition ${
            on ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}

