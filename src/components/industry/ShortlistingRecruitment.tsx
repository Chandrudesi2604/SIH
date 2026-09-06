import React, { useState } from 'react';
import { CandidateSearchItem } from '../../types';
import {
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface RecruitmentPipelineCandidate {
  id: string;
  name: string;
  avatar: string;
  college: string;
  roleApplied: string;
  stage: 'Screening' | 'Shortlisted' | 'Technical Round' | 'Offer Extended';
  score: number;
  cgpa: number;
}

interface ShortlistingRecruitmentProps {
  candidates: CandidateSearchItem[];
  onNavigate: (page: string) => void;
}

export const ShortlistingRecruitment: React.FC<ShortlistingRecruitmentProps> = ({
  candidates,
  onNavigate,
}) => {
  const [pipeline, setPipeline] = useState<RecruitmentPipelineCandidate[]>([
    {
      id: 'pipe-1',
      name: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
      college: 'National Institute of Technology, Tiruchirappalli',
      roleApplied: 'Cloud Platform Engineer',
      stage: 'Technical Round',
      score: 86,
      cgpa: 9.12,
    },
    {
      id: 'pipe-2',
      name: 'Priya Iyer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&auto=format&fit=crop&q=80',
      college: 'Indian Institute of Technology, Madras',
      roleApplied: 'Generative AI & LLM Systems',
      stage: 'Offer Extended',
      score: 92,
      cgpa: 9.45,
    },
    {
      id: 'pipe-3',
      name: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&auto=format&fit=crop&q=80',
      college: 'BITS Pilani',
      roleApplied: 'Distributed Cache Intern',
      stage: 'Shortlisted',
      score: 78,
      cgpa: 8.35,
    },
    {
      id: 'pipe-4',
      name: 'Ananya Verma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&auto=format&fit=crop&q=80',
      college: 'National Institute of Technology, Tiruchirappalli',
      roleApplied: 'Cloud Platform Engineer',
      stage: 'Screening',
      score: 84,
      cgpa: 8.78,
    },
  ]);

  const stages: RecruitmentPipelineCandidate['stage'][] = [
    'Screening',
    'Shortlisted',
    'Technical Round',
    'Offer Extended',
  ];

  const handleAdvanceStage = (id: string) => {
    setPipeline((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const currentIndex = stages.indexOf(c.stage);
          const nextStage = stages[Math.min(stages.length - 1, currentIndex + 1)];
          return { ...c, stage: nextStage };
        }
        return c;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Recruitment Pipeline &amp; Candidate Funnel
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Season 2026 Active
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Track student applicants through interview rounds and dispatch digital offer letters with automated AICTE NOC verification.
          </p>
        </div>

        <button
          onClick={() => onNavigate('Candidate Search')}
          className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
        >
          Search More Talent &rarr;
        </button>
      </div>

      {/* Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageCandidates = pipeline.filter((c) => c.stage === stage);
          return (
            <div
              key={stage}
              className="bg-stone-50/70 rounded-2xl border border-stone-200 p-4 flex flex-col space-y-3 min-h-[500px]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 text-xs">
                <span className="font-bold text-stone-900 font-serif">{stage}</span>
                <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-[10px]">
                  {stageCandidates.length}
                </span>
              </div>

              {/* Cards in stage */}
              <div className="space-y-3 flex-1">
                {stageCandidates.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs hover:shadow-md transition-shadow space-y-3 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-xl object-cover border border-stone-300 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-stone-900 truncate">{c.name}</h4>
                        <p className="text-[11px] text-stone-500 truncate">{c.college}</p>
                        <p className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                          {c.roleApplied}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-100 text-stone-600">
                      <span>Score: <strong className="text-emerald-800">{c.score}%</strong></span>
                      <span>CGPA: <strong>{c.cgpa}</strong></span>
                    </div>

                    {stage !== 'Offer Extended' ? (
                      <button
                        onClick={() => handleAdvanceStage(c.id)}
                        className="w-full py-1.5 px-3 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        Advance Stage &rarr;
                      </button>
                    ) : (
                      <span className="w-full py-1.5 px-3 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold rounded-lg text-[11px] flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Offer Extended
                      </span>
                    )}
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-xs text-stone-400 italic">
                    No candidates in this round
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
