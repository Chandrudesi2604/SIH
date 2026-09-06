import React, { useState } from 'react';
import { JobPosting } from '../../types';
import {
  Briefcase,
  Plus,
  DollarSign,
  Building,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface PostJobProps {
  onPostJob: (job: JobPosting) => void;
  onNavigate: (page: string) => void;
}

export const PostJob: React.FC<PostJobProps> = ({ onPostJob, onNavigate }) => {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Cloud & Systems');
  const [ctc, setCtc] = useState('₹24.0 LPA');
  const [location, setLocation] = useState('Bengaluru / Hyderabad');
  const [vacancies, setVacancies] = useState(12);
  const [eligibilityCgpa, setEligibilityCgpa] = useState(8.0);
  const [deadline, setDeadline] = useState('Oct 20, 2026');
  const [skillsString, setSkillsString] = useState('Kubernetes, Go, Kafka, Distributed Architecture');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title,
      company: 'Bharat Cloud & AI Innovations Ltd.',
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
      domain,
      location,
      jobType: 'Full-Time Permanent',
      ctc,
      vacancies: Number(vacancies),
      eligibilityCgpa: Number(eligibilityCgpa),
      deadline,
      description,
      skillsRequired: skillsString.split(',').map((s) => s.trim()),
      responsibilities: [
        'Design and operate high-availability backend microservices serving millions of RPM',
        'Participate in design architecture reviews and mentor graduate engineering trainees',
        'Drive automated testing, CI/CD observability, and incident resolution',
      ],
      requirements: [
        `Graduating 2026 Batch with CGPA >= ${eligibilityCgpa}`,
        'High proficiency in data structures, algorithms, and distributed principles',
        'Demonstrated capstone or hackathon project deliverables',
      ],
    };

    onPostJob(newJob);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onNavigate('Jobs / Placement Opportunities');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Post Full-Time Placement Requisition
          </h1>
          <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
            Day 1 Campus Hiring Grid
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Initiate direct recruitment drives with automated CGPA cutoffs and SIH 26044 skill assessments.
        </p>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Job drive posted and synchronized with Placement Officers at partner universities!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Member of Technical Staff - Distributed Infrastructure"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Technical Domain</label>
            <input
              type="text"
              required
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Annual CTC Package</label>
            <input
              type="text"
              required
              placeholder="e.g. ₹24.0 LPA"
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs font-bold text-amber-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Work Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Vacancies / Headcount</label>
            <input
              type="number"
              min="1"
              max="200"
              value={vacancies}
              onChange={(e) => setVacancies(Number(e.target.value))}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">
              Minimum Eligibility CGPA (Cutoff)
            </label>
            <input
              type="number"
              step="0.1"
              min="6.0"
              max="10.0"
              value={eligibilityCgpa}
              onChange={(e) => setEligibilityCgpa(Number(e.target.value))}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Application Deadline</label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-stone-700 mb-1 text-xs">
            Mandatory Skills (Comma Separated)
          </label>
          <input
            type="text"
            required
            value={skillsString}
            onChange={(e) => setSkillsString(e.target.value)}
            className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
          />
        </div>

        <div>
          <label className="block font-semibold text-stone-700 mb-1 text-xs">Role Description</label>
          <textarea
            rows={4}
            required
            placeholder="Explain architectural expectations, team focus, and career progression..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
          />
        </div>

        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('Industry Dashboard')}
            className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            Publish Campus Placement Drive
          </button>
        </div>
      </form>
    </div>
  );
};
