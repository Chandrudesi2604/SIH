import React, { useState } from 'react';
import { UserRole, PortalDocument, SkillAssessmentResult, Internship, JobPosting, CandidateSearchItem, WeeklyProgressLog, ProjectShowcase, TrainingProgram, LiveProject } from './types';
import {
  initialStudentProfile,
  initialAcademiaProfile,
  initialIndustryProfile,
  initialSkillCategories,
  initialCareerPaths,
  initialLearningRecommendations,
  initialProjectShowcases,
  initialInternships,
  initialInternshipApplications,
  initialWeeklyProgressLogs,
  initialJobPostings,
  initialPlacementApplications,
  initialDepartmentAnalytics,
  initialIndustrySkillDemands,
  initialTrainingPrograms,
  initialFdpPrograms,
  initialCandidateSearchItems,
  initialLiveProjects,
  initialNotifications,
  initialDocuments,
  sampleSkillQuestions,
} from './mockData';

// Common Components
import { Navbar } from './components/common/Navbar';
import { LandingPage } from './components/common/LandingPage';
import { RoleSelectionLogin } from './components/common/RoleSelectionLogin';
import { ProfileView } from './components/common/ProfileView';
import { NotificationsView } from './components/common/NotificationsView';
import { DocumentsView } from './components/common/DocumentsView';

// Student Components
import { StudentDashboard } from './components/student/StudentDashboard';
import { SkillAssessment } from './components/student/SkillAssessment';
import { MySkillProfile } from './components/student/MySkillProfile';
import { SkillGapAnalysis } from './components/student/SkillGapAnalysis';
import { LearningRecommendations } from './components/student/LearningRecommendations';
import { CareerGuidance } from './components/student/CareerGuidance';
import { DigitalPortfolio } from './components/student/DigitalPortfolio';
import { InternshipPortal } from './components/student/InternshipPortal';
import { MyApplications } from './components/student/MyApplications';
import { InternshipProgressMentorFeedback } from './components/student/InternshipProgressMentorFeedback';
import { JobsPortal } from './components/student/JobsPortal';
import { PlacementApplications } from './components/student/PlacementApplications';

// Academia Components
import { AcademiaDashboard } from './components/academia/AcademiaDashboard';
import { StudentSkillAnalytics } from './components/academia/StudentSkillAnalytics';
import { IndustrySkillDemand } from './components/academia/IndustrySkillDemand';
import { TrainingPrograms } from './components/academia/TrainingPrograms';
import { InternshipFdpManagement } from './components/academia/InternshipFdpManagement';
import { PlacementAnalytics } from './components/academia/PlacementAnalytics';

// Industry Components
import { IndustryDashboard } from './components/industry/IndustryDashboard';
import { PostInternship } from './components/industry/PostInternship';
import { PostJob } from './components/industry/PostJob';
import { CandidateSearch } from './components/industry/CandidateSearch';
import { CandidateProfileModal } from './components/industry/CandidateProfileModal';
import { ShortlistingRecruitment } from './components/industry/ShortlistingRecruitment';
import { MentorshipLiveProjects } from './components/industry/MentorshipLiveProjects';

import { ShieldCheck, GraduationCap, Building, ExternalLink } from 'lucide-react';

export default function App() {
  // Core Navigation & Auth state
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentPage, setCurrentPage] = useState<string>('Landing Page');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Entities & Database state
  const [studentProfile, setStudentProfile] = useState(initialStudentProfile);
  const [academiaProfile, setAcademiaProfile] = useState(initialAcademiaProfile);
  const [industryProfile, setIndustryProfile] = useState(initialIndustryProfile);

  const [skillCategories, setSkillCategories] = useState(initialSkillCategories);
  const [careerPaths] = useState(initialCareerPaths);
  const [learningRecommendations] = useState(initialLearningRecommendations);
  const [projectShowcases, setProjectShowcases] = useState(initialProjectShowcases);
  const [internships, setInternships] = useState(initialInternships);
  const [internshipApplications, setInternshipApplications] = useState(initialInternshipApplications);
  const [weeklyProgressLogs, setWeeklyProgressLogs] = useState(initialWeeklyProgressLogs);
  const [jobPostings, setJobPostings] = useState(initialJobPostings);
  const [placementApplications] = useState(initialPlacementApplications);
  const [deptAnalytics] = useState(initialDepartmentAnalytics);
  const [industryDemands] = useState(initialIndustrySkillDemands);
  const [trainingPrograms, setTrainingPrograms] = useState(initialTrainingPrograms);
  const [fdpPrograms] = useState(initialFdpPrograms);
  const [candidates] = useState(initialCandidateSearchItems);
  const [liveProjects, setLiveProjects] = useState(initialLiveProjects);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [documents, setDocuments] = useState<PortalDocument[]>(initialDocuments);

  // Selection states for detail modals
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateSearchItem | null>(null);
  const [shortlistedCandidateIds, setShortlistedCandidateIds] = useState<string[]>(['cand-1', 'cand-2']);

  // Applied IDs for 1-click state sync
  const appliedInternshipIds = internshipApplications.map((a) => a.internshipId);
  const appliedJobIds = placementApplications.map((p) => p.jobId);

  // Handler: Role Login Selection
  const handleSelectRoleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    if (role === 'student') setCurrentPage('Student Dashboard');
    else if (role === 'academia') setCurrentPage('Academia Dashboard');
    else if (role === 'industry') setCurrentPage('Industry Dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('Landing Page');
  };

  // Handler: Student applies to internship
  const handleApplyInternship = (internship: Internship) => {
    if (appliedInternshipIds.includes(internship.id)) return;
    const newApp = {
      id: `app-${Date.now()}`,
      internshipId: internship.id,
      internshipTitle: internship.title,
      company: internship.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Under Review' as const,
      stipend: internship.stipend,
      mode: internship.type,
      notes: 'Application submitted through AICTE verified channel. Under review by engineering team.',
    };
    setInternshipApplications([newApp, ...internshipApplications]);
  };

  // Handler: Student applies to job
  const handleApplyJob = (job: JobPosting) => {
    alert(`Application successfully submitted for ${job.title} at ${job.company}. Your verified SIH 26044 academic dossier has been transmitted to HR.`);
  };

  // Handler: Student completes skill test
  const handleAssessmentCompleted = (result: SkillAssessmentResult) => {
    // Add verified badge to student skill
    setStudentProfile((prev) => {
      const updatedSkills = prev.skills.map((s) => {
        if (s.domain.toLowerCase().includes(result.domain.toLowerCase()) || s.name.toLowerCase().includes(result.domain.toLowerCase())) {
          return { ...s, verified: true, level: Math.max(s.level, result.percentage) };
        }
        return s;
      });
      return {
        ...prev,
        skills: updatedSkills,
        overallSkillScore: Math.min(96, Math.max(prev.overallSkillScore, result.percentage)),
      };
    });

    // Also add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `Skill Assessment Badge Awarded: ${result.domain}`,
      message: `You scored ${result.percentage}% and earned the ${result.badgeLevel} badge. Your profile is updated.`,
      timestamp: 'Just now',
      read: false,
      type: 'success' as const,
      link: 'My Skill Profile',
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Handler: Student logs weekly progress
  const handleSubmitWeeklyLog = (log: WeeklyProgressLog) => {
    setWeeklyProgressLogs([...weeklyProgressLogs, log]);
  };

  // Handler: Add project showcase
  const handleAddProject = (project: ProjectShowcase) => {
    setProjectShowcases([project, ...projectShowcases]);
  };

  // Handler: Add document
  const handleUploadDocument = (doc: PortalDocument) => {
    setDocuments([doc, ...documents]);
  };

  // Handler: Industry posts internship
  const handlePostInternship = (internship: Internship) => {
    setInternships([internship, ...internships]);
  };

  // Handler: Industry posts job
  const handlePostJob = (job: JobPosting) => {
    setJobPostings([job, ...jobPostings]);
  };

  // Handler: Shortlist candidate
  const handleShortlistCandidate = (id: string) => {
    if (!shortlistedCandidateIds.includes(id)) {
      setShortlistedCandidateIds([...shortlistedCandidateIds, id]);
    }
  };

  // Router View Switcher
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Landing Page':
        return (
          <LandingPage
            onNavigate={(page) => setCurrentPage(page)}
            onSelectRole={handleSelectRoleLogin}
          />
        );

      case 'Login / Role Selection':
        return (
          <RoleSelectionLogin
            currentRole={currentRole}
            onSelectRole={handleSelectRoleLogin}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Profile':
        return (
          <ProfileView
            role={currentRole}
            student={studentProfile}
            academia={academiaProfile}
            industry={industryProfile}
            onUpdateStudent={setStudentProfile}
            onUpdateAcademia={setAcademiaProfile}
            onUpdateIndustry={setIndustryProfile}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Notifications':
        return (
          <NotificationsView
            notifications={notifications}
            onMarkAllAsRead={() =>
              setNotifications(notifications.map((n) => ({ ...n, read: true })))
            }
            onClearNotification={(id) =>
              setNotifications(notifications.filter((n) => n.id !== id))
            }
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Documents':
        return (
          <DocumentsView
            documents={documents}
            onUploadDocument={handleUploadDocument}
          />
        );

      // Student Pages
      case 'Student Dashboard':
        return (
          <StudentDashboard
            student={studentProfile}
            skills={skillCategories}
            internships={internships}
            applications={internshipApplications}
            placementApps={placementApplications}
            weeklyLogs={weeklyProgressLogs}
            onNavigate={(page) => setCurrentPage(page)}
            onSelectInternship={(internship) => {
              setSelectedInternship(internship);
              setCurrentPage('Internship Portal');
            }}
          />
        );

      case 'Skill Assessment':
        return (
          <SkillAssessment
            questionsByDomain={sampleSkillQuestions}
            onAssessmentCompleted={handleAssessmentCompleted}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'My Skill Profile':
        return (
          <MySkillProfile
            student={studentProfile}
            onNavigate={(page) => setCurrentPage(page)}
            onAddSkill={(newSkill) => {
              setStudentProfile({
                ...studentProfile,
                skills: [...studentProfile.skills, newSkill],
              });
            }}
          />
        );

      case 'Skill Gap Analysis':
        return (
          <SkillGapAnalysis
            careerPaths={careerPaths}
            skillCategories={skillCategories}
            student={studentProfile}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Learning Recommendations':
        return (
          <LearningRecommendations
            recommendations={learningRecommendations}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Career Guidance':
        return (
          <CareerGuidance
            careerPaths={careerPaths}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Digital Portfolio':
        return (
          <DigitalPortfolio
            student={studentProfile}
            projects={projectShowcases}
            onAddProject={handleAddProject}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Internship Portal':
      case 'Internship Details':
        return (
          <InternshipPortal
            internships={internships}
            appliedInternshipIds={appliedInternshipIds}
            onApply={handleApplyInternship}
            selectedInternship={selectedInternship}
            onSelectInternship={setSelectedInternship}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'My Applications':
        return (
          <MyApplications
            applications={internshipApplications}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Internship Progress & Mentor Feedback':
        return (
          <InternshipProgressMentorFeedback
            logs={weeklyProgressLogs}
            onSubmitWeeklyLog={handleSubmitWeeklyLog}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Jobs / Placement Opportunities':
      case 'Job Details':
        return (
          <JobsPortal
            jobs={jobPostings}
            appliedJobIds={appliedJobIds}
            onApplyJob={handleApplyJob}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Placement Applications':
        return (
          <PlacementApplications
            placementApplications={placementApplications}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      // Academia Pages
      case 'Academia Dashboard':
        return (
          <AcademiaDashboard
            institution={academiaProfile}
            deptAnalytics={deptAnalytics}
            industryDemands={industryDemands}
            trainingPrograms={trainingPrograms}
            fdpPrograms={fdpPrograms}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Student Skill Analytics':
        return (
          <StudentSkillAnalytics
            deptAnalytics={deptAnalytics}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Industry Skill Demand':
        return (
          <IndustrySkillDemand
            demands={industryDemands}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Training Programs':
        return (
          <TrainingPrograms
            programs={trainingPrograms}
            onAddProgram={(p) => setTrainingPrograms([p, ...trainingPrograms])}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Internship / FDP Management':
        return (
          <InternshipFdpManagement
            fdpPrograms={fdpPrograms}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Placement Analytics':
        return (
          <PlacementAnalytics
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      // Industry Pages
      case 'Industry Dashboard':
        return (
          <IndustryDashboard
            industry={industryProfile}
            candidates={candidates}
            liveProjects={liveProjects}
            internships={internships}
            jobs={jobPostings}
            onNavigate={(page) => setCurrentPage(page)}
            onSelectCandidate={(c) => setSelectedCandidate(c)}
          />
        );

      case 'Post Internship':
        return (
          <PostInternship
            onPostInternship={handlePostInternship}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Post Job':
        return (
          <PostJob
            onPostJob={handlePostJob}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Candidate Search':
      case 'Candidate Profile':
        return (
          <CandidateSearch
            candidates={candidates}
            onSelectCandidate={(c) => setSelectedCandidate(c)}
            onShortlistCandidate={handleShortlistCandidate}
            shortlistedCandidateIds={shortlistedCandidateIds}
          />
        );

      case 'Shortlisting / Recruitment':
        return (
          <ShortlistingRecruitment
            candidates={candidates}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      case 'Mentorship & Live Projects':
        return (
          <MentorshipLiveProjects
            liveProjects={liveProjects}
            onAddProject={(p) => setLiveProjects([p, ...liveProjects])}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );

      default:
        return (
          <LandingPage
            onNavigate={(page) => setCurrentPage(page)}
            onSelectRole={handleSelectRoleLogin}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1113] text-gray-200 font-sans selection:bg-[#C4F135] selection:text-black">
      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onRoleChange={setCurrentRole}
        userProfile={
          currentRole === 'student'
            ? studentProfile
            : currentRole === 'academia'
            ? academiaProfile
            : industryProfile
        }
        notifications={notifications}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenLogin={() => setCurrentPage('Login / Role Selection')}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-16">
        {renderCurrentPage()}
      </main>

      {/* Candidate Profile Details Modal */}
      {selectedCandidate && (
        <CandidateProfileModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onShortlist={handleShortlistCandidate}
          isShortlisted={shortlistedCandidateIds.includes(selectedCandidate.id)}
        />
      )}

      {/* Institutional Platform Footer - High Density Theme */}
      <footer className="bg-[#16181D] text-gray-300 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
            {/* Column 1: Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C4F135] text-black flex items-center justify-center font-bold text-sm shadow-sm">
                  A
                </div>
                <span className="font-bold text-lg tracking-tight text-white uppercase">
                  academia
                </span>
                <span className="bg-black/40 text-[#C4F135] font-mono text-[10px] px-2 py-0.5 rounded border border-gray-800">
                  SIH 26044
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                National collaborative portal bridging Academia, Industry, and Undergraduates under the National Higher Education Qualifications Framework.
              </p>
              <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-green-400">System Online</span> • AICTE &amp; MoE Recognized
              </div>
            </div>

            {/* Column 2: Student Quick Links */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#C4F135] uppercase tracking-wider text-[11px]">
                Student Pathways
              </h4>
              <ul className="space-y-1.5 text-gray-400">
                <li>
                  <button onClick={() => { setCurrentRole('student'); setCurrentPage('Skill Assessment'); }} className="hover:text-white cursor-pointer transition-colors">
                    Skill Assessment &amp; Tests
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('student'); setCurrentPage('Skill Gap Analysis'); }} className="hover:text-white cursor-pointer transition-colors">
                    Skill Gap Analysis
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('student'); setCurrentPage('Internship Portal'); }} className="hover:text-white cursor-pointer transition-colors">
                    AICTE Verified Internships
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('student'); setCurrentPage('Jobs / Placement Opportunities'); }} className="hover:text-white cursor-pointer transition-colors">
                    Campus Placement Drives
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('student'); setCurrentPage('Digital Portfolio'); }} className="hover:text-white cursor-pointer transition-colors">
                    Digital Dossier &amp; Resume
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Academia & Institutional */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#C4F135] uppercase tracking-wider text-[11px]">
                Academia &amp; Faculty
              </h4>
              <ul className="space-y-1.5 text-gray-400">
                <li>
                  <button onClick={() => { setCurrentRole('academia'); setCurrentPage('Student Skill Analytics'); }} className="hover:text-white cursor-pointer transition-colors">
                    Student Skill Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('academia'); setCurrentPage('Industry Skill Demand'); }} className="hover:text-white cursor-pointer transition-colors">
                    Industry Skill Demand Matrix
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('academia'); setCurrentPage('Internship / FDP Management'); }} className="hover:text-white cursor-pointer transition-colors">
                    NOC &amp; FDP Approvals
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('academia'); setCurrentPage('Placement Analytics'); }} className="hover:text-white cursor-pointer transition-colors">
                    T&amp;P Placement Analytics
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Industry & Employers */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#C4F135] uppercase tracking-wider text-[11px]">
                Corporate Partners
              </h4>
              <ul className="space-y-1.5 text-gray-400">
                <li>
                  <button onClick={() => { setCurrentRole('industry'); setCurrentPage('Candidate Search'); }} className="hover:text-white cursor-pointer transition-colors">
                    Candidate Search Radar
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('industry'); setCurrentPage('Post Internship'); }} className="hover:text-white cursor-pointer transition-colors">
                    Post Industry Internship
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('industry'); setCurrentPage('Post Job'); }} className="hover:text-white cursor-pointer transition-colors">
                    Post Full-Time Placement
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentRole('industry'); setCurrentPage('Mentorship & Live Projects'); }} className="hover:text-white cursor-pointer transition-colors">
                    Live Projects &amp; Mentorship
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
            <div>
              Smart India Hackathon 2026 • Problem Statement ID: <strong className="text-gray-300">26044</strong> • Portal for Academia
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-green-400">● Live SIH 2026 Grid</span>
              <span>•</span>
              <span>DigiLocker Integrated</span>
              <span>•</span>
              <span>NHEQF Level 8</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

