import React, { useState } from 'react';
import { Internship } from '../../types';
import {
  Briefcase,
  Plus,
  Building,
  DollarSign,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface PostInternshipProps {
  onPostInternship: (internship: Internship) => void;
  onNavigate: (page: string) => void;
}

export const PostInternship: React.FC<PostInternshipProps> = ({
  onPostInternship,
  onNavigate,
}) => {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Cloud Architecture & Backend');
  const [type, setType] = useState<Internship['type']>('Hybrid');
  const [location, setLocation] = useState('Bengaluru / Hybrid');
  const [duration, setDuration] = useState('6 Months');
  const [stipend, setStipend] = useState('₹45,000 / month');
  const [openings, setOpenings] = useState(8);
  const [deadline, setDeadline] = useState('Oct 15, 2026');
  const [description, setDescription] = useState('');
  const [skillsString, setSkillsString] = useState('Docker, Kubernetes, Golang, PostgreSQL');
  const [mentorAssigned, setMentorAssigned] = useState('Vikramaditya Sengupta (VP Engg)');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newInternship: Internship = {
      id: `int-${Date.now()}`,
      title,
      company: 'Bharat Cloud & AI Innovations Ltd.',
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
      domain,
      location,
      type,
      duration,
      stipend,
      openings: Number(openings),
      deadline,
      description,
      skillsRequired: skillsString.split(',').map((s) => s.trim()),
      responsibilities: [
        'Design and deploy production-grade cloud services and scalable distributed APIs',
        'Contribute to sprint deliverables and attend bi-weekly architecture reviews',
        'Benchmark database query latency and integrate caching layers',
      ],
      requirements: [
        'B.Tech/BE in CS/IT/EC with CGPA > 7.5',
        'Proficiency in core engineering fundamentals, algorithms, and git',
        'Completed AICTE or SIH skill verification assessment',
      ],
      mentorAssigned,
    };

    onPostInternship(newInternship);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onNavigate('Internship Portal');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Post Industrial Internship Requisition
          </h1>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            AICTE Digital MoU Gateway
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Publish verified student internship opportunities eligible for university semester credits and institutional Dean NOCs.
        </p>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Internship successfully posted and syndicated to 45+ universities! Redirecting...</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Internship Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Systems & Caching Intern"
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
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Internship Mode</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs bg-white"
            >
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Duration</label>
            <input
              type="text"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Monthly Stipend</label>
            <input
              type="text"
              required
              placeholder="e.g. ₹40,000 / month"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
              className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">Open Vacancies</label>
            <input
              type="number"
              min="1"
              max="100"
              value={openings}
              onChange={(e) => setOpenings(Number(e.target.value))}
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
            Required Technical Skills (Comma Separated)
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
            placeholder="Outline project deliverables, team structure, tech stack, and learning outcomes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 text-xs"
          />
        </div>

        <div>
          <label className="block font-semibold text-stone-700 mb-1 text-xs">Assigned Senior Mentor</label>
          <input
            type="text"
            value={mentorAssigned}
            onChange={(e) => setMentorAssigned(e.target.value)}
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
            Publish Internship to National Grid
          </button>
        </div>
      </form>
    </div>
  );
};
