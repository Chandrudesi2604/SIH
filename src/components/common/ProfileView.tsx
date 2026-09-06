import React, { useState } from 'react';
import {
  CurrentUserProfile,
  StudentProfile,
  AcademiaProfile,
  IndustryProfile,
  UserRole,
} from '../../types';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Edit3,
  Save,
  Globe,
  Github,
  Linkedin,
  Award,
  BookOpen,
} from 'lucide-react';

interface ProfileViewProps {
  currentRole: UserRole;
  userProfile: CurrentUserProfile;
  onUpdateProfile: (updated: CurrentUserProfile) => void;
  onNavigate: (page: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentRole,
  userProfile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [location, setLocation] = useState(userProfile.location);
  const [bio, setBio] = useState('bio' in userProfile ? (userProfile as StudentProfile).bio : '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    let updated: CurrentUserProfile;
    if (currentRole === 'student') {
      updated = {
        ...(userProfile as StudentProfile),
        name,
        email,
        phone,
        location,
        bio,
      };
    } else if (currentRole === 'academia') {
      updated = {
        ...(userProfile as AcademiaProfile),
        name,
        email,
        phone,
        location,
      };
    } else {
      updated = {
        ...(userProfile as IndustryProfile),
        name,
        email,
        phone,
        location,
      };
    }
    onUpdateProfile(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const student = currentRole === 'student' ? (userProfile as StudentProfile) : null;
  const academia = currentRole === 'academia' ? (userProfile as AcademiaProfile) : null;
  const industry = currentRole === 'industry' ? (userProfile as IndustryProfile) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-[#0c2f21] via-[#14532d] to-[#1e3a29] relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-stone-100 text-xs font-semibold border border-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Verified SIH 26044 Identity
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-14 mb-4 gap-4">
            <div className="flex items-end gap-4">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-md border border-stone-200 bg-white"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                    {userProfile.name}
                  </h1>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  {student && `${student.department} • ${student.college}`}
                  {academia && `${academia.designation} • ${academia.institutionName}`}
                  {industry && `${industry.designation} • ${industry.companyName}`}
                </p>
              </div>
            </div>

            <div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-xs font-bold text-white shadow cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-stone-300 hover:border-stone-400 bg-white text-xs font-semibold text-stone-800 shadow-sm transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-stone-600" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Profile changes saved successfully to your Academia verified record.
            </div>
          )}

          {/* Quick Details Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-stone-300 rounded px-2 py-1 text-xs w-full text-stone-900"
                />
              ) : (
                <span className="truncate">{userProfile.email}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-stone-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-stone-300 rounded px-2 py-1 text-xs w-full text-stone-900"
                />
              ) : (
                <span>{userProfile.phone}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-stone-300 rounded px-2 py-1 text-xs w-full text-stone-900"
                />
              ) : (
                <span>{userProfile.location}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role-Specific Profile Sections */}
      {student && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Bio & Objectives */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
              <h3 className="font-bold text-stone-900 text-sm mb-2 font-serif">Candidate Biography &amp; Focus</h3>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900"
                />
              ) : (
                <p className="text-stone-600 leading-relaxed">{student.bio}</p>
              )}
            </div>

            {/* Verified Skills */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-stone-900 text-sm font-serif">Verified Skills &amp; Competencies</h3>
                <button
                  onClick={() => onNavigate('Skill Assessment')}
                  className="text-emerald-700 hover:underline font-semibold"
                >
                  Take Assessment &rarr;
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {student.skills.map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-stone-200 bg-[#fbf9f4]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-stone-900">{s.name}</span>
                      <span className="font-bold text-emerald-800">{s.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-stone-500">
                      <span>{s.domain}</span>
                      {s.verified && (
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-3">
              <h3 className="font-bold text-stone-900 text-sm font-serif">Academic Registry</h3>
              <div className="space-y-2 text-stone-700">
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Roll Number:</span>
                  <span className="font-semibold text-stone-900">{student.rollNo}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Graduation Year:</span>
                  <span className="font-semibold text-stone-900">{student.graduationYear}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Cumulative CGPA:</span>
                  <span className="font-bold text-emerald-800">{student.cgpa} / 10.0</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Readiness Score:</span>
                  <span className="font-bold text-amber-800">{student.overallSkillScore} / 100</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-2">
              <h3 className="font-bold text-stone-900 text-sm font-serif">External Handles</h3>
              <a
                href={student.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-50 border border-stone-200 text-stone-800 font-medium"
              >
                <Github className="w-4 h-4 text-stone-700" />
                <span>GitHub Repositories</span>
              </a>
              <a
                href={student.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-50 border border-stone-200 text-stone-800 font-medium"
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
                <span>LinkedIn Profile</span>
              </a>
              <button
                onClick={() => onNavigate('Digital Portfolio')}
                className="w-full text-center py-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
              >
                Open Digital Portfolio &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {academia && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
              <h3 className="font-bold text-stone-900 text-sm mb-3 font-serif">Research &amp; Curriculum Domain</h3>
              <div className="flex flex-wrap gap-2">
                {academia.researchInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
              <h3 className="font-bold text-stone-900 text-sm mb-3 font-serif">Institutional Responsibilities</h3>
              <ul className="space-y-2 text-stone-600 list-disc pl-4">
                <li>Head of National Skill Curriculum Committee &amp; AICTE Alignment (SIH 26044)</li>
                <li>Digital Signing Authority for Student 6-Month Industry Internship NOC Requests</li>
                <li>Coordinator for Faculty Development Programs (FDP) with Industry Partners</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-3">
              <h3 className="font-bold text-stone-900 text-sm font-serif">Affiliation Details</h3>
              <div className="space-y-2 text-stone-700">
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">AICTE Institution Code:</span>
                  <span className="font-semibold text-stone-900">{academia.aicteCode}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Employee ID:</span>
                  <span className="font-semibold text-stone-900">{academia.employeeId}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Students Supervised:</span>
                  <span className="font-bold text-amber-800">{academia.totalStudentsMonitored} Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {industry && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
              <h3 className="font-bold text-stone-900 text-sm mb-2 font-serif">Enterprise Overview</h3>
              <p className="text-stone-600 leading-relaxed">
                Bharat Cloud &amp; AI Innovations is an enterprise deep-tech partner partnering with premier universities across India to conduct verified internship drives, sponsor live R&amp;D problems, and recruit top engineering talent.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs">
              <h3 className="font-bold text-stone-900 text-sm mb-3 font-serif">Active Campus Initiatives</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">4 Active Live Projects</div>
                  <p className="text-stone-500 text-[11px] mt-0.5">Indic speech transcription &amp; distributed cache R&amp;D</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">35 Placement Offers Rolled</div>
                  <p className="text-stone-500 text-[11px] mt-0.5">Average CTC ₹14.5 LPA for 2026-2027 batch</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-xs space-y-3">
              <h3 className="font-bold text-stone-900 text-sm font-serif">Corporate Verification</h3>
              <div className="space-y-2 text-stone-700">
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Corporate CIN:</span>
                  <span className="font-semibold text-stone-900">{industry.cinOrId}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Sector:</span>
                  <span className="font-semibold text-stone-900">{industry.sector}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Headquarters:</span>
                  <span className="font-semibold text-stone-900">{industry.headquarters}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
