import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Compass, ShieldCheck, ArrowRight, GraduationCap, UserCheck, KeyRound, Mail, Check, BookOpen, UserCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { STUDENT_DEMO_ACCOUNTS, FACULTY_DEMO_ACCOUNT } from '../../services/authService';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  // Infer initial role from redirect target if applicable
  const intendedPath = location.state?.from?.pathname || '';
  const initialRole = intendedPath.startsWith('/faculty') ? 'faculty' : 'student';

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Student Mode and Faculty Mode only determine the selected user role
  const handleRoleSelect = (newRole) => {
    setRole(newRole);
    // Clear credentials when switching roles
    setEmail('');
    setPassword('');
  };

  const handleSelectStudent = (studentAccount) => {
    setEmail(studentAccount.email);
    setPassword(studentAccount.password);
  };

  const handleSelectFaculty = () => {
    setEmail(FACULTY_DEMO_ACCOUNT.email);
    setPassword(FACULTY_DEMO_ACCOUNT.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(email, password, role);
      addToast(`Signed in successfully as ${user.name} (${role === 'faculty' ? 'Faculty Mode' : 'Student Mode'})`, 'success');
      
      // If user was redirected from a protected route, send them there after login
      if (intendedPath && intendedPath !== '/login') {
        navigate(intendedPath, { replace: true });
      } else if (role === 'faculty') {
        navigate('/faculty/dashboard', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    } catch (err) {
      addToast('Sign in failed. Please check credentials.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col md:flex-row text-ink-primary">
      {/* Left side: Burgundy editorial background */}
      <div className="w-full md:w-5/12 lg:w-1/2 bg-burgundy-dark text-ivory p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#F7F3EB_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Brand header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-burgundy flex items-center justify-center text-ivory shadow-soft group-hover:bg-burgundy-secondary transition-colors">
              <Compass className="w-5 h-5 text-ivory" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory">
                ProjectInsight
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-antique-light">
                Collegiate Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Editorial Heading & Description */}
        <div className="my-10 md:my-auto relative z-10 space-y-5 max-w-lg">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-rose-muted font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Capstone Gateway</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-ivory">
            Innovation begins with understanding.
          </h2>

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
            Eliminate derivative engineering. Join collegiate researchers and faculty evaluators indexing, comparing, and elevating college capstone deliverables.
          </p>

          <div className="space-y-3 pt-3 text-xs text-ivory/80">
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-burgundy/60 flex items-center justify-center text-rose-muted">
                <Check className="w-3 h-3" />
              </div>
              <span>Multi-year collegiate capstone repository archive</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-burgundy/60 flex items-center justify-center text-rose-muted">
                <Check className="w-3 h-3" />
              </div>
              <span>Automated prior art overlap & limitation gap extraction</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-burgundy/60 flex items-center justify-center text-rose-muted">
                <Check className="w-3 h-3" />
              </div>
              <span>Faculty review queue & domain saturation tracking</span>
            </div>
          </div>
        </div>

        {/* Institutional footer */}
        <div className="relative z-10 text-[11px] text-ivory/60 pt-6 border-t border-ivory/10">
          Maulana Azad National Institute of Technology (MANIT), Bhopal • Department of Computer Science & Engineering
        </div>
      </div>

      {/* Right side: Warm Ivory Login Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 bg-ivory p-6 sm:p-10 lg:p-16 flex items-center justify-center min-h-[600px] md:min-h-screen">
        <div className="w-full max-w-md my-auto">
          {/* Card Container */}
          <div className="bg-ivory-card border border-border rounded-2xl p-7 sm:p-9 shadow-card space-y-6">
            <div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-antique">
                  Academic Authentication
                </span>
                <Link to="/" className="text-xs text-ink-muted hover:text-burgundy transition-colors font-medium">
                  ← Back to Home
                </Link>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary mt-1">
                Sign In to Your Workspace
              </h2>
              <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
                Select your academic role to enter the Maulana Azad National Institute of Technology (MANIT), Bhopal portal.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="p-1 rounded-xl bg-ivory border border-border grid grid-cols-2 gap-1.5 shadow-inner">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold transition-all focus:outline-none ${
                  role === 'student'
                    ? 'bg-burgundy text-ivory shadow-soft'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-beige/40'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Mode</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('faculty')}
                className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold transition-all focus:outline-none ${
                  role === 'faculty'
                    ? 'bg-burgundy text-ivory shadow-soft'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-beige/40'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Faculty Mode</span>
              </button>
            </div>

            {/* Student Demo Account Picker (Student Mode) */}
            {role === 'student' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-ink-secondary uppercase tracking-wider flex items-center">
                    <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-burgundy" />
                    Select Student Demo Account
                  </span>
                  <span className="text-[10px] text-ink-muted">Click to populate</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {STUDENT_DEMO_ACCOUNTS.map((stu) => {
                    const isSelected = email.toLowerCase() === stu.email.toLowerCase();
                    return (
                      <button
                        key={stu.id}
                        type="button"
                        onClick={() => handleSelectStudent(stu)}
                        className={`p-2.5 rounded-lg border text-left transition-all focus:outline-none ${
                          isSelected
                            ? 'border-burgundy bg-burgundy/5 ring-1 ring-burgundy/40 shadow-soft'
                            : 'border-border bg-ivory/60 hover:bg-beige/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-ink-primary truncate">
                            {stu.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3 h-3 text-burgundy flex-shrink-0" />
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-ink-muted truncate mt-0.5">
                          {stu.email}
                        </div>
                        <div className="text-[10px] text-burgundy font-medium truncate mt-0.5">
                          {stu.domainFocus}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Faculty Demo Account Box (Faculty Mode) */}
            {role === 'faculty' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-ink-secondary uppercase tracking-wider flex items-center">
                    <UserCheck className="w-3.5 h-3.5 mr-1.5 text-burgundy" />
                    Faculty Coordinator Account
                  </span>
                  <span className="text-[10px] text-ink-muted">Click to populate</span>
                </div>

                <button
                  type="button"
                  onClick={handleSelectFaculty}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all focus:outline-none ${
                    email.toLowerCase() === FACULTY_DEMO_ACCOUNT.email.toLowerCase()
                      ? 'border-burgundy bg-burgundy/5 ring-1 ring-burgundy/40 shadow-soft'
                      : 'border-border bg-ivory/60 hover:bg-beige/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink-primary">
                      {FACULTY_DEMO_ACCOUNT.name}
                    </span>
                    {email.toLowerCase() === FACULTY_DEMO_ACCOUNT.email.toLowerCase() && (
                      <Check className="w-3 h-3 text-burgundy flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-ink-muted mt-0.5">
                    {FACULTY_DEMO_ACCOUNT.email}
                  </div>
                  <div className="text-[10px] text-burgundy font-medium mt-0.5">
                    {FACULTY_DEMO_ACCOUNT.designation}
                  </div>
                </button>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1.5">
                  Academic Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={role === 'faculty' ? 'faculty@college.edu' : 'student@college.edu'}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-burgundy shadow-soft transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-burgundy shadow-soft transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-card hover:shadow-elevated transition-all flex items-center justify-center space-x-2 disabled:opacity-75 focus:outline-none"
              >
                {submitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In as {role === 'faculty' ? 'Faculty Coordinator' : 'Student Researcher'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Subtle institutional assurance */}
            <div className="pt-4 border-t border-border flex items-center justify-center space-x-2 text-ink-muted text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
              <span>Maulana Azad National Institute of Technology (MANIT), Bhopal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
