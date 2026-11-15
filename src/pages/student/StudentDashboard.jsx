import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  FileSearch,
  Bookmark,
  TrendingUp,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  Cpu,
  Shield,
  Activity,
  Globe,
  BookOpen,
  Wifi,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import { analysisService } from '../../services/analysisService';
import { analyticsService } from '../../services/analyticsService';
import { activityService } from '../../services/activityService';
import { useToast } from '../../context/ToastContext';
import StatCard from '../../components/common/StatCard';
import ProjectCard from '../../components/projects/ProjectCard';
import DomainBadge from '../../components/common/DomainBadge';
import LoadingState from '../../components/common/LoadingState';

const DOMAIN_CARDS = [
  { name: 'Artificial Intelligence', icon: Cpu, count: '48 Records', desc: 'Computer vision, transformers & edge-ML' },
  { name: 'Healthcare', icon: Activity, count: '32 Records', desc: 'Biomedical imaging & clinical EHR modeling' },
  { name: 'Cybersecurity', icon: Shield, count: '26 Records', desc: 'Zero-knowledge proofs & network defense' },
  { name: 'IoT', icon: Wifi, count: '20 Records', desc: 'LoRaWAN micro-sensing & TinyML telemetry' },
  { name: 'Web Development', icon: Globe, count: '12 Records', desc: 'Distributed topologies & cloud resilience' },
  { name: 'Education', icon: BookOpen, count: '6 Records', desc: 'Pedagogical NLP & peer review calibration' },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    archivedProjectsCount: 10,
    proposalsAnalysed: 3,
    savedReferencesCount: 2,
    researchGapsIdentified: 8,
    dataSourceLabel: "Sample Repository Data"
  });
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [statsData, analysesData, projectsData, activityData] = await Promise.all([
          analyticsService.getStudentStats(user?.email),
          analysisService.getAnalyses('', user?.email),
          projectService.getProjects({ sort: 'newest' }, user?.email),
          activityService.getStudentActivities(user?.email)
        ]);
        setStats(statsData);
        setRecentAnalyses(analysesData.slice(0, 3));
        setRecentProjects(projectsData.slice(0, 3));
        setActivities(activityData.slice(0, 4));
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [user?.email]);

  const handleBookmarkToggle = async (id) => {
    try {
      const isNowSaved = await projectService.toggleBookmark(id, user?.email);
      addToast(isNowSaved ? 'Project added to your saved research references' : 'Removed from saved research', 'info');
      // Refresh projects & stats
      const updated = await projectService.getProjects({ sort: 'newest' }, user?.email);
      setRecentProjects(updated.slice(0, 3));
      const savedCount = (await projectService.getSavedProjects(user?.email)).length;
      setStats(prev => ({ ...prev, savedReferencesCount: savedCount }));

      // Log activity
      const project = updated.find(p => p.id === id);
      activityService.logActivity({
        userEmail: user?.email,
        role: 'student',
        type: 'bookmark',
        title: isNowSaved ? 'Saved Literature Reference' : 'Removed Bookmark',
        description: `${isNowSaved ? 'Added' : 'Removed'} "${project?.title || 'Project'}" in saved literature.`,
        targetLink: `/student/projects/${id}`
      });
      setActivities(activityService.getStudentActivities(user?.email).slice(0, 4));
    } catch (e) {
      addToast('Failed to update bookmark', 'error');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return <LoadingState message="Loading capstone research workspace..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-ivory-card border border-border rounded-card p-6 sm:p-7 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-antique">
              Capstone Research Cycle 2024–2025
            </span>
            <span className="text-border">•</span>
            <span className="text-ink-secondary">{user?.department || "CSE Department"}</span>
            <span className="text-border">•</span>
            <span className="text-[11px] font-mono text-ink-muted bg-beige/40 px-2 py-0.5 rounded border border-border">
              Roll: {user?.rollNumber || "21BCE1042"}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-burgundy-dark tracking-tight">
            {getGreeting()}, {user?.name || "Student Researcher"}
          </h2>

          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Your capstone research workspace is active. Search the department repository, evaluate proposed project feasibility against prior art, and identify unaddressed engineering challenges.
          </p>
        </div>

        <div className="flex-shrink-0 relative z-10 w-full md:w-auto">
          <Link
            to="/student/analyse"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-card hover:shadow-elevated transition-all"
          >
            <FileSearch className="w-4 h-4 mr-2" />
            <span>Check Proposal Feasibility</span>
          </Link>
        </div>
      </div>

      {/* Actual Data Notice & Statistics Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-ink-muted px-1">
          <span className="flex items-center">
            <Database className="w-3.5 h-3.5 mr-1 text-antique" />
            <span>Workspace Statistics (Live Local Data)</span>
          </span>
          <span className="text-[11px] font-medium text-antique-dark">
            {stats.dataSourceLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Archived Projects"
            value={stats.archivedProjectsCount}
            subtitle="Verified capstones indexed in department archive"
            icon={Compass}
          />
          <StatCard
            title="Proposals Analysed"
            value={stats.proposalsAnalysed}
            subtitle="Idea feasibility reports in your portfolio"
            icon={FileSearch}
          />
          <StatCard
            title="Literature References"
            value={stats.savedReferencesCount}
            subtitle="Bookmarked projects for proposal literature review"
            icon={Bookmark}
          />
          <StatCard
            title="Identified Research Gaps"
            value={stats.researchGapsIdentified}
            subtitle="Unaddressed technical limitations extracted"
            icon={TrendingUp}
          />
        </div>
      </div>

      {/* Main 2-Column Section: Recent Feasibility Analyses (7 cols) + Recent Research Activity (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Analyses */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-ink-primary">
                Recent Feasibility & Lineage Analyses
              </h3>
              <p className="text-xs text-ink-secondary">
                Submitted proposal topics and their semantic overlap with archived projects
              </p>
            </div>
            <Link
              to="/student/analyses"
              className="text-xs font-semibold text-burgundy hover:text-burgundy-hover flex items-center transition-colors"
            >
              <span>All Analyses ({recentAnalyses.length})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAnalyses.length === 0 ? (
              <div className="p-8 text-center bg-ivory-card border border-border rounded-card text-xs text-ink-muted">
                No project proposals analysed yet. Click "Check Proposal Feasibility" to test your first idea.
              </div>
            ) : (
              recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  onClick={() => navigate(`/student/analysis/${analysis.id}`)}
                  className="group bg-ivory-card border border-border hover:border-burgundy/40 rounded-card p-4 sm:p-5 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <DomainBadge domain={analysis.domain} size="xs" />
                        <span className="text-[11px] text-ink-muted">{analysis.date}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-ink-primary group-hover:text-burgundy transition-colors line-clamp-1">
                        {analysis.title}
                      </h4>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-burgundy/20 bg-burgundy/10 text-burgundy-dark font-mono">
                        {analysis.highestSimilarity}% Overlap
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-ink-secondary line-clamp-2 mb-3 leading-relaxed">
                    {analysis.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border/70 text-xs">
                    <span className="text-ink-muted text-[11px]">
                      Status: <span className="text-emerald-700 font-semibold">{analysis.status}</span>
                    </span>
                    <span className="text-burgundy font-semibold text-xs flex items-center group-hover:translate-x-0.5 transition-transform">
                      <span>View Analysis Report</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Recent Research Activity Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-ink-primary">
                Recent Activity
              </h3>
              <p className="text-xs text-ink-secondary">
                Your research timeline and faculty interactions
              </p>
            </div>
            <Clock className="w-4 h-4 text-ink-muted" />
          </div>

          <div className="bg-ivory-card border border-border rounded-card p-4 sm:p-5 shadow-card space-y-3.5">
            {activities.length === 0 ? (
              <p className="text-xs text-ink-muted italic py-3 text-center">No recent activity recorded.</p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="flex items-start space-x-3 pb-3 border-b border-border/60 last:border-b-0 last:pb-0">
                  <div className="w-7 h-7 rounded-md bg-beige/60 flex items-center justify-center text-burgundy mt-0.5 flex-shrink-0">
                    {act.type === 'bookmark' ? (
                      <Bookmark className="w-3.5 h-3.5" />
                    ) : act.type === 'review_update' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <FileSearch className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-ink-primary truncate">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-ink-muted whitespace-nowrap">
                        {act.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                      {act.description}
                    </p>
                    {act.targetLink && (
                      <Link
                        to={act.targetLink}
                        className="inline-block text-[11px] font-semibold text-burgundy hover:underline pt-0.5"
                      >
                        Open record →
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Department Domain Categories */}
          <div className="bg-ivory-card border border-border rounded-card p-4 shadow-card space-y-3">
            <h4 className="font-serif text-sm font-bold text-ink-primary">
              Repository by Engineering Domain
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {DOMAIN_CARDS.slice(0, 4).map((dm) => (
                <Link
                  key={dm.name}
                  to={`/student/projects?domain=${encodeURIComponent(dm.name)}`}
                  className="p-2 rounded bg-ivory border border-border hover:border-burgundy/30 transition-colors flex items-center justify-between"
                >
                  <span className="truncate text-ink-primary">{dm.name}</span>
                  <span className="text-[10px] font-mono text-ink-muted ml-1">{dm.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recently Indexed Projects in Repository */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-ink-primary">
              Recently Indexed Project Deliverables
            </h3>
            <p className="text-xs text-ink-secondary">
              Past peer engineering projects available for prior art and literature study
            </p>
          </div>
          <Link
            to="/student/projects"
            className="text-xs font-semibold text-burgundy hover:text-burgundy-hover flex items-center transition-colors"
          >
            <span>Browse Full Repository</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isBookmarked={project.isBookmarked}
              onBookmarkToggle={handleBookmarkToggle}
              basePath="/student/projects"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
