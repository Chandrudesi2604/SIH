import React, { useState } from 'react';
import { DepartmentAnalytics } from '../../types';
import {
  TrendingUp,
  Award,
  Users,
  AlertTriangle,
  CheckCircle2,
  Download,
  Filter,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface StudentSkillAnalyticsProps {
  deptAnalytics: DepartmentAnalytics[];
  onNavigate: (page: string) => void;
}

export const StudentSkillAnalytics: React.FC<StudentSkillAnalyticsProps> = ({
  deptAnalytics,
  onNavigate,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const departments = ['All', 'Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Mechanical & Mechatronics'];

  const filtered = deptAnalytics.filter((d) => {
    const matchesDept = selectedDept === 'All' || d.department === selectedDept;
    const matchesSearch = d.department.toLowerCase().includes(searchTerm.toLowerCase()) || d.topSkillGap.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Student Cohort Skill Analytics
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              National NHEQF Level 8 Assessment
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Aggregate performance, competency distribution, and curriculum intervention triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting SIH 26044 Institutional Skill Audit Report (CSV)...')}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Cohort CSV
          </button>
          <button
            onClick={() => onNavigate('Training Programs')}
            className="px-3.5 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            Launch Intervention Bootcamp
          </button>
        </div>
      </div>

      {/* Aggregate Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Batch Skill Index</div>
          <div className="text-2xl font-black text-stone-900 font-serif mt-1">82.4 / 100</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">+6.2% vs Previous Semester</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Verified Assessments</div>
          <div className="text-2xl font-black text-emerald-800 font-serif mt-1">14,280 Tests</div>
          <p className="text-[11px] text-stone-500 mt-1">Pass rate: 89.4%</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Top High-Gap Domain</div>
          <div className="text-2xl font-black text-amber-700 font-serif mt-1">Cloud &amp; DevOps</div>
          <p className="text-[11px] text-stone-500 mt-1">18% batch delta to benchmark</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Eligible for Day 1 Hiring</div>
          <div className="text-2xl font-black text-blue-700 font-serif mt-1">2,840 Students</div>
          <p className="text-[11px] text-blue-700 font-medium mt-1">Exceeding 85% readiness</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by department or gap..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 text-stone-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedDept === d
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {d === 'All' ? 'All Departments' : d.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((dept, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-base text-stone-900 font-serif">{dept.department}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{dept.studentCount} Registered Undergraduates</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-emerald-800 font-serif">{dept.avgSkillScore}/100</span>
                <span className="block text-[10px] text-stone-400 uppercase font-bold">Avg Readiness</span>
              </div>
            </div>

            {/* Placement vs Gap Meter */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-stone-700 mb-1">
                  <span>Placement Conversion Rate</span>
                  <span className="text-emerald-800 font-bold">{dept.placementPct}%</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${dept.placementPct}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  Primary Identified Skill Gap:
                </div>
                <p className="text-stone-700 font-medium">{dept.topSkillGap}</p>
                <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                  <span>Average CTC: <strong className="text-stone-800">{dept.avgPackage}</strong></span>
                  <button
                    onClick={() => onNavigate('Training Programs')}
                    className="text-emerald-800 font-bold hover:underline"
                  >
                    Schedule Remediation &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
