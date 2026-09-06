import React, { useState } from 'react';
import { CandidateSearchItem } from '../../types';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Github,
  Mail,
  Phone,
  Calendar,
  Building,
  GraduationCap,
  ExternalLink,
  Download,
} from 'lucide-react';

interface CandidateProfileModalProps {
  candidate: CandidateSearchItem | null;
  onClose: () => void;
  onShortlist: (id: string) => void;
  isShortlisted: boolean;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  candidate,
  onClose,
  onShortlist,
  isShortlisted,
}) => {
  const [interviewScheduled, setInterviewScheduled] = useState(false);

  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-[#16181D] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-800 text-xs sm:text-sm space-y-5 max-h-[90vh] overflow-y-auto text-gray-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#C4F135]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white font-sans">{candidate.name}</h3>
                <span className="bg-[#212429] text-[#C4F135] text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border border-gray-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C4F135]" /> AICTE Verified ID
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{candidate.college}</p>
              <p className="text-[11px] text-gray-500 font-mono">
                {candidate.department} • Graduating {candidate.graduationYear}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-base font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {interviewScheduled && (
          <div className="p-3 bg-[#0F1113] rounded-xl border border-green-800 text-green-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span>Virtual interview invitation dispatched to candidate and university placement desk.</span>
          </div>
        )}

        {/* Academic & Skill Score Highlights */}
        <div className="grid grid-cols-3 gap-3 text-center bg-[#0F1113] p-4 rounded-xl border border-gray-800 text-xs font-mono">
          <div>
            <span className="text-gray-400 text-[11px] block">Overall Readiness</span>
            <span className="text-xl font-bold text-[#C4F135] font-mono">
              {candidate.overallScore} / 100
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-[11px] block">Graduation CGPA</span>
            <span className="text-xl font-bold text-[#C4F135] font-mono">
              {candidate.cgpa} / 10.0
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-[11px] block">Verified Capstones</span>
            <span className="text-xl font-bold text-white font-mono">
              {candidate.projectsCount} Projects
            </span>
          </div>
        </div>

        {/* Verified Skills */}
        <div>
          <h4 className="font-bold text-gray-300 font-mono uppercase tracking-wider text-[11px] mb-2">
            AICTE Verified Competencies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.topSkills.map((s, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#212429] text-gray-200 border border-gray-700 text-xs font-mono font-semibold flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C4F135]" />
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Capstone Highlights */}
        <div className="space-y-2">
          <h4 className="font-bold text-gray-300 font-mono uppercase tracking-wider text-[11px]">
            Key Capstone Deliverables
          </h4>
          <div className="p-3 bg-[#0F1113] rounded-xl border border-gray-800 space-y-1">
            <div className="font-bold text-white">Distributed Consensus &amp; Memory Cache Engine</div>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Implemented Raft consensus algorithm in Go, benchmarked with 10,000 requests/sec with sub-millisecond p99 latency. Endorsed by Dean of Academia.
            </p>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-800 text-xs font-mono">
          <button
            onClick={() => alert(`Downloading verified academic dossier and transcript for ${candidate.name}`)}
            className="px-3.5 py-2 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:bg-gray-800 cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF Dossier
          </button>

          <div className="flex items-center gap-2">
            {!interviewScheduled && (
              <button
                onClick={() => setInterviewScheduled(true)}
                className="px-4 py-2 bg-[#212429] hover:bg-gray-800 text-[#C4F135] font-bold rounded-xl border border-gray-700 cursor-pointer"
              >
                Schedule Virtual Round
              </button>
            )}

            {!isShortlisted ? (
              <button
                onClick={() => {
                  onShortlist(candidate.id);
                  onClose();
                }}
                className="px-4 py-2 bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold rounded-xl cursor-pointer"
              >
                Shortlist Candidate
              </button>
            ) : (
              <span className="px-4 py-2 bg-[#212429] text-[#C4F135] border border-gray-800 font-bold rounded-xl">
                Shortlisted in System
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
