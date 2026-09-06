import React from 'react';
import {
  AcademiaProfile,
  DepartmentAnalytics,
  IndustrySkillDemandItem,
  TrainingProgram,
  FdpProgram,
} from '../../types';
import {
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  FileCheck,
  Building,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface AcademiaDashboardProps {
  institution: AcademiaProfile;
  deptAnalytics: DepartmentAnalytics[];
  industryDemands: IndustrySkillDemandItem[];
  trainingPrograms: TrainingProgram[];
  fdpPrograms: FdpProgram[];
  onNavigate: (page: string) => void;
}

export const AcademiaDashboard: React.FC<AcademiaDashboardProps> = ({
  institution,
  deptAnalytics,
  industryDemands,
  trainingPrograms,
  fdpPrograms,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Welcome Banner - High Density Aesthetic */}
      <div className="bg-[#16181D] rounded-2xl p-6 sm:p-8 text-gray-200 border border-gray-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#212429] border border-gray-800 text-[11px] font-mono font-bold text-[#C4F135]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C4F135]" />
              <span>AICTE &amp; NIRF Ranked Institution Node #26044</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight font-sans">
              {institution.collegeName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono max-w-2xl leading-relaxed">
              Institutional Head: {institution.headOfInstitution} • AISHE Code: {institution.aisheCode}
            </p>
          </div>

          <div className="bg-[#0F1113] border border-gray-800 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#C4F135] flex items-center justify-center font-black font-mono text-black text-xl shadow-inner">
              {institution.placementRate}%
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-[#C4F135] uppercase tracking-wider">
                Placement Conversion
              </div>
              <div className="text-xs text-gray-300 font-mono mt-0.5">₹15.8 LPA Average Package</div>
              <button
                onClick={() => onNavigate('Placement Analytics')}
                className="mt-1 text-xs text-gray-400 hover:text-white font-mono flex items-center gap-1 cursor-pointer"
              >
                Inspect Drives &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 pt-5 border-t border-gray-800 flex flex-wrap gap-2.5 text-xs">
          <button
            onClick={() => onNavigate('Student Skill Analytics')}
            className="bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold px-3.5 py-2 rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1.5 font-mono"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Student Skill Analytics
          </button>
          <button
            onClick={() => onNavigate('Industry Skill Demand')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Building className="w-3.5 h-3.5 text-[#C4F135]" />
            Industry Demand Matrix
          </button>
          <button
            onClick={() => onNavigate('Internship / FDP Management')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Users className="w-3.5 h-3.5 text-[#C4F135]" />
            Approve NOC &amp; FDPs
          </button>
          <button
            onClick={() => onNavigate('Training Programs')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
            Curriculum Co-Op
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('Student Skill Analytics')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Total Enrolled</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {institution.totalStudents.toLocaleString()}
          </div>
          <p className="text-[11px] text-green-400 font-mono mt-1">100% Digitally Tagged</p>
        </div>

        <div
          onClick={() => onNavigate('Placement Analytics')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Placement Rate</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {institution.placementRate}%
          </div>
          <p className="text-[11px] text-[#C4F135] font-mono mt-1">Highest CTC: ₹48.5 LPA</p>
        </div>

        <div
          onClick={() => onNavigate('Internship / FDP Management')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Corporate MoUs</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {institution.activeMoUs}
          </div>
          <p className="text-[11px] text-blue-400 font-mono mt-1">Bharat Cloud, Tata Labs, ISRO</p>
        </div>

        <div
          onClick={() => onNavigate('Student Skill Analytics')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Accreditation</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {institution.naacGrade}
          </div>
          <p className="text-[11px] text-gray-400 font-mono mt-1">NBA &amp; ABET Tier 1</p>
        </div>
      </div>

      {/* Main Grid: Department Readiness & Industry Demand Quick Look */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Department Analytics */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white uppercase font-sans">
                  Department Skill Index &amp; Placement Performance
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Comparative analysis of student cohort readiness across engineering branches
                </p>
              </div>
              <button
                onClick={() => onNavigate('Student Skill Analytics')}
                className="text-xs font-mono font-bold text-[#C4F135] hover:underline cursor-pointer"
              >
                Deep Analytics &rarr;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {deptAnalytics.map((dept, idx) => (
                <div key={idx} className="p-4 bg-[#0F1113] rounded-xl border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-sm text-white">{dept.department}</span>
                      <span className="text-gray-400 text-xs ml-2 font-mono">({dept.studentCount} Students)</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-[#C4F135] text-sm">{dept.placementPct}% Placed</span>
                      <span className="text-gray-400 text-[11px] block">Avg: {dept.avgPackage}</span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex mb-2">
                    <div
                      className="h-full bg-[#C4F135] rounded-full"
                      style={{ width: `${dept.avgSkillScore}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-gray-400 pt-1 font-mono">
                    <span>Average Readiness: <strong className="text-white">{dept.avgSkillScore}/100</strong></span>
                    <span>Primary Gap: <strong className="text-yellow-400">{dept.topSkillGap}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Training Initiatives */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white uppercase font-sans">
                  Active Industry Training Initiatives
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Jointly administered co-op bootcamps to bridge identified batch gaps
                </p>
              </div>
              <button
                onClick={() => onNavigate('Training Programs')}
                className="text-xs font-mono font-bold text-[#C4F135] hover:underline cursor-pointer"
              >
                Manage Programs &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {trainingPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="p-4 rounded-xl border border-gray-800 bg-[#0F1113] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase mb-1">
                      <span className="text-[#C4F135]">{prog.partnerCompany}</span>
                      <span className="bg-[#212429] text-gray-200 px-2 py-0.5 rounded border border-gray-800">
                        {prog.duration}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{prog.title}</h4>
                    <p className="text-gray-400 text-[11px] mt-1 font-mono">{prog.enrolledCount} Students Enrolled</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">Instructor: {prog.instructor}</span>
                    <span className="font-bold text-[#C4F135]">{prog.creditsAwarded} Credits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Top In-Demand Skills & FDP Management */}
        <div className="lg:col-span-4 space-y-6">
          {/* Industry Demand Pulse */}
          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm uppercase font-sans">Industry Demand Pulse</h4>
              <button
                onClick={() => onNavigate('Industry Skill Demand')}
                className="text-[#C4F135] font-mono font-bold hover:underline text-[11px]"
              >
                View Matrix &rarr;
              </button>
            </div>
            <p className="text-gray-400 text-[11px]">
              Top skills requested by 120+ visiting recruiters for 2026 batches:
            </p>

            <div className="space-y-2.5 pt-1">
              {industryDemands.slice(0, 5).map((item) => (
                <div key={item.id} className="p-2.5 bg-[#0F1113] rounded-lg border border-gray-800">
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span>{item.skillName}</span>
                    <span className="text-[#C4F135] font-mono font-bold">{item.growthRate} YoY</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 font-mono">
                    <span>{item.openRequisitions} Open Requisitions</span>
                    <span className="font-medium text-yellow-400">Supply: {item.academicSupply}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FDP Quick Card */}
          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 text-xs space-y-3">
            <div className="flex items-center gap-2 text-[#C4F135] font-mono font-bold uppercase text-[10px] tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#C4F135]" />
              <span>Upcoming FDP Program</span>
            </div>
            <h4 className="font-bold text-white text-sm">
              {fdpPrograms[0]?.title || 'Next-Gen Edge AI & Cloud Robotics'}
            </h4>
            <p className="text-gray-400 text-xs font-mono">
              Sponsoring Partner: {fdpPrograms[0]?.sponsor} • {fdpPrograms[0]?.facultyEnrolled} Faculty Registered
            </p>
            <div className="p-2 bg-[#0F1113] rounded-lg border border-gray-800 font-mono text-gray-300 text-[11px]">
              📅 {fdpPrograms[0]?.startDate} • AICTE QIP Credits
            </div>
            <button
              onClick={() => onNavigate('Internship / FDP Management')}
              className="w-full py-2 bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold rounded-lg cursor-pointer font-mono"
            >
              Review FDP &amp; Faculty Approvals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
