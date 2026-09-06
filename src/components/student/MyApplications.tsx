import React from 'react';
import { InternshipApplication } from '../../types';
import {
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface MyApplicationsProps {
  applications: InternshipApplication[];
  onNavigate: (page: string) => void;
}

export const MyApplications: React.FC<MyApplicationsProps> = ({
  applications,
  onNavigate,
}) => {
  const getStatusBadge = (status: InternshipApplication['status']) => {
    switch (status) {
      case 'Offer Extended':
        return { color: 'bg-emerald-100 text-emerald-800 border-emerald-300', label: 'Offer Extended 🎉' };
      case 'Interview Scheduled':
        return { color: 'bg-amber-100 text-amber-800 border-amber-300', label: 'Interview Scheduled' };
      case 'Shortlisted':
        return { color: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Candidate Shortlisted' };
      case 'Under Review':
        return { color: 'bg-stone-100 text-stone-700 border-stone-300', label: 'Under Technical Review' };
      default:
        return { color: 'bg-stone-50 text-stone-600 border-stone-200', label: status };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              My Internship Applications
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {applications.length} Active Tracks
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real-time status synchronizer connected to corporate recruitment dashboards.
          </p>
        </div>

        <button
          onClick={() => onNavigate('Internship Portal')}
          className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
        >
          Browse More Openings &rarr;
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => {
          const badge = getStatusBadge(app.status);
          return (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-bold text-base text-stone-900 font-serif">
                    {app.internshipTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-600 font-medium">
                    <span>{app.company}</span>
                    <span>•</span>
                    <span className="font-semibold text-amber-800">{app.stipend}</span>
                    <span>•</span>
                    <span>{app.mode}</span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.color} self-start sm:self-auto`}
                >
                  {badge.label}
                </span>
              </div>

              {/* Status Timeline / Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
                <div>
                  <span className="text-stone-400 block text-[11px]">Applied Date</span>
                  <span className="font-semibold text-stone-800">{app.appliedDate}</span>
                </div>

                <div>
                  <span className="text-stone-400 block text-[11px]">Next Milestone</span>
                  <span className="font-semibold text-stone-800">
                    {app.interviewDate || 'Awaiting Shortlist Clearance'}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block text-[11px]">University NOC Status</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Auto-Eligible
                  </span>
                </div>
              </div>

              {/* Notes */}
              {app.notes && (
                <div className="p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 text-xs text-stone-700">
                  <span className="font-bold text-stone-900">Review Remarks:</span> {app.notes}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <span className="text-[11px] text-stone-400">
                  Application ID: <strong className="text-stone-600">{app.id}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {app.status === 'Offer Extended' && (
                    <button
                      onClick={() => onNavigate('Documents')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold cursor-pointer"
                    >
                      Download Offer Letter &amp; NOC
                    </button>
                  )}
                  {app.status === 'Interview Scheduled' && (
                    <button
                      onClick={() => alert(`Launching virtual interview lobby for ${app.company}. Please ensure your camera and microphone permissions are active.`)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold cursor-pointer"
                    >
                      Join Virtual Interview
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('Internship Progress & Mentor Feedback')}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                  >
                    View Mentor Channel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
