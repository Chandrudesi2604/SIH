import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  Building,
  Users,
  CheckCircle2,
  Calendar,
  Download,
  Filter,
  Search,
  DollarSign,
  Sparkles,
} from 'lucide-react';

interface PlacementAnalyticsProps {
  onNavigate: (page: string) => void;
}

export const PlacementAnalytics: React.FC<PlacementAnalyticsProps> = ({ onNavigate }) => {
  const [selectedSeason, setSelectedSeason] = useState('2026 Batch');

  const ctcTiers = [
    { tier: 'Super Dream (> ₹20 LPA)', count: 412, percentage: 38, color: 'bg-emerald-700' },
    { tier: 'Dream (₹12 - ₹20 LPA)', count: 520, percentage: 48, color: 'bg-amber-600' },
    { tier: 'Core Engineering (₹8 - ₹12 LPA)', count: 150, percentage: 14, color: 'bg-stone-600' },
  ];

  const recentDrives = [
    {
      company: 'Bharat Cloud & AI Innovations',
      role: 'Cloud Platform Engineer',
      ctc: '₹22.5 LPA',
      applied: 380,
      shortlisted: 45,
      selected: 18,
      status: 'Offers Released',
    },
    {
      company: 'Tata AI Research Labs',
      role: 'Generative AI Research Associate',
      ctc: '₹26.0 LPA',
      applied: 290,
      shortlisted: 28,
      selected: 8,
      status: 'Interview Round 2',
    },
    {
      company: 'Cisco Systems India',
      role: 'Network Software Engineer',
      ctc: '₹19.0 LPA',
      applied: 410,
      shortlisted: 60,
      selected: 24,
      status: 'Offers Released',
    },
    {
      company: 'Goldman Sachs',
      role: 'Quant Infrastructure Analyst',
      ctc: '₹32.0 LPA',
      applied: 350,
      shortlisted: 18,
      selected: 6,
      status: 'Offers Released',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Training &amp; Placement Cell Analytics
            </h1>
            <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              Season 2026 Live
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real-time conversion metrics, CTC compensation distribution, and corporate drive rosters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Downloading official Institutional NIRF/NAAC Placement Metric Sheet (PDF)...')}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export NIRF Dossier
          </button>
          <button
            onClick={() => onNavigate('Industry Skill Demand')}
            className="px-3.5 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Invite Corporate Recruiters
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Placement Conversion</div>
          <div className="text-2xl font-black text-emerald-800 font-serif mt-1">94.2%</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">1,082 of 1,148 Students Placed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Average Compensation</div>
          <div className="text-2xl font-black text-amber-800 font-serif mt-1">₹15.8 LPA</div>
          <p className="text-[11px] text-stone-500 mt-1">+14.3% YoY Growth</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Highest Package</div>
          <div className="text-2xl font-black text-stone-900 font-serif mt-1">₹48.5 LPA</div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">International / R&amp;D Core</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Visiting Tech Giants</div>
          <div className="text-2xl font-black text-blue-700 font-serif mt-1">142 Firms</div>
          <p className="text-[11px] text-blue-700 font-medium mt-1">38 MoUs Signed</p>
        </div>
      </div>

      {/* CTC Distribution & Tier Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900 font-serif">
            Compensation Tier Breakdown
          </h3>
          <p className="text-xs text-stone-500">
            Segmentation of graduating engineers across compensation brackets.
          </p>

          <div className="space-y-4 pt-2 text-xs">
            {ctcTiers.map((t, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between font-semibold text-stone-800">
                  <span>{t.tier}</span>
                  <span className="font-bold text-stone-900">
                    {t.count} Students ({t.percentage}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full ${t.color} rounded-full`}
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 text-[11px] text-stone-600 mt-4">
            💡 <strong>AICTE Benchmark Note:</strong> Over 86% of the 2026 cohort secured Super Dream or Dream placements, attributing to SIH verified skill assessments.
          </div>
        </div>

        {/* Corporate Recruitment Drives Table */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900 font-serif">
            Active Placement Drives
          </h3>
          <p className="text-xs text-stone-500">
            Drive conversion ratio across test, interview, and offer stages.
          </p>

          <div className="space-y-3 pt-1">
            {recentDrives.map((d, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#fbf9f4] rounded-xl border border-stone-200 text-xs space-y-2"
              >
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span>{d.company}</span>
                  <span className="text-amber-800 font-serif font-black">{d.ctc}</span>
                </div>
                <div className="text-stone-500 text-[11px]">{d.role}</div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-200/60 text-stone-600">
                  <span>Applied: {d.applied}</span>
                  <span>Shortlisted: {d.shortlisted}</span>
                  <span className="font-bold text-emerald-800">Selected: {d.selected}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
