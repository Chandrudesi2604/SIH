import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Zap,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';

interface MySkillProfileProps {
  student: StudentProfile;
  onNavigate: (page: string) => void;
  onAddSkill?: (newSkill: { name: string; level: number; verified: boolean; domain: string }) => void;
}

export const MySkillProfile: React.FC<MySkillProfileProps> = ({
  student,
  onNavigate,
  onAddSkill,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillDomain, setNewSkillDomain] = useState('Frontend Engineering');
  const [newSkillLevel, setNewSkillLevel] = useState(75);

  const domains = ['All', 'Frontend Engineering', 'Backend Engineering', 'AI & Data Science', 'Databases', 'Cloud & DevOps', 'Core CS', 'Cybersecurity'];

  const filteredSkills = student.skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'All' || s.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;
    if (onAddSkill) {
      onAddSkill({
        name: newSkillName,
        level: Number(newSkillLevel),
        verified: false,
        domain: newSkillDomain,
      });
    }
    setShowAddModal(false);
    setNewSkillName('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              My Skill Profile &amp; Competencies
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> AICTE National Skill Grid
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Verified mastery records mapped to the National Higher Education Qualifications Framework (NHEQF).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('Skill Assessment')}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            Verify New Skill
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Self-Claimed Skill
          </button>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Verified Mastery Index</div>
          <div className="text-2xl font-black text-stone-900 font-serif mt-1">
            {student.overallSkillScore} / 100
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Top Tier Engineering Batch</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Verified Credentials</div>
          <div className="text-2xl font-black text-emerald-800 font-serif mt-1">
            {student.skills.filter((s) => s.verified).length} Skills
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Backed by test &amp; mentor evaluation</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
          <div className="text-stone-500 font-medium">Market Fitment</div>
          <div className="text-2xl font-black text-amber-700 font-serif mt-1">
            88% Cloud Full Stack
          </div>
          <button
            onClick={() => onNavigate('Skill Gap Analysis')}
            className="text-[11px] text-amber-800 font-bold hover:underline mt-1 block"
          >
            Analyze Next Career Leap &rarr;
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search skills by name..."
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

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-emerald-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                  {skill.domain}
                </span>
                {skill.verified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    AICTE Verified
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    Self-Assessed
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-base text-stone-900">{skill.name}</h3>
                <span className="text-base font-black text-emerald-800 font-serif">
                  {skill.level}%
                </span>
              </div>

              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden my-2">
                <div
                  className={`h-full rounded-full ${
                    skill.verified ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[11px]">
                {skill.level >= 85 ? 'Mastery Level' : skill.level >= 70 ? 'Proficient' : 'Competent'}
              </span>
              {!skill.verified && (
                <button
                  onClick={() => onNavigate('Skill Assessment')}
                  className="text-emerald-700 hover:underline font-bold text-[11px]"
                >
                  Verify with Test &rarr;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-xs sm:text-sm">
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
              Add New Technical Competency
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Add a skill to your profile. You can verify it subsequently via the test portal.
            </p>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GraphQL, Kafka, Rust, Terraform"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Domain</label>
                <select
                  value={newSkillDomain}
                  onChange={(e) => setNewSkillDomain(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs bg-white"
                >
                  {domains.filter((d) => d !== 'All').map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">
                  Self-Assessed Proficiency: {newSkillLevel}%
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                  className="w-full"
                />
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
                  Add to Skill Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
