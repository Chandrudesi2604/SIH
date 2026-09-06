import React, { useState } from 'react';
import { JobPosting } from '../../types';
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface JobsPortalProps {
  jobs: JobPosting[];
  appliedJobIds: string[];
  onApplyJob: (job: JobPosting) => void;
  selectedJob: JobPosting | null;
  onSelectJob: (job: JobPosting | null) => void;
  onNavigate: (page: string) => void;
}

export const JobsPortal: React.FC<JobsPortalProps> = ({
  jobs,
  appliedJobIds,
  onApplyJob,
  selectedJob,
  onSelectJob,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [applySuccessId, setApplySuccessId] = useState<string | null>(null);

  const domains = ['All', 'Cloud & Systems', 'AI & Machine Learning', 'Security & Infrastructure'];

  const filtered = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'All' || j.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  const handleApply = (j: JobPosting) => {
    onApplyJob(j);
    setApplySuccessId(j.id);
    setTimeout(() => setApplySuccessId(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Campus Placement &amp; Job Drives
            </h1>
            <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> SIH 26044 National Drives
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Direct placement opportunities from verified tech partners with automated eligibility validation.
          </p>
        </div>

        <button
          onClick={() => onNavigate('Placement Applications')}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors cursor-pointer self-start sm:self-auto"
        >
          Track Placement Rounds ({appliedJobIds.length}) &rarr;
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search job title or company..."
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

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((job) => {
          const isApplied = appliedJobIds.includes(job.id);
          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h3 className="font-bold text-base text-stone-900 font-serif leading-tight">
                        {job.title}
                      </h3>
                      <p className="text-xs text-stone-600 font-medium mt-0.5">{job.company}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-800 font-serif bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">
                    {job.ctc}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span>{job.jobType}</span>
                  <span>•</span>
                  <span className="text-emerald-800 font-medium">{job.vacancies} Positions</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-3">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.skillsRequired.map((skill, sIdx) => (
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
                  Cutoff: <strong>{job.eligibilityCgpa}+ CGPA</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectJob(job)}
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
                      onClick={() => handleApply(job)}
                      className="px-4 py-1.5 rounded-lg bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold cursor-pointer shadow-sm"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs sm:text-sm space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <img
                  src={selectedJob.companyLogo}
                  alt={selectedJob.company}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                />
                <div>
                  <h3 className="font-bold text-lg text-stone-900 font-serif">
                    {selectedJob.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-semibold">{selectedJob.company}</p>
                </div>
              </div>
              <button
                onClick={() => onSelectJob(null)}
                className="text-stone-400 hover:text-stone-700 text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#fbf9f4] p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-500 block">CTC Package</span>
                <span className="font-bold text-amber-800 text-sm">{selectedJob.ctc}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Work Location</span>
                <span className="font-semibold text-stone-900">{selectedJob.location}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Min CGPA</span>
                <span className="font-semibold text-stone-900">{selectedJob.eligibilityCgpa} / 10.0</span>
              </div>
              <div>
                <span className="text-stone-500 block">Open Positions</span>
                <span className="font-semibold text-emerald-800">{selectedJob.vacancies}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                  Role Description
                </h4>
                <p className="leading-relaxed">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                  Key Deliverables &amp; Responsibilities
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedJob.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                  Technical Requirements
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <span className="text-xs text-stone-500">
                Application Deadline: <strong>{selectedJob.deadline}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectJob(null)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer text-xs"
                >
                  Close
                </button>
                {appliedJobIds.includes(selectedJob.id) ? (
                  <span className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Applied in Drive
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleApply(selectedJob);
                      onSelectJob(null);
                    }}
                    className="px-5 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg text-xs cursor-pointer shadow-sm"
                  >
                    Submit Application
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
