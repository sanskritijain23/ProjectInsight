import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Bell, Shield, Save, GraduationCap, Building2 } from 'lucide-react';

export default function StudentSettings() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'Nitya Arya');
  const [rollNumber, setRollNumber] = useState(user?.rollNumber || '21BCE1001');
  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [institution, setInstitution] = useState(user?.institution || 'Maulana Azad National Institute of Technology, Bhopal');
  const [semester, setSemester] = useState(user?.semester || 'Semester V');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setRollNumber(user.rollNumber || '');
      setDepartment(user.department || '');
      setInstitution(user.institution || 'Maulana Azad National Institute of Technology, Bhopal');
      setSemester(user.semester || 'Semester V');
    }
  }, [user]);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [facultyFeedbackAlerts, setFacultyFeedbackAlerts] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Profile & research settings updated successfully', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="border-b border-border pb-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary">
          Student Researcher Profile & Settings
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary mt-1">
          Manage your collegiate credentials, departmental affiliations, and research notifications.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-3 border-b border-border pb-3">
            <User className="w-5 h-5 text-burgundy" />
            <h3 className="font-serif text-lg font-bold text-ink-primary">
              Academic Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Collegiate Roll / Registration No.
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs font-mono text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Academic Phase
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Institution
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Alert Preferences */}
        <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-3 border-b border-border pb-3">
            <Bell className="w-5 h-5 text-burgundy" />
            <h3 className="font-serif text-lg font-bold text-ink-primary">
              Capstone Progress & Evaluation Notifications
            </h3>
          </div>

          <div className="space-y-3 text-xs text-ink-primary">
            <label className="flex items-center justify-between p-3 rounded-lg bg-ivory border border-border cursor-pointer">
              <div>
                <div className="font-semibold text-ink-primary">Faculty Committee Review Updates</div>
                <div className="text-ink-secondary text-[11px]">Receive notifications when committee evaluates your submitted feasibility dossier.</div>
              </div>
              <input
                type="checkbox"
                checked={facultyFeedbackAlerts}
                onChange={(e) => setFacultyFeedbackAlerts(e.target.checked)}
                className="w-4 h-4 accent-burgundy"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-ivory border border-border cursor-pointer">
              <div>
                <div className="font-semibold text-ink-primary">Domain Novelty & New Archive Alerts</div>
                <div className="text-ink-secondary text-[11px]">Periodic notification regarding newly indexed projects in your domain.</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-burgundy"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-card transition-all flex items-center space-x-2 focus:outline-none"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
