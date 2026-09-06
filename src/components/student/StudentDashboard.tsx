import React from 'react';
import {
  StudentProfile,
  SkillCategory,
  Internship,
  InternshipApplication,
  PlacementApplication,
  WeeklyProgressLog,
} from '../../types';
import {
  GraduationCap,
  Award,
  TrendingUp,
  Briefcase,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface StudentDashboardProps {
  student: StudentProfile;
  skills: SkillCategory[];
  internships: Internship[];
  applications: InternshipApplication[];
  placementApps: PlacementApplication[];
  weeklyLogs: WeeklyProgressLog[];
  onNavigate: (page: string) => void;
  onSelectInternship: (internship: Internship) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  skills,
  internships,
  applications,
  placementApps,
  weeklyLogs,
  onNavigate,
  onSelectInternship,
}) => {
  const activeAppCount = applications.filter(
    (a) => a.status !== 'Rejected' && a.status !== 'Offer Extended'
  ).length;

  const latestLog = weeklyLogs[weeklyLogs.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#16181D] rounded-2xl p-6 sm:p-8 text-gray-200 border border-gray-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#212429] border border-gray-800 text-[11px] font-mono font-bold text-[#C4F135]">
              <Sparkles className="w-3.5 h-3.5 text-[#C4F135]" />
              <span>SIH 2026 Academic Profile • ID: 26044</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight font-sans">
              Welcome back, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono max-w-2xl leading-relaxed">
              {student.department} • {student.college} • Class of {student.graduationYear}
            </p>
          </div>

          {/* Skill Readiness Score Ring */}
          <div className="bg-[#0F1113] border border-gray-800 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#C4F135] flex items-center justify-center font-black font-mono text-black text-xl shadow-inner">
              {student.overallSkillScore}
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-[#C4F135] uppercase tracking-wider">
                Readiness Index
              </div>
              <div className="text-xs text-gray-300 font-mono mt-0.5">Top 4% in Engineering Batch</div>
              <button
                onClick={() => onNavigate('Skill Gap Analysis')}
                className="mt-1 text-xs text-gray-400 hover:text-white font-mono flex items-center gap-1 cursor-pointer"
              >
                Analyze Gap &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 pt-5 border-t border-gray-800 flex flex-wrap gap-2.5 text-xs">
          <button
            onClick={() => onNavigate('Skill Assessment')}
            className="bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold px-3.5 py-2 rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1.5 font-mono"
          >
            <Zap className="w-3.5 h-3.5" />
            Take Skill Assessment
          </button>
          <button
            onClick={() => onNavigate('Internship Portal')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#C4F135]" />
            Explore Internships
          </button>
          <button
            onClick={() => onNavigate('Internship Progress & Mentor Feedback')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Clock className="w-3.5 h-3.5 text-[#C4F135]" />
            Weekly Mentor Logs
          </button>
          <button
            onClick={() => onNavigate('Digital Portfolio')}
            className="bg-[#212429] hover:bg-gray-800 text-gray-200 font-semibold px-3.5 py-2 rounded-lg border border-gray-700 transition-all cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <Award className="w-3.5 h-3.5 text-gray-400" />
            Digital Portfolio
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('My Skill Profile')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Verified Skills</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {student.skills.filter((s) => s.verified).length} / {student.skills.length}
          </div>
          <p className="text-[11px] text-green-400 font-mono mt-1">AICTE Gold Verified</p>
        </div>

        <div
          onClick={() => onNavigate('My Applications')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Active Apps</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {applications.length + placementApps.length}
          </div>
          <p className="text-[11px] text-blue-400 font-mono mt-1">1 Interview Scheduled</p>
        </div>

        <div
          onClick={() => onNavigate('Internship Progress & Mentor Feedback')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Mentor Rating</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">4.8 / 5.0</div>
          <p className="text-[11px] text-[#C4F135] font-mono mt-1">Bharat Cloud R&amp;D Team</p>
        </div>

        <div
          onClick={() => onNavigate('Career Guidance')}
          className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 hover:border-[#C4F135] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Target CTC</span>
            <div className="p-2 rounded-lg bg-[#212429] text-[#C4F135]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-white">₹14.5 LPA</div>
          <p className="text-[11px] text-gray-400 font-mono mt-1">88% Role Skill Match</p>
        </div>
      </div>

      {/* Main Content Split: Skill Gap Preview & Active Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Competency Matrix & Recommendations */}
        <div className="lg:col-span-8 space-y-6">
          {/* Skill Competency Breakdown */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white uppercase font-sans">
                  Skill Competency vs Industry Benchmarks
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Real-time gap evaluation against SIH 26044 enterprise demands
                </p>
              </div>
              <button
                onClick={() => onNavigate('Skill Gap Analysis')}
                className="text-xs font-mono font-bold text-[#C4F135] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Deep Analysis &rarr;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {skills.slice(0, 4).map((cat) => (
                <div key={cat.id} className="p-3.5 bg-[#0F1113] rounded-xl border border-gray-800">
                  <div className="flex items-center justify-between font-semibold text-white mb-1.5 font-sans">
                    <span>{cat.name}</span>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-gray-400 text-[11px]">
                        Demand: <strong className="text-gray-200">{cat.industryDemand}%</strong>
                      </span>
                      <span className="text-[#C4F135] font-bold">
                        Your Score: {cat.currentProficiency}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#C4F135] rounded-full"
                      style={{ width: `${cat.currentProficiency}%` }}
                    />
                  </div>
                  {cat.gap > 10 && (
                    <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-yellow-400 font-medium">
                        Identified Gap: {cat.gap}% to reach target tier
                      </span>
                      <button
                        onClick={() => onNavigate('Learning Recommendations')}
                        className="text-[#C4F135] hover:underline font-semibold cursor-pointer"
                      >
                        View Curated Courses
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Curated Internship Opportunities */}
          <div className="bg-[#16181D] rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white uppercase font-sans">
                  Featured Industry Internships
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Verified listings pre-approved for university credits and Dean NOC
                </p>
              </div>
              <button
                onClick={() => onNavigate('Internship Portal')}
                className="text-xs font-mono font-bold text-[#C4F135] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View All ({internships.length}) &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {internships.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectInternship(item)}
                  className="p-4 rounded-xl border border-gray-800 hover:border-[#C4F135] bg-[#0F1113] hover:bg-[#16181D] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2 font-mono">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#212429] text-[#C4F135] border border-gray-700 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-gray-400">{item.duration}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">{item.company}</p>
                    <div className="mt-2 text-xs font-bold font-mono text-[#C4F135]">{item.stipend}</div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 text-[11px]">Deadline: {item.deadline}</span>
                    <span className="text-[#C4F135] font-bold flex items-center gap-1">
                      Details <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Active Tracker & Recent Feedback */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interview Card */}
          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 text-xs">
            <div className="flex items-center gap-2 text-[#C4F135] font-mono font-bold uppercase text-[10px] tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Next Upcoming Interview</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Bharat Cloud &amp; AI Innovations
            </h4>
            <p className="text-gray-400 mt-1 font-mono text-xs">
              Virtual Round 2: Distributed Systems &amp; Cache Engineering
            </p>
            <div className="mt-3 p-2.5 bg-[#0F1113] rounded-lg border border-gray-800 font-mono text-gray-300">
              📅 Sep 12, 2026 • 11:00 AM IST
            </div>
            <button
              onClick={() => onNavigate('My Applications')}
              className="mt-3 w-full py-2 bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold font-mono rounded-lg text-center cursor-pointer shadow-sm"
            >
              View Application Status
            </button>
          </div>

          {/* Latest Mentor Feedback */}
          {latestLog && (
            <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm uppercase font-sans">Recent Mentor Feedback</h4>
                <span className="text-[#C4F135] font-mono font-bold bg-[#212429] border border-gray-800 px-2 py-0.5 rounded text-[10px]">
                  Week {latestLog.weekNumber} Approved
                </span>
              </div>
              <p className="text-gray-300 italic bg-[#0F1113] p-3 rounded-xl border border-gray-800">
                "{latestLog.mentorFeedback}"
              </p>
              <div className="flex items-center justify-between text-gray-400 text-[11px] font-mono">
                <span>Mentor: {latestLog.mentorName}</span>
                <span className="font-bold text-[#C4F135]">Rating: {latestLog.mentorRating}/5.0</span>
              </div>
              <button
                onClick={() => onNavigate('Internship Progress & Mentor Feedback')}
                className="w-full text-center py-2 bg-[#212429] hover:bg-gray-800 text-gray-200 font-mono font-semibold rounded-lg border border-gray-700 cursor-pointer"
              >
                Open Weekly Log History
              </button>
            </div>
          )}

          {/* Placement Application Status */}
          <div className="bg-[#16181D] p-5 rounded-2xl border border-gray-800 text-xs space-y-3">
            <h4 className="font-bold text-white text-sm uppercase font-sans">Placement Drive Tracker</h4>
            {placementApps.map((pa) => (
              <div key={pa.id} className="p-3 bg-[#0F1113] rounded-xl border border-gray-800">
                <div className="font-bold text-white">{pa.jobTitle}</div>
                <div className="text-gray-400 text-[11px] font-mono">{pa.company} • {pa.ctc}</div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                  <span className="font-semibold text-[#C4F135]">Round: {pa.currentRound}</span>
                  <span className="text-gray-400">{pa.overallStatus}</span>
                </div>
              </div>
            ))}
            <button
              onClick={() => onNavigate('Placement Applications')}
              className="w-full text-center py-2 text-[#C4F135] font-mono font-bold hover:underline cursor-pointer"
            >
              View Full Placement Portal &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
