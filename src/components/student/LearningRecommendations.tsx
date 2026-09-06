import React, { useState } from 'react';
import { LearningRecommendation } from '../../types';
import {
  BookOpen,
  Star,
  Users,
  Clock,
  Award,
  ExternalLink,
  CheckCircle2,
  Filter,
  Search,
  Zap,
} from 'lucide-react';

interface LearningRecommendationsProps {
  recommendations: LearningRecommendation[];
  onNavigate: (page: string) => void;
}

export const LearningRecommendations: React.FC<LearningRecommendationsProps> = ({
  recommendations,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(['lr-1']);

  const domains = ['All', 'Cloud & DevOps', 'AI & Data Science', 'Databases & Distributed Systems', 'Cybersecurity'];

  const filtered = recommendations.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || r.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const handleEnroll = (id: string) => {
    if (!enrolledCourseIds.includes(id)) {
      setEnrolledCourseIds([...enrolledCourseIds, id]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Personalized Learning Recommendations
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              AICTE &amp; SWAYAM Aligned
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Curated micro-credentials and university certified programs to bridge your identified skill gaps.
          </p>
        </div>

        <button
          onClick={() => onNavigate('Skill Assessment')}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5" />
          Test Acquired Skills
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search courses or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 text-stone-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filtered.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                    {course.provider}
                  </span>
                  <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {course.domain}
                  </span>
                  <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                </div>

                <h3 className="font-bold text-base text-stone-900 font-serif">
                  {course.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-amber-700 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {course.rating} / 5.0
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    {course.studentsEnrolled.toLocaleString()} Students Enrolled
                  </span>
                  <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    Badge: {course.badgeEarned}
                  </span>
                </div>

                {/* Key Syllabus Points */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Curriculum Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.syllabusCovered.map((item, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] bg-[#fbf9f4] text-stone-700 border border-stone-200 px-2.5 py-1 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-col sm:flex-row md:flex-col items-center gap-2.5 shrink-0">
                {isEnrolled ? (
                  <button
                    onClick={() => alert(`Opening coursework module on SWAYAM/NPTEL: ${course.title}`)}
                    className="w-full sm:w-auto md:w-36 py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Continue Study
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full sm:w-auto md:w-36 py-2 px-4 rounded-xl bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    Enroll (Free)
                  </button>
                )}

                <a
                  href={course.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto md:w-36 py-2 px-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold text-center flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Syllabus PDF
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
