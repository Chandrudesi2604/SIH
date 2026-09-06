import React, { useState } from 'react';
import { LiveProject } from '../../types';
import {
  Award,
  Users,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Star,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface MentorshipLiveProjectsProps {
  liveProjects: LiveProject[];
  onAddProject: (proj: LiveProject) => void;
  onNavigate: (page: string) => void;
}

export const MentorshipLiveProjects: React.FC<MentorshipLiveProjectsProps> = ({
  liveProjects,
  onAddProject,
  onNavigate,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(liveProjects[0]?.id || 'lp-1');
  const [mentorRemark, setMentorRemark] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Cloud Infrastructure');
  const [mentorName, setMentorName] = useState('Vikramaditya Sengupta (VP Engg)');
  const [techString, setTechString] = useState('Go, Redis, gRPC');
  const [description, setDescription] = useState('');

  const currentProject = liveProjects.find((p) => p.id === selectedProjectId) || liveProjects[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newProj: LiveProject = {
      id: `lp-${Date.now()}`,
      title,
      company: 'Bharat Cloud & AI Innovations Ltd.',
      mentorName,
      domain,
      duration: '10 Weeks',
      enrolledStudents: 1,
      maxSlots: 10,
      techStack: techString.split(',').map((t) => t.trim()),
      description,
      status: 'Active',
      progressPercentage: 10,
      nextDeliverableDate: 'Oct 05, 2026',
    };

    onAddProject(newProj);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorRemark) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setMentorRemark('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Mentorship &amp; Live Industry Projects
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Co-Innovation Sandbox
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Empower student engineering cohorts to work on production-level challenges with active corporate guidance.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          Propose New Live Project
        </button>
      </div>

      {/* Main Grid: Projects List (4 cols) & Workspace / Review (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Project Cards */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700">
            Active Corporate Projects ({liveProjects.length})
          </h3>

          <div className="space-y-3">
            {liveProjects.map((p) => {
              const isSelected = p.id === selectedProjectId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-700 shadow-sm ring-1 ring-emerald-700'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase mb-1">
                    <span className="text-emerald-800">{p.domain}</span>
                    <span className="text-stone-500">{p.duration}</span>
                  </div>

                  <h4 className="font-bold text-stone-900 text-sm leading-tight">{p.title}</h4>
                  <p className="text-xs text-stone-600 mt-1">Mentor: {p.mentorName}</p>

                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden my-3">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${p.progressPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>{p.enrolledStudents} / {p.maxSlots} Mentees</span>
                    <span className="font-semibold text-emerald-800">
                      {p.progressPercentage}% Progress
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 cols: Active Project Workbench & Feedback Panel */}
        {currentProject && (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    {currentProject.status} Live Project
                  </span>
                  <h3 className="font-bold text-lg text-stone-900 font-serif mt-1">
                    {currentProject.title}
                  </h3>
                  <p className="text-xs text-stone-600">
                    Lead Mentor: <strong>{currentProject.mentorName}</strong> ({currentProject.company})
                  </p>
                </div>

                <span className="text-sm font-black text-emerald-800 font-serif bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 shrink-0">
                  {currentProject.progressPercentage}% Complete
                </span>
              </div>

              <div className="text-xs text-stone-700 space-y-3">
                <div>
                  <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                    Architecture &amp; Scope
                  </h4>
                  <p className="leading-relaxed">{currentProject.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {currentProject.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-[#fbf9f4] border border-stone-200 rounded text-[11px] font-medium text-stone-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enrolled Mentees Sample */}
                <div className="p-4 bg-[#fbf9f4] rounded-xl border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 flex items-center justify-between">
                    <span>Enrolled Student Cohort:</span>
                    <span className="text-stone-500 font-normal">Next Milestone: {currentProject.nextDeliverableDate}</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-stone-200">
                      <div className="font-semibold text-stone-900">Aarav Sharma (NIT Trichy)</div>
                      <a
                        href="https://github.com/bharat-cloud/core-cache"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-800 font-bold hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Pull Request #14 &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mentor Feedback & Signoff Box */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
                  <MessageSquare className="w-4 h-4 text-emerald-800" />
                  <span>Submit Sprint Review &amp; Mentor Rating</span>
                </div>

                {feedbackSent && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Evaluation recorded and university semester project credits credited!</span>
                  </div>
                )}

                <form onSubmit={handleSendFeedback} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Enter weekly code review, architecture critique, and praise for student deliverable..."
                    value={mentorRemark}
                    onChange={(e) => setMentorRemark(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl p-3 text-stone-900 text-xs focus:ring-2 focus:ring-emerald-700"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-stone-600">
                      <span>Award Rating:</span>
                      <div className="flex text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Mentor Signoff
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Propose Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 text-xs sm:text-sm">
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
              Propose New Industry Live Project
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Open a real engineering problem statement for top campus talent with mentor guidance.
            </p>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Edge ML Inference on RISC-V SoC"
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
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  required
                  value={techString}
                  onChange={(e) => setTechString(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Assigned Lead Mentor</label>
                <input
                  type="text"
                  required
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Problem Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain goals, datasets, deliverables, and expectations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg cursor-pointer"
                >
                  Publish to National Sandbox
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
