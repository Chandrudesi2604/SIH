import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { UserRole } from '../../types';

interface RoleSelectionLoginProps {
  currentRole: UserRole;
  onLoginSuccess: (role: UserRole, credentials: { email: string; name?: string }) => void;
  onCancel?: () => void;
}

export const RoleSelectionLogin: React.FC<RoleSelectionLoginProps> = ({
  currentRole: initialRole,
  onLoginSuccess,
  onCancel,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('aarav.sharma@sih2026.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [instOrCompanyId, setInstOrCompanyId] = useState('2023CS26044');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('aarav.sharma@sih2026.edu.in');
      setInstOrCompanyId('2023CS26044 (NIT Trichy)');
    } else if (role === 'academia') {
      setEmail('m.sundaram@nitt.edu');
      setInstOrCompanyId('NITT-FAC-4891 (Dean)');
    } else {
      setEmail('vikram.sengupta@bharattech.in');
      setInstOrCompanyId('CIN-U72900KA2018PTC (Bharat Cloud)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole, {
      email,
      name:
        selectedRole === 'student'
          ? 'Aarav Sharma'
          : selectedRole === 'academia'
          ? 'Dr. Meenakshi Sundaram'
          : 'Vikramaditya Sengupta',
    });
  };

  return (
    <div className="min-h-screen bg-[#0F1113] text-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#16181D] text-[#C4F135] shadow-md mb-4 border border-gray-800">
          <GraduationCap className="w-8 h-8 text-[#C4F135]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
          Sign In to Academia
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400 font-mono">
          Smart India Hackathon 2026 • Unified Portal (Problem 26044)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-[#16181D] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-gray-800">
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#0F1113] rounded-xl mb-6 border border-gray-800">
            <button
              type="button"
              onClick={() => handleRoleTabChange('student')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-[#C4F135] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('academia')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedRole === 'academia'
                  ? 'bg-[#C4F135] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Academia</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('industry')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedRole === 'industry'
                  ? 'bg-[#C4F135] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Industry</span>
            </button>
          </div>

          {/* Quick Demo Pre-Fill Badge */}
          <div className="mb-6 p-3 bg-[#C4F135]/10 rounded-xl border border-[#C4F135]/30 flex items-center justify-between text-xs text-[#C4F135]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C4F135] shrink-0" />
              <span>
                <strong>Quick Demo:</strong> Credentials auto-loaded for{' '}
                <strong>
                  {selectedRole === 'student'
                    ? 'Student Aarav Sharma'
                    : selectedRole === 'academia'
                    ? 'Dean Dr. Meenakshi'
                    : 'Director Vikramaditya'}
                </strong>
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C4F135] text-black px-2 py-0.5 rounded">
              Ready
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Email Address */}
            <div>
              <label className="block font-mono text-gray-400 mb-1 text-xs uppercase tracking-wider">
                {selectedRole === 'student'
                  ? 'Student Institutional Email'
                  : selectedRole === 'academia'
                  ? 'University Faculty Email'
                  : 'Corporate Work Email'}
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-9 pr-3 py-2 border border-gray-800 rounded-lg focus:ring-1 focus:ring-[#C4F135] focus:border-[#C4F135] text-white bg-[#0F1113]"
                  placeholder="user@sih2026.edu.in"
                />
              </div>
            </div>

            {/* Institution Code or Roll Number */}
            <div>
              <label className="block font-mono text-gray-400 mb-1 text-xs uppercase tracking-wider">
                {selectedRole === 'student'
                  ? 'University Roll No / PRN'
                  : selectedRole === 'academia'
                  ? 'Employee ID / AICTE Faculty ID'
                  : 'Company CIN / Recruiter ID'}
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={instOrCompanyId}
                  onChange={(e) => setInstOrCompanyId(e.target.value)}
                  required
                  className="block w-full pl-9 pr-3 py-2 border border-gray-800 rounded-lg focus:ring-1 focus:ring-[#C4F135] focus:border-[#C4F135] text-white bg-[#0F1113]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-gray-400 mb-1 text-xs uppercase tracking-wider">
                Portal Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-9 pr-10 py-2 border border-gray-800 rounded-lg focus:ring-1 focus:ring-[#C4F135] focus:border-[#C4F135] text-white bg-[#0F1113]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#C4F135] focus:ring-[#C4F135] accent-[#C4F135]"
                />
                <span>Remember this workstation</span>
              </label>
              <span className="text-gray-500 font-mono text-xs">Sandbox Mode</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C4F135] hover:bg-[#b5e02c] text-black font-bold shadow-md hover:shadow-lg transition-all cursor-pointer mt-4"
            >
              <span>
                Enter {selectedRole === 'student' ? 'Student' : selectedRole === 'academia' ? 'Academia' : 'Industry'} Dashboard
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Dummy Switcher Explanatory Note */}
          <div className="mt-6 pt-5 border-t border-gray-800 text-center">
            <div className="inline-flex items-center gap-1.5 text-gray-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-[#C4F135]" />
              <span>SIH 2026 Academic Sandbox Authentication</span>
            </div>
            <div className="mt-3 flex justify-center gap-3 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleRoleTabChange('student')}
                className="text-gray-400 hover:text-[#C4F135] underline cursor-pointer"
              >
                1-Click Student Login
              </button>
              <span className="text-gray-600">•</span>
              <button
                type="button"
                onClick={() => handleRoleTabChange('academia')}
                className="text-gray-400 hover:text-[#C4F135] underline cursor-pointer"
              >
                1-Click Academia Login
              </button>
              <span className="text-gray-600">•</span>
              <button
                type="button"
                onClick={() => handleRoleTabChange('industry')}
                className="text-gray-400 hover:text-[#C4F135] underline cursor-pointer"
              >
                1-Click Industry Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
