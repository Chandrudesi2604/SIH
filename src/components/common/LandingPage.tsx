import React from 'react';
import {
  GraduationCap,
  Building2,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
  BookOpen,
  Award,
  Cpu,
  Users,
  Compass,
  FileCheck2,
  Search,
  Zap,
} from 'lucide-react';
import { UserRole } from '../../types';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole, onNavigate }) => {
  return (
    <div className="bg-[#0F1113] text-gray-200 min-h-screen">
      {/* SIH 2026 Hero Header - High Density Aesthetic */}
      <section className="relative overflow-hidden bg-[#16181D] text-gray-100 pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* SIH Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C4F135]/15 border border-[#C4F135]/30 text-[#C4F135] text-xs sm:text-sm font-mono font-bold mb-6">
            <Sparkles className="w-4 h-4 text-[#C4F135]" />
            <span>Smart India Hackathon (SIH) 2026 • Problem Statement ID: 26044</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight uppercase font-sans">
            Bridging <span className="text-[#C4F135]">Academia</span>,{' '}
            <span className="text-gray-400">Industry</span> &amp; Engineers.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-400 max-w-3xl leading-relaxed">
            A unified national infrastructure enabling real-time skill verification, institutional cohort analytics,
            curriculum alignment with market demands, and verified corporate internships for Indian higher education.
          </p>

          {/* 3 Quick Role Entry CTAs */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
            {/* Student Login Card */}
            <div
              onClick={() => {
                onSelectRole('student');
                onNavigate('Student Dashboard');
              }}
              className="bg-[#0F1113] hover:bg-[#212429] border border-gray-800 hover:border-[#C4F135] p-5 rounded-2xl transition-all shadow-md cursor-pointer group text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#212429] border border-gray-800 flex items-center justify-center text-[#C4F135] group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5 text-[#C4F135]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#C4F135] uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded border border-gray-800">
                  Students
                </span>
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-[#C4F135] transition-colors flex items-center gap-1.5">
                Student Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C4F135]" />
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Skill gap radar, verified tests, live portfolio, internships &amp; placement tracker.
              </p>
            </div>

            {/* Academician Login Card */}
            <div
              onClick={() => {
                onSelectRole('academia');
                onNavigate('Academia Dashboard');
              }}
              className="bg-[#0F1113] hover:bg-[#212429] border border-gray-800 hover:border-[#C4F135] p-5 rounded-2xl transition-all shadow-md cursor-pointer group text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#212429] border border-gray-800 flex items-center justify-center text-[#C4F135] group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-[#C4F135]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#C4F135] uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded border border-gray-800">
                  Institutions
                </span>
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-[#C4F135] transition-colors flex items-center gap-1.5">
                Academia Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C4F135]" />
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Cohort skill benchmarks, industry curriculum gap, NOC approvals &amp; FDP programs.
              </p>
            </div>

            {/* Industry Login Card */}
            <div
              onClick={() => {
                onSelectRole('industry');
                onNavigate('Industry Dashboard');
              }}
              className="bg-[#0F1113] hover:bg-[#212429] border border-gray-800 hover:border-[#C4F135] p-5 rounded-2xl transition-all shadow-md cursor-pointer group text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#212429] border border-gray-800 flex items-center justify-center text-[#C4F135] group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5 text-[#C4F135]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#C4F135] uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded border border-gray-800">
                  Corporate
                </span>
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-[#C4F135] transition-colors flex items-center gap-1.5">
                Industry Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C4F135]" />
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Post internships &amp; jobs, search talent by verified skill index, live problem statements.
              </p>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Includes pre-configured demo logins for all three user personas.</span>
            </div>
            <button
              onClick={() => onNavigate('Login / Role Selection')}
              className="inline-flex items-center gap-1.5 text-[#C4F135] hover:underline font-mono font-bold cursor-pointer"
            >
              Open Login / Role Switcher Screen &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Key National Metrics - High Density Cards */}
      <section className="bg-[#0F1113] py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800">
            <div className="text-gray-500 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              Affiliated Institutions
            </div>
            <div className="text-3xl font-mono font-bold text-white">1,480+</div>
            <div className="mt-2 text-xs text-green-400 font-mono">IITs, NITs &amp; AICTE Universities</div>
          </div>

          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800">
            <div className="text-gray-500 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              Industry Partners
            </div>
            <div className="text-3xl font-mono font-bold text-white">4,200+</div>
            <div className="mt-2 text-xs text-[#C4F135] font-mono">12 New this month</div>
          </div>

          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800">
            <div className="text-gray-500 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              Verified Student Profiles
            </div>
            <div className="text-3xl font-mono font-bold text-white">860K+</div>
            <div className="mt-2 text-xs text-blue-400 font-mono">Across 28 Indian States</div>
          </div>

          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800">
            <div className="text-gray-500 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              Placement Conversion
            </div>
            <div className="text-3xl font-mono font-bold text-white">91.4%</div>
            <div className="mt-2 text-xs text-green-400 font-mono">+6.8% YoY Improvement</div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Deep Dive */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-[#C4F135] bg-[#C4F135]/10 border border-[#C4F135]/20 px-3 py-1 rounded-full mb-3">
            Ecosystem Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
            Designed for Seamless Collaboration
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            Every stakeholder has dedicated toolsets backed by a common verified data layer.
          </p>
        </div>

        <div className="space-y-6">
          {/* Pillar 1: Students */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#212429] text-[#C4F135] text-xs font-mono font-bold border border-gray-800">
                <GraduationCap className="w-4 h-4 text-[#C4F135]" />
                Pillar 1: Student Empowerment &amp; Careers
              </div>
              <h3 className="text-xl font-bold text-white">
                From Classroom Learning to High-Impact Placement
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Students can test their readiness using interactive objective assessments, map skill gaps against their
                target job profiles, follow personalized NPTEL/SWAYAM recommendations, and secure verified internships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Interactive Skill Assessment &amp; Badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Automated Skill Gap Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>AICTE-Aligned Digital Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Weekly Internship Milestone Logging</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    onSelectRole('student');
                    onNavigate('Skill Assessment');
                  }}
                  className="bg-[#C4F135] hover:bg-[#b5e02c] text-black px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Try Skill Assessment
                </button>
                <button
                  onClick={() => {
                    onSelectRole('student');
                    onNavigate('Internship Portal');
                  }}
                  className="bg-[#212429] hover:bg-gray-800 text-gray-200 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-gray-700"
                >
                  Explore Internships
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0F1113] p-5 rounded-xl border border-gray-800 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800 font-bold text-white">
                <span>Verified Competency Radar</span>
                <span className="text-[#C4F135] bg-[#C4F135]/10 border border-[#C4F135]/20 px-2 py-0.5 rounded text-[10px] font-mono">86/100 Top Tier</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-gray-400 mb-1 font-mono text-[11px]">
                    <span>Full Stack Web Engineering</span>
                    <span className="font-bold text-white">90%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C4F135] rounded-full w-[90%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-gray-400 mb-1 font-mono text-[11px]">
                    <span>Applied AI &amp; Machine Learning</span>
                    <span className="font-bold text-white">80%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full w-[80%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-gray-400 mb-1 font-mono text-[11px]">
                    <span>Cloud Architecture &amp; DevOps</span>
                    <span className="font-bold text-white">72%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full w-[72%]" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 italic pt-1">
                Backed by real-time test evaluations and mentor endorsements.
              </p>
            </div>
          </div>

          {/* Pillar 2: Academia */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 bg-[#0F1113] p-5 rounded-xl border border-gray-800 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800 font-bold text-white">
                <span>Curriculum vs Industry Demand Gap</span>
                <span className="text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded text-[10px] font-mono">Live Matrix</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-[#16181D] border border-gray-800">
                  <div className="font-bold text-white">Cloud &amp; Microservices (Kubernetes)</div>
                  <div className="text-[11px] text-red-400 font-mono font-semibold mt-0.5">
                    Critical Gap: 96% Market Demand vs 74% Syllabus
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Recommended: Introduce FDP Module 42</div>
                </div>
                <div className="p-3 rounded-lg bg-[#16181D] border border-gray-800">
                  <div className="font-bold text-white">Generative AI &amp; Vector Databases</div>
                  <div className="text-[11px] text-[#C4F135] font-mono font-semibold mt-0.5">
                    Moderate Gap: 95% Market Demand vs 62% Syllabus
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Recommended: AICTE Joint Certificate</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#212429] text-[#C4F135] text-xs font-mono font-bold border border-gray-800">
                <Building2 className="w-4 h-4 text-[#C4F135]" />
                Pillar 2: Academia &amp; Institutional Governance
              </div>
              <h3 className="text-xl font-bold text-white">
                Data-Driven Curriculum Alignment &amp; NOC Automation
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Deans and faculty heads gain continuous visibility into cohort readiness, identify which engineering
                disciplines lag industry requirements, organize faculty development programs (FDPs), and track placement trends.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Cohort-Wide Skill Benchmarks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Real-time Industry Demand Trends</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Digital NOC Approvals for Internships</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>FDP &amp; Workshop Scheduling</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    onSelectRole('academia');
                    onNavigate('Academia Dashboard');
                  }}
                  className="bg-[#C4F135] hover:bg-[#b5e02c] text-black px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  View Academia Analytics
                </button>
                <button
                  onClick={() => {
                    onSelectRole('academia');
                    onNavigate('Industry Skill Demand');
                  }}
                  className="bg-[#212429] hover:bg-gray-800 text-gray-200 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-gray-700"
                >
                  Inspect Market Demands
                </button>
              </div>
            </div>
          </div>

          {/* Pillar 3: Industry */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#212429] text-[#C4F135] text-xs font-mono font-bold border border-gray-800">
                <Briefcase className="w-4 h-4 text-[#C4F135]" />
                Pillar 3: Corporate Recruitment &amp; R&amp;D Mentorship
              </div>
              <h3 className="text-xl font-bold text-white">
                Recruit Industry-Ready Talent with Precision
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Filter thousands of candidate profiles by verified competency scores, review project repositories and mentor feedback,
                post internship drives, and collaborate with universities on live R&amp;D problem statements.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Filter by Verified Skill Readiness Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Interactive Kanban Recruitment Pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>1-Click Internship &amp; Job Posting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4F135] shrink-0" />
                  <span>Live Corporate R&amp;D Problem Statements</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    onSelectRole('industry');
                    onNavigate('Candidate Search');
                  }}
                  className="bg-[#C4F135] hover:bg-[#b5e02c] text-black px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Search Candidate Talent
                </button>
                <button
                  onClick={() => {
                    onSelectRole('industry');
                    onNavigate('Post Internship');
                  }}
                  className="bg-[#212429] hover:bg-gray-800 text-gray-200 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-gray-700"
                >
                  Post an Internship
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0F1113] p-5 rounded-xl border border-gray-800 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800 font-bold text-white">
                <span>Active Recruitment Pipeline</span>
                <span className="text-[#C4F135] bg-[#C4F135]/10 border border-[#C4F135]/20 px-2 py-0.5 rounded text-[10px] font-mono">Active Drive</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-lg bg-[#16181D] border border-gray-800">
                  <div className="text-xl font-mono font-bold text-white">42</div>
                  <div className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">Screened</div>
                </div>
                <div className="p-3 rounded-lg bg-[#16181D] border border-gray-800">
                  <div className="text-xl font-mono font-bold text-[#C4F135]">18</div>
                  <div className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">Interviews</div>
                </div>
                <div className="p-3 rounded-lg bg-[#16181D] border border-gray-800">
                  <div className="text-xl font-mono font-bold text-green-400">8</div>
                  <div className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">Offers</div>
                </div>
              </div>
              <div className="p-3 bg-[#C4F135]/10 rounded-lg border border-[#C4F135]/30 text-[11px] text-[#C4F135]">
                <span className="font-bold">Candidate Spotlight:</span> Aarav Sharma (Score 92%) shortlisted for Distributed Cloud Intern.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
