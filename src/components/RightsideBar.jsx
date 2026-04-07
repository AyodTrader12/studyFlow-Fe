// DashboardRightSidebar.jsx
// Props: user

import { useState, useRef } from "react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function RightSideBar({ user }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});
  const [reminderInput, setReminderInput] = useState("");
  const [showReminderForm, setShowReminderForm] = useState(false);
  const inputRef = useRef(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const toKey = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const handleDayClick = (d) => {
    const key = toKey(d);
    setSelectedDate(key);
    setShowReminderForm(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const addReminder = () => {
    if (!reminderInput.trim() || !selectedDate) return;
    setReminders((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), reminderInput.trim()],
    }));
    setReminderInput("");
    // TODO: Save to Firestore + trigger email via Cloud Function
    // await addDoc(collection(db, "reminders"), {
    //   uid: user.uid,
    //   email: user.email,
    //   date: selectedDate,
    //   text: reminderInput.trim(),
    //   createdAt: serverTimestamp(),
    // });
  };

  const removeReminder = (dateKey, idx) => {
    setReminders((prev) => {
      const updated = [...(prev[dateKey] || [])];
      updated.splice(idx, 1);
      return { ...prev, [dateKey]: updated };
    });
  };

  const upcomingReminders = Object.entries(reminders)
    .flatMap(([date, items]) => items.map((text) => ({ date, text })))
    .filter(({ date }) => date >= today.toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-5">

      {/* ── Mini Calendar ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-500"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <p className="text-sm font-bold text-[#1a2a5e]">{MONTHS[month]} {year}</p>
          <button
            onClick={nextMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-500"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
          ))}
        </div>

        {/* Date grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
          {[...Array(daysInMonth)].map((_, i) => {
            const d = i + 1;
            const key = toKey(d);
            const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
            const isSelected = selectedDate === key;
            const hasReminder = (reminders[key] || []).length > 0;

            return (
              <button
                key={d}
                onClick={() => handleDayClick(d)}
                className={`relative mx-auto w-7 h-7 rounded-full text-xs flex items-center justify-center transition font-medium
                  ${isSelected
                    ? "bg-[#1a2a5e] text-white"
                    : isToday
                    ? "bg-blue-100 text-[#1a2a5e] font-bold"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {d}
                {hasReminder && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Add Reminder Form ── */}
      {showReminderForm && selectedDate && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-bold text-[#1a2a5e] mb-3">
            Reminder for {selectedDate}
          </p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="e.g. Study Chemistry chapter 4"
              value={reminderInput}
              onChange={(e) => setReminderInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addReminder()}
              className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 placeholder-gray-400 outline-none focus:border-[#1a2a5e]/40 transition"
            />
            <button
              onClick={addReminder}
              className="px-3 py-2 rounded-xl bg-[#1a2a5e] text-white text-xs font-bold hover:bg-[#14234d] transition active:scale-95 flex-shrink-0"
            >
              Add
            </button>
          </div>

          {/* Reminders listed under selected date */}
          {(reminders[selectedDate] || []).length > 0 && (
            <ul className="mt-3 flex flex-col gap-1.5">
              {(reminders[selectedDate] || []).map((r, i) => (
                <li key={i} className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a2a5e] mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 flex-1 leading-snug">{r}</span>
                  <button
                    onClick={() => removeReminder(selectedDate, i)}
                    className="text-gray-400 hover:text-red-500 transition flex-shrink-0"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Upcoming Reminders ── */}
      {upcomingReminders.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-bold text-[#1a2a5e] mb-3 flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a2a5e" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Upcoming Reminders
          </p>
          <ul className="flex flex-col gap-2">
            {upcomingReminders.map(({ date, text }, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-700 leading-snug">{text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}