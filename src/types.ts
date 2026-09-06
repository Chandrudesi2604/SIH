export type UserRole = 'student' | 'academia' | 'industry';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  role: 'student';
  avatar: string;
  college: string;
  department: string;
  rollNo: string;
  graduationYear: number;
  cgpa: number;
  bio: string;
  phone: string;
  location: string;
  verifiedStatus: boolean;
  overallSkillScore: number;
  skills: Array<{ name: string; level: number; verified: boolean; domain: string }>;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface AcademiaProfile {
  id: string;
  name: string;
  email: string;
  role: 'academia';
  avatar: string;
  institutionName: string;
  department: string;
  designation: string;
  aicteCode: string;
  employeeId: string;
  phone: string;
  location: string;
  researchInterests: string[];
  totalStudentsMonitored: number;
}

export interface IndustryProfile {
  id: string;
  name: string;
  email: string;
  role: 'industry';
  avatar: string;
  companyName: string;
  sector: string;
  designation: string;
  cinOrId: string;
  phone: string;
  headquarters: string;
  website: string;
  activePostingsCount: number;
  location?: string;
  hrHead?: string;
  openInternships?: number;
  openJobs?: number;
  activeMentees?: number;
}

export type CurrentUserProfile = StudentProfile | AcademiaProfile | IndustryProfile;

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  currentProficiency: number; // 0 to 100
  industryDemand: number; // 0 to 100
  gap: number;
  verifiedCount: number;
}

export interface SkillAssessmentQuestion {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SkillAssessmentResult {
  domain: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeLevel: 'Novice' | 'Proficient' | 'Expert' | 'Master';
  feedback: string;
  recommendedTopics: string[];
}

export interface LearningRecommendation {
  id: string;
  title: string;
  provider: string; // e.g., 'NPTEL', 'SWAYAM', 'Coursera', 'AICTE Skill India'
  domain: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsEnrolled: number;
  badgeEarned: string;
  directUrl: string;
  syllabusCovered: string[];
}

export interface CareerPath {
  id: string;
  roleName: string;
  avgCtcRange: string;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  description: string;
  matchingScore: number; // 0-100%
  requiredSkills: string[];
  gapSkills: string[];
  milestones: Array<{
    title: string;
    description: string;
    completed: boolean;
  }>;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  description: string;
  domain: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  verifiedByMentor: boolean;
  mentorName?: string;
  completionDate: string;
  starsOrLikes: number;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  duration: string;
  stipend: string;
  openings: number;
  deadline: string;
  domain: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skillsRequired: string[];
  mentorAssigned?: string;
  postedDate?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  jobType: 'Full-time' | 'Graduate Engineer Trainee' | 'Specialist' | string;
  ctc: string;
  eligibilityCgpa: number;
  eligibleBranches?: string[];
  domain?: string;
  vacancies?: number;
  deadline: string;
  description: string;
  skillsRequired: string[];
  selectionProcess?: string[];
  responsibilities?: string[];
  requirements?: string[];
  openings?: number;
}
export type JobPosting = JobOpportunity;

export interface InternshipApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Extended' | 'Rejected';
  interviewDate?: string;
  stipend: string;
  mode: string;
  notes?: string;
}

export interface PlacementApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  ctc: string;
  appliedDate: string;
  currentRound: 'Application Screening' | 'Online Aptitude' | 'Technical Round 1' | 'Technical Round 2' | 'HR Discussion' | 'Selected';
  overallStatus: 'In Progress' | 'Selected' | 'On Hold';
  nextRoundDate?: string;
}

export interface WeeklyProgressLog {
  id: string;
  internshipTitle: string;
  company: string;
  weekNumber: number;
  period: string;
  tasksCompleted: string;
  deliverablesUrl: string;
  hoursWorked: number;
  mentorRating: number; // 1-5
  mentorFeedback: string;
  mentorName: string;
  status: 'Approved' | 'Pending Review' | 'Needs Revision';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'Placement' | 'Internship' | 'Assessment' | 'Academic' | 'System';
  isRead: boolean;
  actionTarget?: string;
}

export interface PortalDocument {
  id: string;
  title: string;
  category: 'Transcript' | 'NOC' | 'Internship Certificate' | 'MoU' | 'Identity Verification' | 'Resume' | string;
  uploadedDate: string;
  fileSize: string;
  verifiedBy: string;
  status: 'Verified' | 'Pending Review' | 'Draft';
  downloadUrl?: string;
}

export interface CandidateCandidate {
  id: string;
  name: string;
  avatar: string;
  college: string;
  department: string;
  graduationYear: number;
  cgpa: number;
  overallScore?: number;
  skillReadinessScore?: number;
  topSkills: string[];
  projectsCount: number;
  internshipsCompleted?: number;
  verifiedStatus?: boolean;
  preferredRole?: string;
  locationPreference?: string;
  status?: 'Available' | 'Interviewing' | 'Placed' | string;
}
export type CandidateSearchItem = CandidateCandidate;

export interface LiveProject {
  id: string;
  title: string;
  company?: string;
  mentorName?: string;
  domain?: string;
  duration: string;
  enrolledStudents?: number;
  maxSlots?: number;
  techStack?: string[];
  description: string;
  status: 'Active' | 'Upcoming' | 'Completed' | 'Open for Registration' | 'Active Mentorship' | 'Evaluation Stage' | string;
  progressPercentage?: number;
  nextDeliverableDate?: string;
  industryPartner?: string;
  facultyLead?: string;
  difficulty?: 'Intermediate' | 'Industry Grade' | 'R&D' | string;
  stipendOrGrant?: string;
  teamsEnrolled?: number;
  maxTeams?: number;
  expectedOutcomes?: string[];
  skillsRequired?: string[];
}
export type LiveMentorshipProject = LiveProject;

export interface TrainingProgram {
  id: string;
  title: string;
  partnerCompany?: string;
  conductedBy?: string;
  domain?: string;
  targetAudience?: 'Students' | 'Faculty (FDP)' | 'Joint' | string;
  mode?: 'Online' | 'Hybrid' | 'Campus Workshop' | string;
  startDate: string;
  duration: string;
  enrolledCount?: number;
  registeredCount?: number;
  maxCapacity?: number;
  capacity?: number;
  instructor?: string;
  creditsAwarded?: number;
  status?: string;
  aicteApproved?: boolean;
  curriculumKeyPoints?: string[];
}

export interface DepartmentAnalytics {
  department: string;
  studentCount: number;
  avgSkillScore: number;
  placementPct: number;
  topSkillGap: string;
  avgPackage: string;
}

export interface IndustrySkillDemandItem {
  id: string;
  skillName: string;
  domain: string;
  growthRate: string;
  openRequisitions: number;
  academicSupply: 'Critical Deficit' | 'Moderate Deficit' | 'Balanced' | string;
  topHiringCompanies: string[];
  avgPackage: string;
}

export interface FdpProgram {
  id: string;
  title: string;
  sponsor: string;
  duration: string;
  startDate: string;
  facultyEnrolled: number;
}

