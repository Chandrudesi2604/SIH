import React from 'react';
import {
  IndustryProfile,
  CandidateSearchItem,
  LiveProject,
  Internship,
  JobPosting,
} from '../../types';
import {
  Building,
  Users,
  Briefcase,
  Search,
  Plus,
  ShieldCheck,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Star,
} from 'lucide-react';

interface IndustryDashboardProps {
  industry: IndustryProfile;
  candidates: CandidateSearchItem[];
  liveProjects: LiveProject[];
  internships: Internship[];
  jobs: JobPosting[];
  onNavigate: (page: string) => void;
  onSelectCandidate: (candidate: CandidateSearchItem) => void;
}

export const IndustryDashboard: React.FC<IndustryDashboardProps> = ({
  industry,
  candidates,
  liveProjects,
  internships,
  jobs,
  onNavigate,
  onSelectCandidate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#16181D] rounded-2xl p-6 sm:p-8 text-gray-200 border border-gray-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#212429] border border-gray-800 text-[11px] font-mono font-bold text-[#C4F135]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C4F135]" />
              <span>SIH 2026 Verified Industry Partner • Tier 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight font-sans">
              {industry.companyName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono max-w-2xl leading-relaxed">
              Recruitment Head: {industry.hrHead} • Sector: {industry.sector} • {industry.headquarters}
            </p>
          </div>

          <div className="bg-[#0F1113] border border-gray-800 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#C4F135] flex items-center justify-center font-black font-mono text-black text-xl shadow-inner">
              {candidates.length * 15}
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-[#C4F135] uppercase tracking-wider">
                Candidates Vetted
              </div>
              <div className="text-xs text-gray-300 font-mono mt-0.5">AICTE Verified Rubric</div>
              <button
                onClick={() => onNavigate('Candidate Search')}
                className="mt-1 text-xs text-gray-400 hover:text-white font-mono flex items-center gap-1 cursor-pointer"
              >
                Search Talent Grid &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 pt-5 border-t border-gray-800 flex flex-wrap gap-2.5 text-xs">
          <button
            onClick={() => onNavigate('Post Internship')}
            className="bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold px-3.5 py-2 rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1.5 font-mono"
          >
            <Plus className="w-3.5 h-3.5" />
            Post Internship
          </button>
          <button
            onClick={() => onNavigate('Post Job')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#C4F135]" />
            Post Full-Time Job
          </button>
          <button
            onClick={() => onNavigate('Candidate Search')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Search className="w-3.5 h-3.5 text-[#C4F135]" />
            Skill-Radar Search
          </button>
          <button
            onClick={() => onNavigate('Mentorship & Live Projects')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Award className="w-3.5 h-3.5 text-gray-400" />
            Mentorship &amp; Live Projects
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('Shortlisting / Recruitment')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Active Openings</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {industry.openInternships + industry.openJobs}
          </div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            {industry.openInternships} Internships • {industry.openJobs} Jobs
          </p>
        </div>

        <div
          onClick={() => onNavigate('Candidate Search')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Talent Pool</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {candidates.length} Profiles
          </div>
          <p className="text-[11px] text-blue-400 font-mono mt-1">Verified Top Engineering Cohorts</p>
        </div>

        <div
          onClick={() => onNavigate('Mentorship & Live Projects')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Live Projects</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {liveProjects.length}
          </div>
          <p className="text-[11px] text-[#C4F135] font-mono mt-1">
            {industry.activeMentees} Active Student Mentees
          </p>
        </div>

        <div
          onClick={() => onNavigate('Shortlisting / Recruitment')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Shortlisted</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">42 Candidates</div>
          <p className="text-[11px] text-gray-400 font-mono mt-1">Interview Rounds Active</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Top Candidate Matches & Open Requisitions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Verified Candidates Card */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white uppercase font-sans">
                  Top Recommended Engineering Candidates
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  AICTE Rubric match for Cloud &amp; AI requisitions
                </p>
              </div>
              <button
                onClick={() => onNavigate('Candidate Search')}
                className="text-xs font-mono font-bold text-[#C4F135] hover:underline cursor-pointer"
              >
                View Full Grid &rarr;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {candidates.slice(0, 3).map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => onSelectCandidate(cand)}
                  className="p-4 bg-[#0F1113] hover:bg-[#16181D] rounded-xl border border-gray-800 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-11 h-11 rounded-xl object-cover border border-gray-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{cand.name}</span>
                        <span className="bg-[#212429] text-[#C4F135] border border-gray-800 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded">
                          {cand.overallScore}/100 Match
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs font-mono">
                        {cand.college} • {cand.department}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {cand.topSkills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] bg-[#16181D] border border-gray-700 px-1.5 py-0.5 rounded text-gray-300 font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 font-mono">
                    <span className="font-bold text-[#C4F135]">CGPA: {cand.cgpa}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCandidate(cand);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold text-[11px] cursor-pointer"
                    >
                      View Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Postings Overview */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white uppercase font-sans">
                  Live Postings &amp; Applicant Pipeline
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Manage internships and placement requisitions published on the national portal
                </p>
              </div>
              <button
                onClick={() => onNavigate('Shortlisting / Recruitment')}
                className="text-xs font-mono font-bold text-[#C4F135] hover:underline cursor-pointer"
              >
                Manage Pipeline &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {internships.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-gray-800 bg-[#0F1113] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C4F135] bg-[#212429] border border-gray-800 px-2 py-0.5 rounded">
                      Internship • {item.type}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1.5">{item.title}</h4>
                    <p className="text-[#C4F135] font-mono text-xs mt-0.5">{item.stipend}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">{item.openings} Openings</span>
                    <span className="font-bold text-[#C4F135]">Deadline: {item.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Live Mentorship & Projects */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm uppercase font-sans">
                Active Live Projects
              </h4>
              <button
                onClick={() => onNavigate('Mentorship & Live Projects')}
                className="text-[#C4F135] font-mono font-bold hover:underline text-[11px]"
              >
                View All &rarr;
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {liveProjects.map((proj) => (
                <div key={proj.id} className="p-3 bg-[#0F1113] rounded-xl border border-gray-800">
                  <div className="font-bold text-white text-xs">{proj.title}</div>
                  <div className="text-gray-400 font-mono text-[11px] mt-0.5">
                    Lead: {proj.mentorName} • {proj.enrolledStudents} Mentees
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden my-2">
                    <div
                      className="h-full bg-[#C4F135] rounded-full"
                      style={{ width: `${proj.progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                    <span>Sprint Progress</span>
                    <span className="font-bold text-[#C4F135]">{proj.progressPercentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Post Prompt */}
          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 text-xs space-y-3">
            <div className="flex items-center gap-2 text-[#C4F135] font-mono font-bold uppercase text-[10px] tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C4F135]" />
              <span>Campus Hiring Drive 2026</span>
            </div>
            <h4 className="font-bold text-white text-sm">
              Schedule Day-1 On-Campus Placement
            </h4>
            <p className="text-gray-400 text-xs font-mono">
              Reach over 4,800 pre-screened students at premier institutes like NIT Trichy, IIT Madras, and BITS Pilani.
            </p>
            <button
              onClick={() => onNavigate('Post Job')}
              className="w-full py-2 bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold font-mono rounded-lg cursor-pointer"
            >
              Post Job Drive &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
