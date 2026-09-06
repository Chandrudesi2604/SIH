import React, { useState } from 'react';
import { IndustrySkillDemandItem } from '../../types';
import {
  TrendingUp,
  Building,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Filter,
  Search,
  Sparkles,
} from 'lucide-react';

interface IndustrySkillDemandProps {
  demands: IndustrySkillDemandItem[];
  onNavigate: (page: string) => void;
}

export const IndustrySkillDemand: React.FC<IndustrySkillDemandProps> = ({
  demands,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');

  const domains = ['All', 'Cloud Computing', 'Artificial Intelligence', 'Cybersecurity', 'Robotics & Hardware', 'Data Engineering'];

  const filtered = demands.filter((item) => {
    const matchesSearch =
      item.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topHiringCompanies.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDomain = domainFilter === 'All' || item.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Industry Skill Demand &amp; Deficit Radar
            </h1>
            <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              Aggregated from 1,200+ Corporate JDs
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real-time market analytics to inform Board of Studies (BoS) syllabus revisions and AICTE compliance.
          </p>
        </div>

        <button
          onClick={() => onNavigate('Training Programs')}
          className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
        >
          Propose Co-Op Program &rarr;
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search skill or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 text-stone-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setDomainFilter(dom)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                domainFilter === dom
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Demand Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isCritical = item.academicSupply === 'Critical Deficit';
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {item.domain}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-800 font-bold text-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {item.growthRate}
                  </span>
                </div>

                <h3 className="font-bold text-base text-stone-900 font-serif mb-1">
                  {item.skillName}
                </h3>
                <div className="text-xs font-bold text-amber-800 mb-3">
                  {item.openRequisitions.toLocaleString()} Active Requisitions
                </div>

                <div className="p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 text-xs space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Academic Talent Supply:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        isCritical
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.academicSupply}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Avg Market Package:</span>
                    <span className="font-semibold text-stone-800">{item.avgPackage}</span>
                  </div>
                </div>

                {/* Top Recruiters */}
                <div className="text-xs">
                  <span className="text-[11px] font-bold text-stone-700 block mb-1">
                    Major Hiring Partners:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.topHiringCompanies.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400">BoS Curriculum Action</span>
                <button
                  onClick={() => onNavigate('Training Programs')}
                  className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                >
                  Create Course <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
