import React, { useState } from 'react';
import { CandidateSearchItem } from '../../types';
import {
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Star,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CandidateSearchProps {
  candidates: CandidateSearchItem[];
  onSelectCandidate: (candidate: CandidateSearchItem) => void;
  onShortlistCandidate: (candidateId: string) => void;
  shortlistedCandidateIds: string[];
}

export const CandidateSearch: React.FC<CandidateSearchProps> = ({
  candidates,
  onSelectCandidate,
  onShortlistCandidate,
  shortlistedCandidateIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('All');
  const [minCgpa, setMinCgpa] = useState(7.0);

  const colleges = ['All', 'National Institute of Technology, Tiruchirappalli', 'Indian Institute of Technology, Madras', 'BITS Pilani'];

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.topSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege = collegeFilter === 'All' || c.college === collegeFilter;
    const matchesCgpa = c.cgpa >= minCgpa;
    return matchesSearch && matchesCollege && matchesCgpa;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              National Candidate Search &amp; Skill Radar
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> AICTE Verified Talent Grid
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Search pre-vetted engineering graduates based on verified objective benchmarks, capstone code, and Dean credentials.
          </p>
        </div>

        <div className="text-xs font-semibold text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-xl shadow-xs self-start sm:self-auto">
          Shortlisted: <strong className="text-emerald-800">{shortlistedCandidateIds.length} Profiles</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by candidate name, skill (e.g. Kubernetes, Go), or branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 text-stone-900"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800"
            >
              {colleges.map((col) => (
                <option key={col} value={col}>{col === 'All' ? 'All Institutes' : col}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-semibold whitespace-nowrap">Min CGPA:</span>
            <input
              type="number"
              step="0.5"
              min="6.0"
              max="10.0"
              value={minCgpa}
              onChange={(e) => setMinCgpa(Number(e.target.value))}
              className="w-16 p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-900"
            />
          </div>
        </div>
      </div>

      {/* Candidates Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cand) => {
          const isShortlisted = shortlistedCandidateIds.includes(cand.id);
          return (
            <div
              key={cand.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-stone-900 font-serif">
                          {cand.name}
                        </h3>
                        {cand.verifiedStatus && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600" title="AICTE Verified Candidate" />
                        )}
                      </div>
                      <p className="text-xs text-stone-600 font-medium mt-0.5">{cand.college}</p>
                      <p className="text-[11px] text-stone-400">{cand.department} • Batch {cand.graduationYear}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-emerald-800 font-serif">
                      {cand.overallScore}/100
                    </span>
                    <span className="block text-[10px] text-stone-400 uppercase font-bold">
                      Skill Score
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-stone-600 my-2">
                  <span>CGPA: <strong className="text-stone-900">{cand.cgpa} / 10.0</strong></span>
                  <span>•</span>
                  <span>Projects: <strong className="text-stone-900">{cand.projectsCount} Verified</strong></span>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {cand.topSkills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-medium bg-[#fbf9f4] text-stone-700 border border-stone-200 px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => onSelectCandidate(cand)}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  View Candidate Profile
                </button>

                {isShortlisted ? (
                  <span className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Shortlisted
                  </span>
                ) : (
                  <button
                    onClick={() => onShortlistCandidate(cand.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold cursor-pointer shadow-sm"
                  >
                    Shortlist Candidate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
