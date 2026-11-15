import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Shield, Sliders, Save, Award } from 'lucide-react';

export default function FacultySettings() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'Dr. K. S. Venkatesh');
  const [designation, setDesignation] = useState(user?.designation || 'Associate Professor & Capstone Coordinator');
  const [department, setDepartment] = useState(user?.department || 'Department of Computer Science & Engineering');
  const [institution, setInstitution] = useState(user?.institution || 'Maulana Azad National Institute of Technology, Bhopal');

  // Policy threshold settings
  const [highSimilarityThreshold, setHighSimilarityThreshold] = useState(70);
  const [autoFlagDuplication, setAutoFlagDuplication] = useState(true);
  const [allowStudentBenchmarkDownloads, setAllowStudentBenchmarkDownloads] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Faculty coordination parameters updated successfully', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="border-b border-border pb-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary">
          Faculty Coordinator Profile & Parameters
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary mt-1">
          Configure committee evaluation rubrics, similarity threshold triggers, and departmental parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile */}
        <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-3 border-b border-border pb-3">
            <User className="w-5 h-5 text-burgundy" />
            <h3 className="font-serif text-lg font-bold text-ink-primary">
              Faculty Profile
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Faculty Name
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
                Academic Designation
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Department & Institution
              </label>
              <input
                type="text"
                value={`${department}, ${institution}`}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>
          </div>
        </div>

        {/* Academic Evaluation Parameters */}
        <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
          <div className="flex items-center space-x-3 border-b border-border pb-3">
            <Sliders className="w-5 h-5 text-burgundy" />
            <h3 className="font-serif text-lg font-bold text-ink-primary">
              Curriculum Evaluation Thresholds
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-ink-primary mb-1">
                <span>High Prior Art Overlap Threshold</span>
                <span className="font-mono text-burgundy font-bold">{highSimilarityThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={highSimilarityThreshold}
                onChange={(e) => setHighSimilarityThreshold(Number(e.target.value))}
                className="w-full accent-burgundy cursor-pointer"
              />
              <span className="text-[11px] text-ink-muted">
                Student submissions exceeding this percentage will automatically require committee review and explicit novelty justification.
              </span>
            </div>

            <label className="flex items-center justify-between p-3 rounded-lg bg-ivory border border-border cursor-pointer">
              <div>
                <div className="font-semibold text-ink-primary">Automatic Saturated Theme Alerts</div>
                <div className="text-ink-secondary text-[11px]">Notify faculty reviewers when a proposed topic matches historically saturated keywords.</div>
              </div>
              <input
                type="checkbox"
                checked={autoFlagDuplication}
                onChange={(e) => setAutoFlagDuplication(e.target.checked)}
                className="w-4 h-4 accent-burgundy"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-ivory border border-border cursor-pointer">
              <div>
                <div className="font-semibold text-ink-primary">Student Dossier Export Permission</div>
                <div className="text-ink-secondary text-[11px]">Allow students to generate PDF evaluation reports for capstone synopsis defense.</div>
              </div>
              <input
                type="checkbox"
                checked={allowStudentBenchmarkDownloads}
                onChange={(e) => setAllowStudentBenchmarkDownloads(e.target.checked)}
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
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
