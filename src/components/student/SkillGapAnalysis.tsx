import React, { useState } from 'react';
import { CareerPath, SkillCategory, StudentProfile } from '../../types';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Zap,
  Briefcase,
} from 'lucide-react';

interface SkillGapAnalysisProps {
  careerPaths: CareerPath[];
  skillCategories: SkillCategory[];
  student: StudentProfile;
  onNavigate: (page: string) => void;
}

export const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  careerPaths,
  skillCategories,
  student,
  onNavigate,
}) => {
  const [selectedPathId, setSelectedPathId] = useState<string>(careerPaths[0]?.id || 'cp-1');

  const selectedPath =
    careerPaths.find((cp) => cp.id === selectedPathId) || careerPaths[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Skill Gap Analysis Engine
          </h1>
          <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
            SIH 26044 Industry Benchmark
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Evaluate your verified proficiencies against real job requisitions posted by partner corporations.
        </p>
      </div>

      {/* Target Dream Role Selector */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Select Target Engineering Role
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {careerPaths.map((cp) => {
            const isSelected = cp.id === selectedPathId;
            return (
              <div
                key={cp.id}
                onClick={() => setSelectedPathId(cp.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-700 shadow-sm ring-1 ring-emerald-700'
                    : 'bg-[#fbf9f4] border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {cp.marketDemand} Demand
                  </span>
                  <span className="font-serif font-black text-emerald-800 text-sm">
                    {cp.matchingScore}% Match
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm">{cp.roleName}</h3>
                <div className="mt-2 text-xs font-bold text-amber-800">{cp.avgCtcRange}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Role Breakdown & Fitment */}
      {selectedPath && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Comparison Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    Role Competency Breakdown
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{selectedPath.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-black text-emerald-800 font-serif">
                    {selectedPath.matchingScore}%
                  </div>
                  <div className="text-[10px] font-bold uppercase text-stone-400">Match Index</div>
                </div>
              </div>

              {/* Required Skills Matrix */}
              <div className="space-y-3 pt-1">
                <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider">
                  Mandatory Skills for {selectedPath.roleName}
                </h4>
                {selectedPath.requiredSkills.map((reqSkill, idx) => {
                  const studentSkill = student.skills.find((s) =>
                    s.name.toLowerCase().includes(reqSkill.toLowerCase().split('/')[0])
                  );
                  const currentLevel = studentSkill ? studentSkill.level : 40;
                  const isGap = currentLevel < 75;

                  return (
                    <div key={idx} className="p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 text-xs">
                      <div className="flex items-center justify-between font-semibold text-stone-900 mb-1">
                        <span className="flex items-center gap-1.5">
                          {isGap ? (
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                          {reqSkill}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-stone-500 text-[11px]">Required: 80%</span>
                          <span className={`font-bold ${isGap ? 'text-amber-800' : 'text-emerald-800'}`}>
                            Current: {currentLevel}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full rounded-full ${isGap ? 'bg-amber-600' : 'bg-emerald-600'}`}
                          style={{ width: `${currentLevel}%` }}
                        />
                      </div>

                      {isGap && (
                        <div className="mt-2 flex items-center justify-between text-[11px] text-amber-900">
                          <span>Gap of {80 - currentLevel}% identified for benchmark readiness</span>
                          <button
                            onClick={() => onNavigate('Learning Recommendations')}
                            className="text-emerald-800 font-bold hover:underline"
                          >
                            Recommended Module &rarr;
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Priority Missing Skills Box */}
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-serif">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                Targeted Remediation Roadmap
              </div>
              <p className="text-amber-900/90 leading-relaxed">
                Closing your identified gap in <strong>{selectedPath.gapSkills.join(' & ')}</strong> can elevate your profile from the 88th percentile into the top 2% of campus candidates, qualifying you for the highest CTC tier.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('Learning Recommendations')}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  View Curated SWAYAM &amp; NPTEL Courses
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Career Milestone Roadmap */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-4">
              <h3 className="font-bold text-stone-900 text-sm font-serif">
                Career Roadmap Milestones
              </h3>
              <div className="space-y-3">
                {selectedPath.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        m.completed
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-200 text-stone-600 border border-stone-300'
                      }`}
                    >
                      {m.completed ? '✓' : mIdx + 1}
                    </div>
                    <div>
                      <div
                        className={`font-semibold text-xs ${
                          m.completed ? 'text-stone-900' : 'text-stone-600'
                        }`}
                      >
                        {m.title}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => onNavigate('Career Guidance')}
                  className="w-full text-center py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Explore Full Career Guidance &rarr;
                </button>
              </div>
            </div>

            {/* Quick Placement Readiness */}
            <div className="bg-[#fbf9f4] p-5 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-2 text-stone-700">
              <div className="font-bold text-stone-900">Industry Placement Status</div>
              <p className="text-stone-600 leading-relaxed">
                42 corporate recruitment drives currently active on Academia for {selectedPath.roleName}.
              </p>
              <button
                onClick={() => onNavigate('Jobs / Placement Opportunities')}
                className="text-emerald-800 hover:underline font-bold block pt-1"
              >
                Browse Open Placement Drives &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
