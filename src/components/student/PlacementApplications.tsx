import React from 'react';
import { PlacementApplication } from '../../types';
import {
  Briefcase,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Award,
} from 'lucide-react';

interface PlacementApplicationsProps {
  placementApplications: PlacementApplication[];
  onNavigate: (page: string) => void;
}

export const PlacementApplications: React.FC<PlacementApplicationsProps> = ({
  placementApplications,
  onNavigate,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Campus Placement Round Tracker
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Active Corporate Drives
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Track interview rounds, technical assessments, and final offer letters.
          </p>
        </div>

        <button
          onClick={() => onNavigate('Jobs / Placement Opportunities')}
          className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
        >
          Browse Open Drives &rarr;
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {placementApplications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-base text-stone-900 font-serif">{app.jobTitle}</h3>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-600 font-medium">
                  <span>{app.company}</span>
                  <span>•</span>
                  <span className="font-bold text-amber-800">{app.ctc}</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                {app.overallStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div>
                <span className="text-stone-400 block text-[11px]">Current Round</span>
                <span className="font-semibold text-stone-900">{app.currentRound}</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px]">Applied Date</span>
                <span className="font-semibold text-stone-900">{app.appliedDate}</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px]">Next Interview Schedule</span>
                <span className="font-semibold text-emerald-800">
                  {app.nextRoundDate || 'Results Under Tabulation'}
                </span>
              </div>
            </div>

            {/* Next Step Guidance */}
            <div className="p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
              <Calendar className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900">Round Protocol:</span>{' '}
                Please prepare 2 coding questions on dynamic programming, followed by a 20-minute discussion on distributed system bottlenecks.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-[11px] text-stone-400">
                Application ID: <strong className="text-stone-600">{app.id}</strong>
              </span>

              <button
                onClick={() => alert(`Interview Room for ${app.company} will open 15 minutes before the scheduled time.`)}
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold cursor-pointer transition-colors"
              >
                Join Candidate Hall
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
