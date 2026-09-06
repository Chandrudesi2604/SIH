import React, { useState } from 'react';
import { CareerPath } from '../../types';
import {
  Compass,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  Sparkles,
  DollarSign,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

interface CareerGuidanceProps {
  careerPaths: CareerPath[];
  onNavigate: (page: string) => void;
}

export const CareerGuidance: React.FC<CareerGuidanceProps> = ({
  careerPaths,
  onNavigate,
}) => {
  const [selectedRole, setSelectedRole] = useState(careerPaths[0]?.id || 'cp-1');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-09-18');
  const [bookingTime, setBookingTime] = useState('04:00 PM IST');
  const [mentorType, setMentorType] = useState('Industry Expert (Bharat Cloud)');

  const currentPath = careerPaths.find((p) => p.id === selectedRole) || careerPaths[0];

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Career Guidance &amp; Mentorship Cell
          </h1>
          <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
            SIH 26044 Advisory
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Explore structured engineering tracks, salary intelligence, and book 1-on-1 mentorship sessions with corporate leaders.
        </p>
      </div>

      {/* Role Pathway Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {careerPaths.map((path) => {
          const isSelected = path.id === selectedRole;
          return (
            <div
              key={path.id}
              onClick={() => setSelectedRole(path.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-700 shadow-sm ring-1 ring-emerald-700'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-800">{path.avgCtcRange}</span>
                <span className="text-stone-500 text-[10px] uppercase font-semibold">
                  {path.marketDemand} Demand
                </span>
              </div>
              <h3 className="font-bold text-stone-900 text-sm">{path.roleName}</h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">{path.description}</p>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Grid */}
      {currentPath && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Detailed Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 font-serif">
                    {currentPath.roleName} Pathway
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                      Average Starting CTC: {currentPath.avgCtcRange}
                    </span>
                    <span className="text-stone-500">Tier-1 &amp; Tier-2 Tech Firms</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {currentPath.description}
              </p>

              {/* Milestone Roadmap Steps */}
              <div className="pt-2 space-y-3">
                <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider">
                  Career Progression Milestones
                </h4>
                {currentPath.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 text-xs"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        m.completed ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {m.completed ? '✓' : idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900">{m.title}</div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-stone-100 text-xs">
                <span className="text-stone-500">Curriculum standard aligned with AICTE NHEQF Level 8</span>
                <button
                  onClick={() => onNavigate('Skill Gap Analysis')}
                  className="text-emerald-800 font-bold hover:underline"
                >
                  Analyze My Skill Gap &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Right Mentorship Booking Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm font-serif">
                    Book 1-on-1 Mentorship Call
                  </h3>
                  <p className="text-stone-500 text-[11px]">
                    Discuss portfolio &amp; interview strategies with vetted leaders
                  </p>
                </div>
              </div>

              {bookingSuccess && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Session Confirmed! Calendar invite sent to student email for {bookingDate} at {bookingTime}.
                  </span>
                </div>
              )}

              <form onSubmit={handleBookSession} className="space-y-3 pt-1">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">
                    Mentor Affiliation
                  </label>
                  <select
                    value={mentorType}
                    onChange={(e) => setMentorType(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs bg-white"
                  >
                    <option value="Industry Expert (Bharat Cloud)">Vikramaditya Sengupta (VP Engg, Bharat Cloud)</option>
                    <option value="Senior Scientist (Tata AI Labs)">Dr. Radhika Kulkarni (Tata AI Labs)</option>
                    <option value="University Dean (NIT Trichy)">Dr. Meenakshi Sundaram (Dean Academia)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">
                    Time Slot (IST)
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs bg-white"
                  >
                    <option value="04:00 PM IST">04:00 PM - 04:30 PM IST</option>
                    <option value="05:30 PM IST">05:30 PM - 06:00 PM IST</option>
                    <option value="07:00 PM IST">07:00 PM - 07:30 PM IST</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">
                    Topic / Discussion Focus
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Distributed system design interview prep and capstone project review."
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                    defaultValue="Distributed system design interview prep and capstone review."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-xl text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Confirm Free Slot
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
