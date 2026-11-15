import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, PlusCircle, ClipboardCheck, GraduationCap, UserCheck, Bookmark, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { analyticsService } from '../../services/analyticsService';

export default function Header({ onMenuClick }) {
  const { user, isFaculty } = useAuth();
  const location = useLocation();
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);

  useEffect(() => {
    async function loadPending() {
      if (isFaculty) {
        try {
          const pending = await analyticsService.getReviews('pending');
          setPendingReviewsCount(pending.length);
        } catch (e) {
          console.error(e);
        }
      }
    }
    loadPending();
  }, [isFaculty, location.pathname]);

  // Page title inference with proper academic terminology
  const getPageInfo = () => {
    const path = location.pathname;
    if (path.includes('/faculty/dashboard')) return { title: 'Faculty Supervision Dashboard', tag: 'Curriculum Oversight' };
    if (path.includes('/faculty/projects/new')) return { title: 'Index New Capstone Record', tag: 'Archive Management' };
    if (path.includes('/faculty/projects/edit')) return { title: 'Edit Capstone Record', tag: 'Archive Management' };
    if (path.includes('/faculty/projects')) return { title: 'Curriculum Project Repository', tag: 'Department Archive' };
    if (path.includes('/faculty/reviews')) return { title: 'Proposal Evaluation Queue', tag: 'Review Committee' };
    if (path.includes('/faculty/analytics')) return { title: 'Department Analytics & Domain Saturation', tag: 'Academic Oversight' };
    if (path.includes('/faculty/settings')) return { title: 'Faculty Coordinator Preferences', tag: 'Configuration' };

    if (path.includes('/student/dashboard')) return { title: 'Student Project Dashboard', tag: 'Capstone Candidate' };
    if (path.includes('/student/projects/')) return { title: 'Project Details & Lineage Dossier', tag: 'Literature Review' };
    if (path.includes('/student/projects')) return { title: 'Capstone Project Repository', tag: 'Literature Discovery' };
    if (path.includes('/student/analyse')) return { title: 'Project Feasibility & Prior Art Analysis', tag: 'Proposal Formulation' };
    if (path.includes('/student/analysis')) return { title: 'Feasibility & Lineage Report', tag: 'Novelty Evaluation' };
    if (path.includes('/student/analyses')) return { title: 'Submission & Analysis History', tag: 'Student Portfolio' };
    if (path.includes('/student/saved')) return { title: 'Saved Literature & References', tag: 'Research Bookmarks' };
    if (path.includes('/student/settings')) return { title: 'Student Profile & Preferences', tag: 'Account' };

    return { title: 'ProjectInsight Academic Platform', tag: 'Platform' };
  };

  const { title, tag } = getPageInfo();
  const isAnalysePage = location.pathname === '/student/analyse';
  const isDashboardPage = location.pathname === '/student/dashboard';
  const isNewProjectPage = location.pathname === '/faculty/projects/new';

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md border-b h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all ${
      isFaculty
        ? 'bg-ivory/95 border-burgundy/20'
        : 'bg-ivory/95 border-border'
    }`}>
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-ink-secondary hover:text-ink-primary hover:bg-beige/40 rounded-lg transition-colors focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border hidden sm:inline ${
              isFaculty
                ? 'text-burgundy bg-burgundy/10 border-burgundy/20'
                : 'text-antique-dark bg-antique/10 border-antique/25'
            }`}>
              {isFaculty ? 'Faculty Supervision' : 'Student Research'}
            </span>
            <span className="text-border hidden sm:inline">•</span>
            <span className="text-[10px] uppercase font-semibold text-ink-secondary hidden md:inline">
              {tag}
            </span>
          </div>
          <h1 className="font-serif text-lg sm:text-xl font-bold text-ink-primary truncate mt-0.5">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Functional Mode-specific Information & Contextual Action */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        {/* Mode & Affiliation Indicator */}
        <div className="hidden md:flex items-center space-x-2 text-xs text-ink-secondary bg-ivory-card border border-border px-3 py-1.5 rounded-lg shadow-soft">
          {isFaculty ? (
            <UserCheck className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
          ) : (
            <GraduationCap className="w-3.5 h-3.5 text-antique-dark flex-shrink-0" />
          )}
          <span className="font-medium text-ink-primary truncate max-w-[190px]">
            {user?.department || "CSE Department"}
          </span>
        </div>

        {/* Faculty Specific Context Action: Show Review Queue Alert if on another page */}
        {isFaculty ? (
          <div className="flex items-center space-x-2">
            {location.pathname !== '/faculty/reviews' && pendingReviewsCount > 0 && (
              <Link
                to="/faculty/reviews"
                className="inline-flex items-center px-3 py-1.5 bg-ivory-card border border-amber-300 text-amber-900 text-xs font-semibold rounded-lg hover:bg-amber-50 transition-colors shadow-soft"
                title={`${pendingReviewsCount} student proposals awaiting review`}
              >
                <ClipboardCheck className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                <span className="hidden sm:inline">Review Queue:</span>
                <span className="ml-1 px-1.5 py-0.2 bg-amber-200/80 rounded-full text-[11px] font-bold">
                  {pendingReviewsCount}
                </span>
              </Link>
            )}

            {!isNewProjectPage && (
              <Link
                to="/faculty/projects/new"
                className="inline-flex items-center px-3.5 py-1.5 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-soft"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                <span className="hidden sm:inline">Index Project</span>
                <span className="sm:hidden">Add</span>
              </Link>
            )}
          </div>
        ) : (
          /* Student Specific: Clean actions, not duplicating on Analyse or Dashboard page */
          <div className="flex items-center space-x-2">
            {!isAnalysePage && !isDashboardPage && (
              <Link
                to="/student/analyse"
                className="inline-flex items-center px-3.5 py-1.5 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-soft"
              >
                <span className="hidden sm:inline">Feasibility Analysis</span>
                <span className="sm:hidden">Analyse</span>
              </Link>
            )}
            {location.pathname !== '/student/saved' && (
              <Link
                to="/student/saved"
                className="p-2 text-ink-secondary hover:text-burgundy hover:bg-beige/40 rounded-lg transition-colors border border-border bg-ivory-card shadow-soft"
                title="View Saved Literature References"
              >
                <Bookmark className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
