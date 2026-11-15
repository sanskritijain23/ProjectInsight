import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Shield, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-ivory-card text-ink-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-burgundy flex items-center justify-center text-ivory">
                <Compass className="w-4 h-4 text-ivory" />
              </div>
              <span className="font-serif text-xl font-bold text-burgundy-dark">
                ProjectInsight
              </span>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Collegiate Capstone Prior Art & Lineage Platform. Assisting engineering departments with multi-year repository indexing, proposal novelty evaluation, and saturation oversight.
            </p>
            <div className="text-[11px] text-ink-muted">
              Built for Department Review Committees & Capstone Candidates.
            </div>
          </div>

          {/* Quick links: Archive */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-burgundy mb-4">
              Project Repository
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-secondary">
              <li>
                <Link to="/projects" className="hover:text-burgundy transition-colors">
                  Browse All Capstones
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=Artificial+Intelligence" className="hover:text-burgundy transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=Healthcare" className="hover:text-burgundy transition-colors">
                  Healthcare & Bio-Informatics
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=Cybersecurity" className="hover:text-burgundy transition-colors">
                  Cybersecurity & Cryptography
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=IoT" className="hover:text-burgundy transition-colors">
                  IoT & Embedded Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Proposal Evaluation */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-burgundy mb-4">
              Proposal Evaluation
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-secondary">
              <li>
                <Link to="/student/analyse" className="hover:text-burgundy transition-colors">
                  Check Proposal Feasibility
                </Link>
              </li>
              <li>
                <Link to="/student/analyses" className="hover:text-burgundy transition-colors">
                  Submission History
                </Link>
              </li>
              <li>
                <Link to="/faculty/dashboard" className="hover:text-burgundy transition-colors">
                  Faculty Review Queue
                </Link>
              </li>
              <li>
                <Link to="/faculty/analytics" className="hover:text-burgundy transition-colors">
                  Domain Saturation Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Methodology & Ethics */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-burgundy mb-4">
              Academic Standards
            </h4>
            <div className="p-3.5 rounded-lg bg-ivory border border-border text-xs text-ink-secondary space-y-2">
              <div className="flex items-center text-burgundy font-semibold">
                <Shield className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                <span>Novelty & Prior Art Standard</span>
              </div>
              <p className="text-[11px] leading-relaxed text-ink-muted">
                Overlap percentages indicate conceptual alignment with past archived projects, not plagiarism probability. The platform guides students to establish substantiated engineering novelty.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted">
          <div>
            © {new Date().getFullYear()} ProjectInsight • Maulana Azad National Institute of Technology (MANIT), Bhopal • Department of Computer Science & Engineering
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <span className="font-mono text-[11px] text-ink-secondary">Release v1.2</span>
            <span className="text-border">|</span>
            <Link to="/login" className="hover:text-burgundy transition-colors font-medium">Switch Academic Mode</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
