import React, { useState } from 'react';
import { ProjectShowcase, StudentProfile } from '../../types';
import {
  Award,
  Github,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Star,
  Download,
  Share2,
  FileText,
  Calendar,
  Code,
} from 'lucide-react';

interface DigitalPortfolioProps {
  student: StudentProfile;
  projects: ProjectShowcase[];
  onAddProject: (project: ProjectShowcase) => void;
  onNavigate: (page: string) => void;
}

export const DigitalPortfolio: React.FC<DigitalPortfolioProps> = ({
  student,
  projects,
  onAddProject,
  onNavigate,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('Computer Vision & IoT');
  const [techString, setTechString] = useState('React, Python, FastAPI');
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newProj: ProjectShowcase = {
      id: `proj-${Date.now()}`,
      title,
      description,
      domain,
      technologies: techString.split(',').map((t) => t.trim()),
      repoUrl: repoUrl || undefined,
      liveUrl: liveUrl || undefined,
      verifiedByMentor: true,
      mentorName: 'Dr. Meenakshi Sundaram (NIT Trichy)',
      completionDate: 'Sep 2026',
      starsOrLikes: 12,
    };

    onAddProject(newProj);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Digital Verified Portfolio
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> AICTE National Portfolio Standard
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Showcase of industry capstones, hackathon projects, and mentor-verified deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResumeModal(true)}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Verified Resume
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Capstone Project
          </button>
        </div>
      </div>

      {/* Profile Summary Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-700"
          />
          <div>
            <h2 className="text-lg font-bold text-stone-900 font-serif">{student.name}</h2>
            <p className="text-xs text-stone-600">
              {student.department} • {student.college}
            </p>
            <div className="mt-1 flex items-center gap-3 text-xs text-stone-500">
              <span>CGPA: <strong className="text-stone-800">{student.cgpa}</strong></span>
              <span>•</span>
              <span>Readiness: <strong className="text-emerald-800">{student.overallSkillScore}/100</strong></span>
              <span>•</span>
              <span>SIH 26044 Contributor</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <a
            href={student.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => alert(`Portfolio Public URL copied: https://academia.sih2026.gov.in/portfolio/${student.rollNo}`)}
            className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Public Link
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                  {proj.domain}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {proj.starsOrLikes}
                </span>
              </div>

              <h3 className="font-bold text-base text-stone-900 font-serif line-clamp-2">
                {proj.title}
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              {/* Technologies */}
              <div className="mt-3 flex flex-wrap gap-1">
                {proj.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-medium bg-[#fbf9f4] text-stone-700 border border-stone-200 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-xs">
              {proj.verifiedByMentor && (
                <div className="mb-2 text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Mentor: {proj.mentorName}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-stone-400">{proj.completionDate}</span>
                <div className="flex items-center gap-2">
                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                      title="Live Prototype Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 text-xs sm:text-sm">
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
              Add Verified Capstone Project
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Projects will be displayed on your portfolio and submitted for mentor endorsement.
            </p>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus Engine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Domain</label>
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={techString}
                  onChange={(e) => setTechString(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain architecture, key challenges overcome, and performance metrics..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1 text-xs">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg cursor-pointer"
                >
                  Publish to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-800" />
                <h3 className="font-bold text-stone-900 text-base font-serif">
                  SIH 2026 Verified Candidate Dossier
                </h3>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-stone-400 hover:text-stone-700 text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Simulated Resume Sheet */}
            <div className="p-6 bg-[#fbf9f4] border border-stone-300 rounded-xl space-y-4 font-sans text-stone-800">
              <div className="text-center pb-3 border-b border-stone-300">
                <h2 className="text-xl font-bold font-serif text-stone-900">{student.name}</h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  {student.email} • {student.phone} • {student.location}
                </p>
                <p className="text-[11px] text-emerald-800 font-semibold mt-1">
                  National Skill Verification Code: SIH-26044-VERIFIED-AARAV
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 mb-2">
                  Academic Education
                </h4>
                <div className="flex justify-between font-semibold">
                  <span>{student.college}</span>
                  <span>CGPA: {student.cgpa} / 10.0</span>
                </div>
                <div className="text-stone-600 text-[11px]">
                  B.Tech in {student.department} (Batch 2023 - {student.graduationYear})
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 mb-2">
                  Verified Technical Skills (AICTE Rubric)
                </h4>
                <p className="text-stone-700 leading-relaxed">
                  {student.skills.map((s) => `${s.name} (${s.level}%)`).join(', ')}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 mb-2">
                  Capstone Engineering Projects
                </h4>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id}>
                      <div className="font-semibold text-stone-900 flex justify-between">
                        <span>{p.title}</span>
                        <span className="text-stone-500 text-[10px]">{p.completionDate}</span>
                      </div>
                      <p className="text-stone-600 text-[11px]">{p.description}</p>
                      <div className="text-[10px] text-emerald-800 mt-0.5 font-medium">
                        Tech: {p.technologies.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Downloading official SIH-verified PDF resume with cryptographic watermark.');
                  setShowResumeModal(false);
                }}
                className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
