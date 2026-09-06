import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Bell,
  FileText,
  User,
  LogOut,
  ChevronDown,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { UserRole, CurrentUserProfile, AppNotification } from '../../types';

interface NavbarProps {
  currentRole: UserRole;
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: UserRole) => void;
  userProfile: CurrentUserProfile;
  notifications: AppNotification[];
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  userProfile,
  notifications,
  isLoggedIn,
  onLogout,
  onOpenLogin,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getRoleBadge = () => {
    switch (currentRole) {
      case 'student':
        return { label: 'Student / Scholar', icon: GraduationCap, color: 'bg-[#212429] text-white border-gray-700 hover:border-[#C4F135]' };
      case 'academia':
        return { label: 'Academician / Dean', icon: Building2, color: 'bg-[#212429] text-white border-gray-700 hover:border-[#C4F135]' };
      case 'industry':
        return { label: 'Industry Employer', icon: Briefcase, color: 'bg-[#212429] text-white border-gray-700 hover:border-[#C4F135]' };
    }
  };

  const roleInfo = getRoleBadge();
  const RoleIcon = roleInfo.icon;

  const studentPages = [
    'Student Dashboard',
    'Skill Assessment',
    'My Skill Profile',
    'Skill Gap Analysis',
    'Learning Recommendations',
    'Career Guidance',
    'Digital Portfolio',
    'Internship Portal',
    'My Applications',
    'Internship Progress & Mentor Feedback',
    'Jobs / Placement Opportunities',
    'Placement Applications',
  ];

  const academiaPages = [
    'Academia Dashboard',
    'Student Skill Analytics',
    'Industry Skill Demand',
    'Training Programs',
    'Internship / FDP Management',
    'Placement Analytics',
  ];

  const industryPages = [
    'Industry Dashboard',
    'Post Internship',
    'Post Job',
    'Candidate Search',
    'Shortlisting / Recruitment',
    'Mentorship & Live Projects',
  ];

  const commonPages = [
    'Landing Page',
    'Login / Role Selection',
    'Profile',
    'Notifications',
    'Documents',
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#16181D] text-gray-200 border-b border-gray-800 shadow-md">
      {/* Top National Portal Banner - High Density Status Ribbon */}
      <div className="bg-[#0F1113] px-4 py-1.5 text-xs text-gray-400 flex flex-wrap items-center justify-between border-b border-gray-800 font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#C4F135]/15 text-[#C4F135] px-2 py-0.5 rounded text-[10px] font-bold border border-[#C4F135]/30 uppercase tracking-wider font-mono">
            <Sparkles className="w-3 h-3 text-[#C4F135]" />
            SIH 2026 • 26044
          </span>
          <span className="hidden sm:inline text-gray-400 text-[11px]">
            National Higher Education Qualifications Framework (NHEQF) Skill Grid
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-medium italic">System Online</span>
          </div>
          <span className="text-gray-700">|</span>
          <span className="flex items-center gap-1 text-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> AICTE &amp; MoE Verified
          </span>
          <span className="text-gray-700">|</span>
          <button
            onClick={() => onNavigate('Landing Page')}
            className="hover:text-[#C4F135] transition-colors cursor-pointer text-gray-300"
          >
            Portal Overview
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('Landing Page')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-[#C4F135] flex items-center justify-center text-black font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
                A
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-white uppercase font-sans">
                    Academia
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/50 text-[#C4F135] px-1.5 py-0.5 rounded border border-gray-800">
                    26044
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 tracking-tight -mt-0.5 font-mono">
                  National Skill &amp; Placement Grid
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Shortcuts */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => {
                if (currentRole === 'student') onNavigate('Student Dashboard');
                else if (currentRole === 'academia') onNavigate('Academia Dashboard');
                else onNavigate('Industry Dashboard');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage.includes('Dashboard')
                  ? 'bg-[#C4F135] text-black shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-[#212429]'
              }`}
            >
              Dashboard
            </button>

            {currentRole === 'student' && (
              <>
                <button
                  onClick={() => onNavigate('Skill Assessment')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Skill Assessment'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Skill Assessment
                </button>
                <button
                  onClick={() => onNavigate('Skill Gap Analysis')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Skill Gap Analysis'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Gap Analysis
                </button>
                <button
                  onClick={() => onNavigate('Internship Portal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Internship Portal'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Internships
                </button>
                <button
                  onClick={() => onNavigate('Jobs / Placement Opportunities')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Jobs / Placement Opportunities'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Placements
                </button>
              </>
            )}

            {currentRole === 'academia' && (
              <>
                <button
                  onClick={() => onNavigate('Student Skill Analytics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Student Skill Analytics'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Skill Analytics
                </button>
                <button
                  onClick={() => onNavigate('Industry Skill Demand')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Industry Skill Demand'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Industry Demand
                </button>
                <button
                  onClick={() => onNavigate('Training Programs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Training Programs'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Training &amp; FDP
                </button>
                <button
                  onClick={() => onNavigate('Placement Analytics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Placement Analytics'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Placement Stats
                </button>
              </>
            )}

            {currentRole === 'industry' && (
              <>
                <button
                  onClick={() => onNavigate('Post Internship')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Post Internship'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Post Internship
                </button>
                <button
                  onClick={() => onNavigate('Candidate Search')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Candidate Search'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Candidate Search
                </button>
                <button
                  onClick={() => onNavigate('Shortlisting / Recruitment')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Shortlisting / Recruitment'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Hiring Pipeline
                </button>
                <button
                  onClick={() => onNavigate('Mentorship & Live Projects')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'Mentorship & Live Projects'
                      ? 'bg-[#C4F135] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#212429]'
                  }`}
                >
                  Live Projects
                </button>
              </>
            )}

            {/* Jump to Any Page Menu */}
            <div className="relative">
              <button
                onClick={() => setShowQuickNav(!showQuickNav)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#212429] border border-gray-800 text-[#C4F135] hover:bg-gray-800 transition-colors cursor-pointer"
                title="Explore all 24 SIH 26044 pages"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Pages</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showQuickNav && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-[#16181D] border border-gray-800 rounded-xl shadow-2xl p-2 z-50 text-xs max-h-[80vh] overflow-y-auto"
                  onMouseLeave={() => setShowQuickNav(false)}
                >
                  <div className="px-2 py-1 text-[11px] font-bold text-[#C4F135] uppercase tracking-wider border-b border-gray-800 mb-1 font-mono">
                    Student Pages (12)
                  </div>
                  {studentPages.map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        onRoleChange('student');
                        onNavigate(page);
                        setShowQuickNav(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#212429] transition-colors flex items-center justify-between cursor-pointer ${
                        currentPage === page ? 'bg-[#C4F135] text-black font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span className="truncate">{page}</span>
                      {currentPage === page && <CheckCircle2 className="w-3 h-3 text-black shrink-0" />}
                    </button>
                  ))}

                  <div className="px-2 py-1 text-[11px] font-bold text-[#C4F135] uppercase tracking-wider border-b border-gray-800 my-1 pt-2 font-mono">
                    Academia Pages (6)
                  </div>
                  {academiaPages.map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        onRoleChange('academia');
                        onNavigate(page);
                        setShowQuickNav(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#212429] transition-colors flex items-center justify-between cursor-pointer ${
                        currentPage === page ? 'bg-[#C4F135] text-black font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span className="truncate">{page}</span>
                      {currentPage === page && <CheckCircle2 className="w-3 h-3 text-black shrink-0" />}
                    </button>
                  ))}

                  <div className="px-2 py-1 text-[11px] font-bold text-[#C4F135] uppercase tracking-wider border-b border-gray-800 my-1 pt-2 font-mono">
                    Industry Pages (7)
                  </div>
                  {industryPages.map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        onRoleChange('industry');
                        onNavigate(page);
                        setShowQuickNav(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#212429] transition-colors flex items-center justify-between cursor-pointer ${
                        currentPage === page ? 'bg-[#C4F135] text-black font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span className="truncate">{page}</span>
                      {currentPage === page && <CheckCircle2 className="w-3 h-3 text-black shrink-0" />}
                    </button>
                  ))}

                  <div className="px-2 py-1 text-[11px] font-bold text-[#C4F135] uppercase tracking-wider border-b border-gray-800 my-1 pt-2 font-mono">
                    Common Pages (5)
                  </div>
                  {commonPages.map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        onNavigate(page);
                        setShowQuickNav(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#212429] transition-colors flex items-center justify-between cursor-pointer ${
                        currentPage === page ? 'bg-[#C4F135] text-black font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span className="truncate">{page}</span>
                      {currentPage === page && <CheckCircle2 className="w-3 h-3 text-black shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer shadow-sm ${roleInfo.color}`}
                title="Switch Active Persona / View"
              >
                <RoleIcon className="w-3.5 h-3.5 text-[#C4F135]" />
                <span className="hidden sm:inline">{roleInfo.label}</span>
                <ChevronDown className="w-3 h-3 opacity-75" />
              </button>

              {showRoleMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-[#16181D] border border-gray-800 rounded-xl shadow-2xl py-1 z-50 text-xs"
                  onMouseLeave={() => setShowRoleMenu(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-[#C4F135] uppercase tracking-wider border-b border-gray-800">
                    Switch Active Role
                  </div>
                  <button
                    onClick={() => {
                      onRoleChange('student');
                      onNavigate('Student Dashboard');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#212429] transition-colors cursor-pointer ${
                      currentRole === 'student' ? 'text-[#C4F135] font-bold bg-[#212429]' : 'text-gray-300'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-[#C4F135]" />
                    <div>
                      <div>Student / Scholar</div>
                      <div className="text-[10px] text-gray-500 font-normal">NIT Trichy B.Tech</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('academia');
                      onNavigate('Academia Dashboard');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#212429] transition-colors cursor-pointer ${
                      currentRole === 'academia' ? 'text-[#C4F135] font-bold bg-[#212429]' : 'text-gray-300'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#C4F135]" />
                    <div>
                      <div>Academician / Dean</div>
                      <div className="text-[10px] text-gray-500 font-normal">Dr. M. Sundaram</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('industry');
                      onNavigate('Industry Dashboard');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#212429] transition-colors cursor-pointer ${
                      currentRole === 'industry' ? 'text-[#C4F135] font-bold bg-[#212429]' : 'text-gray-300'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-[#C4F135]" />
                    <div>
                      <div>Industry Employer</div>
                      <div className="text-[10px] text-gray-500 font-normal">Bharat Cloud &amp; AI</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Documents Quick Link */}
            <button
              onClick={() => onNavigate('Documents')}
              className={`p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#212429] transition-colors relative cursor-pointer border border-transparent hover:border-gray-800 ${
                currentPage === 'Documents' ? 'bg-[#212429] text-[#C4F135] border-gray-800' : ''
              }`}
              title="Verified Academic &amp; Industry Documents"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Notifications Bell with Counter */}
            <button
              onClick={() => onNavigate('Notifications')}
              className={`p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#212429] transition-colors relative cursor-pointer border border-transparent hover:border-gray-800 ${
                currentPage === 'Notifications' ? 'bg-[#212429] text-[#C4F135] border-gray-800' : ''
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C4F135] text-black font-mono font-bold text-[10px] flex items-center justify-center rounded-full ring-2 ring-[#16181D]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Quick Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-[#C4F135] transition-all cursor-pointer"
                >
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-8 h-8 rounded-full object-cover border border-gray-700"
                  />
                </button>

                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-60 bg-[#16181D] border border-gray-800 rounded-xl shadow-2xl py-1 z-50 text-xs"
                    onMouseLeave={() => setShowUserMenu(false)}
                  >
                    <div className="px-3 py-2 border-b border-gray-800">
                      <p className="font-bold text-white truncate">{userProfile.name}</p>
                      <p className="text-[11px] text-gray-400 font-mono truncate">{userProfile.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('Profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-300 hover:bg-[#212429] hover:text-white cursor-pointer transition-colors"
                    >
                      <User className="w-4 h-4 text-[#C4F135]" />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('Login / Role Selection');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-300 hover:bg-[#212429] hover:text-white cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-[#C4F135]" />
                      <span>Switch Account / Login</span>
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-rose-400 hover:bg-[#212429] cursor-pointer border-t border-gray-800 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
