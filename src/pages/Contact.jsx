import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
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
    // TODO: wire up your email/form service here (e.g. EmailJS, Formspree, Firebase)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 rounded-lg border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1a2a5e]/20 focus:border-[#1a2a5e] ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
    }`;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 pt-14 pb-24">

        {/* ── Page Title ── */}
        <h1 className="text-4xl font-semibold text-[#1a2a5e] text-center mb-12 tracking-tight">
          Get in Touch
        </h1>

        {/* ── Info Cards — always in a row ── */}
        <div className="flex flex-row gap-4 mb-14">
          {/* Email */}
          <div className="flex-1 flex flex-col items-center text-center py-4 px-3 rounded-xl border border-gray-100 shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mb-2">
              <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="#3b6fd4" strokeWidth="1.6" fill="none"/>
              <path d="M2 7.5l10 7 10-7" stroke="#3b6fd4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-xs font-bold text-[#1a2a5e] mb-0.5">Email</p>
            <p className="text-[11px] text-gray-500 leading-snug">studyflow304@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="flex-1 flex flex-col items-center text-center py-4 px-3 rounded-xl border border-gray-100 shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mb-2">
              <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.6 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.6 3.6a1 1 0 01-.25 1l-2.25 2.2z" stroke="#3b6fd4" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-xs font-bold text-[#1a2a5e] mb-0.5">Phone</p>
            <p className="text-[11px] text-gray-500 leading-snug">+234 8151 7814 06</p>
          </div>

          {/* Address */}
          <div className="flex-1 flex flex-col items-center text-center py-4 px-3 rounded-xl border border-gray-100 shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mb-2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#3b6fd4" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" stroke="#3b6fd4" strokeWidth="1.6" fill="none"/>
            </svg>
            <p className="text-xs font-bold text-[#1a2a5e] mb-0.5">Address</p>
            <p className="text-[11px] text-gray-500 leading-snug">88 Old Ojo Road, Second School Gate, Amuwo, Lagos.</p>
          </div>
        </div>

        {/* ── Contact Form ── */}
        <h2 className="text-xl font-bold text-[#1a2a5e] mb-6">Send us a Message</h2>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm text-center font-medium">
            ✓ Message sent! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text" name="name" placeholder="Your Name"
              value={form.name} onChange={handleChange}
              className={inputClass("name")}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email" name="email" placeholder="Your Email"
              value={form.email} onChange={handleChange}
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel" name="phone" placeholder="+234 1111 000 3333"
              value={form.phone} onChange={handleChange}
              className={inputClass("phone")}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              name="message" placeholder="Your Message..."
              value={form.message} onChange={handleChange}
              rows={6}
              className={`${inputClass("message")}  min-h-[160px]`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            className="w-full py-4 rounded-lg bg-[#1a2a5e] text-white font-bold text-base tracking-wide transition hover:bg-[#14234d] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Sending...
              </span>
            ) : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );

}
export default Contact;