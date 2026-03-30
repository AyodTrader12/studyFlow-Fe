// AdminPanel.jsx
// Admin-only page to add and manage resources.
// Route: /dashboard/admin
//
// To protect this route add an "isAdmin" field to the user's Firestore profile
// and check it in AppRouter before rendering this page.

import { useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import { useResources } from "./useResources";
// import { SUBJECTS, LEVELS, TYPE_META } from "./resourceUtils";

const EMPTY_FORM = {
  title: "", subject: "", topic: "", type: "youtube",
  url: "", duration: "", level: "All", thumbnail: "",
};

export default function AdminPanel() {
  const { user } = useOutletContext();
  const { resources, loading, addResource, deleteResource } = useResources();

  const [form, setForm]         = useState(EMPTY_FORM);
  const [errors, setErrors]     = useState({});
  const [saving, setSaving]     = useState(false);
  const [success, setSuccess]   = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())   e.title   = "Title is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.url.trim())     e.url     = "URL is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setSaving(true);
    try {
      await addResource({ ...form, addedBy: user?.uid || "admin" });
      setForm(EMPTY_FORM);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    await deleteResource(id);
    setDeleteId(null);
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-[#1a2a5e]/40 ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
    }`;

  return (
    <div className="flex flex-col gap-7 max-w-3xl">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">Admin Panel</h1>
        <p className="text-gray-500 text-sm mt-1">Add and manage study resources for students.</p>
      </div>

      {/* ── Add Resource Form ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-[#1a2a5e] mb-5">Add New Resource</h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {errors.general}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
            ✓ Resource added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Title *</label>
            <input name="title" placeholder="e.g. WAEC Maths Past Questions 2023"
              value={form.title} onChange={handleChange} className={inputClass("title")} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Resource Type *</label>
            <div className="flex gap-3">
              {["youtube", "pdf", "article"].map((t) => (
                <label key={t} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition text-sm font-medium
                  ${form.type === t ? "bg-[#1a2a5e] border-[#1a2a5e] text-white" : "border-gray-200 text-gray-600 hover:border-[#1a2a5e]/40"}`}>
                  <input type="radio" name="type" value={t} checked={form.type === t} onChange={handleChange} className="hidden" />
                  {TYPE_META[t].label}
                </label>
              ))}
            </div>
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              {form.type === "youtube" ? "YouTube URL *" : form.type === "pdf" ? "PDF URL *" : "Article URL *"}
            </label>
            <input name="url"
              placeholder={
                form.type === "youtube" ? "https://www.youtube.com/watch?v=..."
                : form.type === "pdf"   ? "https://example.com/file.pdf"
                : "https://example.com/article"
              }
              value={form.url} onChange={handleChange} className={inputClass("url")} />
            {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
            {form.type === "pdf" && (
              <p className="text-[11px] text-gray-400 mt-1">
                PDF will be displayed via Google Docs Viewer. Make sure the file is publicly accessible.
              </p>
            )}
          </div>

          {/* Subject + Level row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject *</label>
              <select name="subject" value={form.subject} onChange={handleChange}
                className={`${inputClass("subject")} cursor-pointer`}>
                <option value="">Select subject</option>
                {SUBJECTS.slice(1).map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Class Level</label>
              <select name="level" value={form.level} onChange={handleChange}
                className={`${inputClass("level")} cursor-pointer`}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Topic + Duration row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Topic</label>
              <input name="topic" placeholder="e.g. Quadratic Equations"
                value={form.topic} onChange={handleChange} className={inputClass("topic")} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Duration</label>
              <input name="duration" placeholder="e.g. 12 min or 30 min read"
                value={form.duration} onChange={handleChange} className={inputClass("duration")} />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Custom Thumbnail URL <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input name="thumbnail" placeholder="https://example.com/image.jpg"
              value={form.thumbnail} onChange={handleChange} className={inputClass("thumbnail")} />
          </div>

          <button type="submit" disabled={saving}
            className="mt-1 w-full py-3 rounded-xl bg-[#1a2a5e] text-white font-bold text-sm tracking-wide hover:bg-[#14234d] active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed">
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Adding resource...
              </span>
            ) : "Add Resource"}
          </button>
        </form>
      </div>

      {/* ── Existing Resources List ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-[#1a2a5e] mb-4">
          All Resources
          <span className="ml-2 text-xs font-medium text-gray-400">({resources.length})</span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin h-6 w-6 text-[#1a2a5e]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          </div>
        ) : resources.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No resources added yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            {resources.map((r) => {
              const meta = TYPE_META[r.type] || TYPE_META.article;
              return (
                <div key={r.id} className="flex items-center gap-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${meta.badgeClass}`}>
                    {meta.icon} {meta.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a2a5e] truncate">{r.title}</p>
                    <p className="text-[11px] text-gray-400 truncate">{r.subject} · {r.level}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={deleteId === r.id}
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                    title="Delete resource"
                  >
                    {deleteId === r.id ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4h6v2"/>
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}