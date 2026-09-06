import React, { useState } from 'react';
import { WeeklyProgressLog } from '../../types';
import {
  Clock,
  Star,
  CheckCircle2,
  FileCode,
  Send,
  Plus,
  ShieldCheck,
  Calendar,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

interface InternshipProgressMentorFeedbackProps {
  logs: WeeklyProgressLog[];
  onSubmitWeeklyLog: (log: WeeklyProgressLog) => void;
  onNavigate: (page: string) => void;
}

export const InternshipProgressMentorFeedback: React.FC<InternshipProgressMentorFeedbackProps> = ({
  logs,
  onSubmitWeeklyLog,
  onNavigate,
}) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState('');
  const [deliverablesUrl, setDeliverablesUrl] = useState('');
  const [hoursWorked, setHoursWorked] = useState(40);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tasksCompleted) return;

    const nextWeek = logs.length + 1;
    const newLog: WeeklyProgressLog = {
      id: `log-w${nextWeek}-${Date.now()}`,
      internshipTitle: 'Cloud Systems & Distributed Cache Engineering Intern',
      company: 'Bharat Cloud & AI Innovations Ltd.',
      weekNumber: nextWeek,
      period: `Week ${nextWeek}: Current Sprint`,
      tasksCompleted,
      deliverablesUrl: deliverablesUrl || 'https://github.com/bharat-cloud/core-cache',
      hoursWorked: Number(hoursWorked),
      mentorRating: 5,
      mentorFeedback: 'Submitted for weekly evaluation. Mentor review pending in portal.',
      mentorName: 'Vikramaditya Sengupta',
      status: 'Pending Review',
    };

    onSubmitWeeklyLog(newLog);
    setShowLogModal(false);
    setTasksCompleted('');
    setDeliverablesUrl('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Internship Progress &amp; Mentor Feedback
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              AICTE Credit Transfer Tracker
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Weekly milestone logger for active industrial internships. Evaluations count directly towards semester project credits.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Log Week {logs.length + 1} Deliverables
        </button>
      </div>

      {/* Active Internship Summary Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
            Active 6-Month Track
          </span>
          <h2 className="text-lg font-bold text-stone-900 font-serif mt-1">
            Cloud Systems &amp; Distributed Cache Engineering
          </h2>
          <p className="text-xs text-stone-600">
            Bharat Cloud &amp; AI Innovations Ltd. • Mentor: <strong>Vikramaditya Sengupta (VP Engg)</strong>
          </p>
        </div>

        <div className="flex items-center gap-6 text-center sm:text-right text-xs">
          <div>
            <div className="text-stone-400 text-[11px]">Cumulative Rating</div>
            <div className="text-xl font-black text-amber-700 font-serif flex items-center gap-1 justify-center sm:justify-end">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              4.8 / 5.0
            </div>
          </div>
          <div>
            <div className="text-stone-400 text-[11px]">Logged Hours</div>
            <div className="text-xl font-black text-emerald-800 font-serif">
              {logs.reduce((acc, curr) => acc + curr.hoursWorked, 0)} Hrs
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Logs List */}
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  W{log.weekNumber}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">{log.period}</h3>
                  <span className="text-[11px] text-stone-500">{log.hoursWorked} Hours Logged</span>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${
                  log.status === 'Approved'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1'
                    : 'bg-amber-50 text-amber-800 border-amber-200 flex items-center gap-1'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {log.status}
              </span>
            </div>

            {/* Tasks Completed */}
            <div className="text-xs space-y-1">
              <div className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                Tasks &amp; Architectural Work Accomplished:
              </div>
              <p className="text-stone-700 leading-relaxed bg-[#fbf9f4] p-3 rounded-xl border border-stone-200">
                {log.tasksCompleted}
              </p>
            </div>

            {/* Deliverable Link */}
            {log.deliverablesUrl && (
              <div className="flex items-center gap-2 text-xs">
                <FileCode className="w-4 h-4 text-stone-500" />
                <span className="text-stone-500">Repository Deliverable PR:</span>
                <a
                  href={log.deliverablesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-800 font-semibold underline truncate max-w-md flex items-center gap-1"
                >
                  {log.deliverablesUrl}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Mentor Evaluation Remarks */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  Mentor Evaluation: {log.mentorName}
                </div>
                <div className="flex items-center gap-1 text-amber-700 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  Rating: {log.mentorRating} / 5.0
                </div>
              </div>
              <p className="text-emerald-900 italic leading-relaxed">
                "{log.mentorFeedback}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Log Submission Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 text-xs sm:text-sm">
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
              Submit Week {logs.length + 1} Progress Report
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Your mentor will review this log to sign off your weekly AICTE internship credits.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">
                  Hours Worked This Week
                </label>
                <input
                  type="number"
                  min="10"
                  max="60"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">
                  Summary of Tasks &amp; Milestones Completed
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail feature implementations, test coverage, bugs resolved, and benchmarks..."
                  value={tasksCompleted}
                  onChange={(e) => setTasksCompleted(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">
                  Deliverable URL (GitHub Pull Request / Demo link)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={deliverablesUrl}
                  onChange={(e) => setDeliverablesUrl(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Log for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
