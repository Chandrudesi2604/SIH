import React, { useState } from 'react';
import { TrainingProgram } from '../../types';
import {
  GraduationCap,
  Plus,
  Users,
  Calendar,
  Clock,
  Award,
  Building,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface TrainingProgramsProps {
  programs: TrainingProgram[];
  onAddProgram: (prog: TrainingProgram) => void;
  onNavigate: (page: string) => void;
}

export const TrainingPrograms: React.FC<TrainingProgramsProps> = ({
  programs,
  onAddProgram,
  onNavigate,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [partnerCompany, setPartnerCompany] = useState('Bharat Cloud & AI Innovations');
  const [domain, setDomain] = useState('Distributed Cloud Computing');
  const [duration, setDuration] = useState('8 Weeks');
  const [instructor, setInstructor] = useState('Dr. S. K. Narayanan');
  const [credits, setCredits] = useState(3);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newProg: TrainingProgram = {
      id: `tp-${Date.now()}`,
      title,
      partnerCompany,
      domain,
      duration,
      enrolledCount: 1,
      maxCapacity: 150,
      instructor,
      creditsAwarded: Number(credits),
      status: 'Active',
      startDate: 'Oct 2026',
    };

    onAddProgram(newProg);
    setShowCreateModal(false);
    setTitle('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Industry Co-Op &amp; Training Programs
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              National Academic Credit Framework (NACF)
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Curated industry co-designed training tracks yielding accredited university semester credits.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          Launch New Co-Op Program
        </button>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {prog.domain}
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {prog.creditsAwarded} Academic Credits
                </span>
              </div>

              <h3 className="font-bold text-base text-stone-900 font-serif leading-tight">
                {prog.title}
              </h3>
              <p className="text-xs text-stone-600 font-medium mt-1">
                Corporate Partner: <strong>{prog.partnerCompany}</strong>
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 text-xs text-stone-600">
                <div>
                  <span className="text-stone-400 text-[11px] block">Duration</span>
                  <span className="font-semibold text-stone-800">{prog.duration}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px] block">Student Enrollment</span>
                  <span className="font-semibold text-stone-800">
                    {prog.enrolledCount} / {prog.maxCapacity}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px] block">Lead Professor</span>
                  <span className="font-semibold text-stone-800">{prog.instructor}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px] block">Start Term</span>
                  <span className="font-semibold text-stone-800">{prog.startDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400 text-[11px]">AICTE Certified Curriculum</span>
              <button
                onClick={() => alert(`Reviewing syllabus and roster for: ${prog.title}`)}
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
              >
                Manage Enrolled Roster
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-xs sm:text-sm">
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
              Create New Industry Co-Op Training
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Jointly sponsored course registered on the National Academic Depository.
            </p>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Program Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Ledger Systems & Smart Contracts"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Corporate Partner</label>
                <input
                  type="text"
                  required
                  value={partnerCompany}
                  onChange={(e) => setPartnerCompany(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">Credits</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Lead Professor</label>
                <input
                  type="text"
                  required
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg cursor-pointer"
                >
                  Publish Co-Op Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
