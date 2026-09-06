import React, { useState } from 'react';
import { FdpProgram } from '../../types';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileCheck,
  Calendar,
  Building,
  Award,
  ExternalLink,
  Plus,
} from 'lucide-react';

interface InternshipFdpManagementProps {
  fdpPrograms: FdpProgram[];
  onNavigate: (page: string) => void;
}

interface StudentNocRequest {
  id: string;
  studentName: string;
  rollNo: string;
  department: string;
  company: string;
  internshipRole: string;
  stipend: string;
  duration: string;
  status: 'Pending Dean Signoff' | 'Approved & Verified' | 'Rejected';
  cgpa: number;
}

export const InternshipFdpManagement: React.FC<InternshipFdpManagementProps> = ({
  fdpPrograms,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'noc' | 'fdp'>('noc');

  const [nocRequests, setNocRequests] = useState<StudentNocRequest[]>([
    {
      id: 'noc-101',
      studentName: 'Aarav Sharma',
      rollNo: 'NIT-CS-22-044',
      department: 'Computer Science & Engineering',
      company: 'Bharat Cloud & AI Innovations Ltd.',
      internshipRole: 'Cloud Systems Intern',
      stipend: '₹45,000 / month',
      duration: '6 Months (Semester 7)',
      status: 'Pending Dean Signoff',
      cgpa: 9.12,
    },
    {
      id: 'noc-102',
      studentName: 'Priya Iyer',
      rollNo: 'NIT-IT-22-019',
      department: 'Information Technology',
      company: 'Tata AI Research Labs',
      internshipRole: 'Generative AI & LLM Systems Intern',
      stipend: '₹55,000 / month',
      duration: '6 Months',
      status: 'Approved & Verified',
      cgpa: 8.84,
    },
    {
      id: 'noc-103',
      studentName: 'Rohan Deshmukh',
      rollNo: 'NIT-EC-22-088',
      department: 'Electronics & Communication',
      company: 'Cisco Systems India',
      internshipRole: 'Core Network Engineer',
      stipend: '₹40,000 / month',
      duration: '4 Months',
      status: 'Pending Dean Signoff',
      cgpa: 8.42,
    },
  ]);

  const handleApproveNoc = (id: string) => {
    setNocRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Approved & Verified' } : r))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Internship NOC &amp; Faculty Development (FDP)
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              AICTE Regulatory Office
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Official dean portal for digital student internship approvals and continuous faculty upskilling programs.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-300 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('noc')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'noc'
                ? 'bg-[#0c2f21] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Student NOC Clearances ({nocRequests.filter((r) => r.status === 'Pending Dean Signoff').length})
          </button>
          <button
            onClick={() => setActiveTab('fdp')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'fdp'
                ? 'bg-[#0c2f21] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Faculty FDP Programs ({fdpPrograms.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Student NOC Clearances */}
      {activeTab === 'noc' && (
        <div className="space-y-4">
          <div className="bg-[#fbf9f4] p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Digitally approved NOCs are instantly pushed to AICTE DigiLocker and the sponsoring employer node.
              </span>
            </div>
            <span className="font-bold text-stone-900 shrink-0">
              Min CGPA Cutoff: 7.50
            </span>
          </div>

          <div className="space-y-4">
            {nocRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {req.department}
                    </span>
                    <span className="text-xs text-stone-500">Roll: {req.rollNo}</span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 font-serif">
                    {req.studentName} — {req.internshipRole}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                    <span>
                      Company: <strong className="text-stone-900">{req.company}</strong>
                    </span>
                    <span>•</span>
                    <span>Stipend: <strong className="text-amber-800">{req.stipend}</strong></span>
                    <span>•</span>
                    <span>Duration: {req.duration}</span>
                    <span>•</span>
                    <span>CGPA: <strong>{req.cgpa} / 10.0</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
                  {req.status === 'Approved & Verified' ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      NOC Digitally Signed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApproveNoc(req.id)}
                      className="px-4 py-2 rounded-xl bg-[#0c2f21] hover:bg-[#14532d] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <FileCheck className="w-4 h-4 text-amber-400" />
                      Dean Sign &amp; Approve
                    </button>
                  )}

                  <button
                    onClick={() => alert(`Reviewing official corporate offer letter & credit rubric for ${req.studentName}`)}
                    className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 cursor-pointer"
                  >
                    View Offer Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Faculty Development Programs (FDP) */}
      {activeTab === 'fdp' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fdpPrograms.map((fdp) => (
              <div
                key={fdp.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      Sponsor: {fdp.sponsor}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">{fdp.duration}</span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 font-serif leading-tight">
                    {fdp.title}
                  </h3>

                  <div className="mt-4 p-3 bg-[#fbf9f4] rounded-xl border border-stone-200 grid grid-cols-2 gap-2 text-xs text-stone-600">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Schedule</span>
                      <span className="font-semibold text-stone-800">{fdp.startDate}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[11px] block">Faculty Enrolled</span>
                      <span className="font-semibold text-emerald-800">
                        {fdp.facultyEnrolled} Registered
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 text-[11px]">AICTE QIP Accreditation</span>
                  <button
                    onClick={() => alert(`Registering department faculty for: ${fdp.title}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold cursor-pointer"
                  >
                    Nominate Faculty
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
