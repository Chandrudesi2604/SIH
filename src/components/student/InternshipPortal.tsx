import React, { useState } from 'react';
import { Internship } from '../../types';
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface InternshipPortalProps {
  internships: Internship[];
  appliedInternshipIds: string[];
  onApply: (internship: Internship) => void;
  selectedInternship: Internship | null;
  onSelectInternship: (internship: Internship | null) => void;
  onNavigate: (page: string) => void;
}

export const InternshipPortal: React.FC<InternshipPortalProps> = ({
  internships,
  appliedInternshipIds,
  onApply,
  selectedInternship,
  onSelectInternship,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [applySuccessId, setApplySuccessId] = useState<string | null>(null);

  const types = ['All', 'Hybrid', 'On-site', 'Remote'];
  const domains = ['All', 'Cloud Architecture & Backend', 'Artificial Intelligence', 'Embedded Systems & IoT', 'Frontend Engineering'];

  const filtered = internships.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesDomain = domainFilter === 'All' || item.domain === domainFilter;
    return matchesSearch && matchesType && matchesDomain;
  });

  const handleApplyNow = (item: Internship) => {
    onApply(item);
    setApplySuccessId(item.id);
    setTimeout(() => setApplySuccessId(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              National Internship Portal
            </h1>
            <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              AICTE MoE Credits Eligible
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Browse verified industrial internships with digital Dean NOC clearance and academic credit transfer.
          </p>
        </div>

        <button
          onClick={() => onNavigate('My Applications')}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors cursor-pointer self-start sm:self-auto"
        >
          Track My Applications ({appliedInternshipIds.length}) &rarr;
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 text-stone-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                typeFilter === t
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => {
          const isApplied = appliedInternshipIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.companyLogo}
                      alt={item.company}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h3 className="font-bold text-base text-stone-900 font-serif leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-600 font-medium mt-0.5">{item.company}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
                    {item.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {item.duration}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-amber-800">{item.stipend}</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.skillsRequired.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-medium bg-[#fbf9f4] text-stone-700 border border-stone-200 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-stone-400">
                  Deadline: <strong>{item.deadline}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectInternship(item)}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                  >
                    View Details
                  </button>

                  {isApplied ? (
                    <span className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApplyNow(item)}
                      className="px-4 py-1.5 rounded-lg bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold cursor-pointer shadow-sm"
                    >
                      1-Click Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs sm:text-sm space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <img
                  src={selectedInternship.companyLogo}
                  alt={selectedInternship.company}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                />
                <div>
                  <h3 className="font-bold text-lg text-stone-900 font-serif">
                    {selectedInternship.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-semibold">{selectedInternship.company}</p>
                </div>
              </div>
              <button
                onClick={() => onSelectInternship(null)}
                className="text-stone-400 hover:text-stone-700 text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#fbf9f4] p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-500 block">Stipend</span>
                <span className="font-bold text-amber-800 text-sm">{selectedInternship.stipend}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Location &amp; Mode</span>
                <span className="font-semibold text-stone-900">{selectedInternship.location}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Duration</span>
                <span className="font-semibold text-stone-900">{selectedInternship.duration}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Available Slots</span>
                <span className="font-semibold text-emerald-800">{selectedInternship.openings} Openings</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                  About the Internship
                </h4>
                <p className="leading-relaxed">{selectedInternship.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                  Key Responsibilities
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedInternship.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                  Eligibility &amp; Technical Requirements
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedInternship.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {selectedInternship.mentorAssigned && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Assigned Industry Mentor: {selectedInternship.mentorAssigned}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <span className="text-xs text-stone-500">
                AICTE Digital NOC clearance will trigger automatically upon acceptance.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectInternship(null)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer text-xs"
                >
                  Close
                </button>
                {appliedInternshipIds.includes(selectedInternship.id) ? (
                  <span className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Application Active
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleApplyNow(selectedInternship);
                      onSelectInternship(null);
                    }}
                    className="px-5 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg text-xs cursor-pointer shadow-sm"
                  >
                    Submit 1-Click Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
