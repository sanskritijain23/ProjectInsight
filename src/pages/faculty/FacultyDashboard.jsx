import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Users,
  ClipboardCheck,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  Database,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import { projectService } from '../../services/projectService';
import { analyticsService } from '../../services/analyticsService';
import { activityService } from '../../services/activityService';
import StatCard from '../../components/common/StatCard';
import ChartCard from '../../components/charts/ChartCard';
import DomainBadge from '../../components/common/DomainBadge';
import LoadingState from '../../components/common/LoadingState';

// Custom Recharts Tooltip with academic typography
const AcademicTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-ivory-card border border-border p-3 rounded-lg shadow-elevated text-xs font-sans">
        <p className="font-bold text-ink-primary mb-1 border-b border-border/80 pb-1">
          {label || payload[0].name}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-burgundy font-medium flex items-center justify-between gap-4 py-0.5">
            <span className="text-ink-secondary">{entry.name || 'Count'}:</span>
            <span className="font-mono font-bold text-ink-primary">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FacultyDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 10,
    activeStudentCohort: 48,
    totalEvaluations: 8,
    projectsAwaitingReview: 3,
    completedReviews: 2,
    dataSourceLabel: "Demo Cohort: 2024–2025 Capstone Cycle"
  });
  const [analytics, setAnalytics] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [statsData, analyticsData, projectsData, reviewsData, activityData] = await Promise.all([
          analyticsService.getFacultyStats(),
          analyticsService.getFacultyAnalytics(),
          projectService.getProjects({ sort: 'newest' }),
          analyticsService.getReviews('pending'),
          activityService.getFacultyActivities()
        ]);
        setStats(statsData);
        setAnalytics(analyticsData);
        setRecentProjects(projectsData.slice(0, 4));
        setPendingReviews(reviewsData.slice(0, 3));
        setActivities(activityData.slice(0, 4));
      } catch (err) {
        console.error('Error loading faculty dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !analytics) {
    return <LoadingState message="Loading faculty coordinator oversight panel..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome & Fast Actions Header - Visually Distinct Deep Wine Styling */}
      <div className="bg-ivory-card border border-burgundy/25 rounded-card p-6 sm:p-7 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-burgundy bg-burgundy/10 px-2.5 py-0.5 rounded border border-burgundy/20">
              Department Capstone Committee
            </span>
            <span className="text-border">•</span>
            <span className="text-ink-secondary">Curriculum Oversight & Evaluation</span>
            <span className="text-border">•</span>
            <span className="text-ink-muted text-[11px]">Academic Year 2024–2025</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark tracking-tight">
            Curriculum Capstone Oversight & Review
          </h2>

          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Supervise capstone deliverables across graduating cohorts, evaluate student proposal novelty, and manage domain saturation limits to prevent repetitive engineering projects.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0 relative z-10 w-full md:w-auto">
          <Link
            to="/faculty/projects/new"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            <span>Index New Project</span>
          </Link>
          <Link
            to="/faculty/reviews"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-ivory border border-border hover:border-burgundy/40 text-ink-primary hover:text-burgundy text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all"
          >
            <ClipboardCheck className="w-4 h-4 mr-1.5 text-burgundy" />
            <span>Review Queue ({stats.projectsAwaitingReview})</span>
          </Link>
        </div>
      </div>

      {/* Actual Data Notice & Stats Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-ink-muted px-1">
          <span className="flex items-center">
            <Database className="w-3.5 h-3.5 mr-1 text-antique" />
            <span>Institutional Supervision Metrics (Live Department Records)</span>
          </span>
          <span className="text-[11px] font-medium text-antique-dark">
            {stats.dataSourceLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Archived Capstones"
            value={stats.totalProjects}
            subtitle="Verified deliverables indexed in department archive"
            icon={FolderKanban}
          />
          <StatCard
            title="Active Student Cohort"
            value={stats.activeStudentCohort}
            subtitle="Enrolled final-year project candidates (Sample)"
            icon={Users}
          />
          <StatCard
            title="Pending Evaluations"
            value={stats.projectsAwaitingReview}
            subtitle="Student proposals awaiting faculty feedback"
            icon={ClipboardCheck}
            trend={stats.projectsAwaitingReview > 0 ? "Action Required" : "Cleared"}
          />
          <StatCard
            title="Evaluated Proposals"
            value={stats.completedReviews}
            subtitle="Proposals reviewed with committee guidance"
            icon={CheckCircle2}
          />
        </div>
      </div>

      {/* Charts Grid: 2 Charts with proper titles, axis labels, legends, date ranges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Domain Distribution (Donut) */}
        <div className="lg:col-span-5">
          <ChartCard
            title="Curriculum Domain Distribution"
            subtitle="Historical share across 144 sample deliverables (2021–2025)"
            action={
              <Link to="/faculty/analytics" className="text-xs font-semibold text-burgundy hover:underline">
                View Saturation Limits →
              </Link>
            }
          >
            <div className="h-[270px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.domainDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {analytics.domainDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFCF7" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<AcademicTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend with explicit project counts and percentages */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-border text-xs">
              {analytics.domainDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-ink-secondary truncate">{item.name}</span>
                  <span className="font-mono text-ink-primary font-bold ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Most-Used Technologies (Bar chart) */}
        <div className="lg:col-span-7">
          <ChartCard
            title="Technology Stack Penetration"
            subtitle="Frequency of declared frameworks across indexed capstones (2021–2025)"
            action={
              <span className="text-[11px] font-mono text-ink-muted">Cumulative Cohorts</span>
            }
          >
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.technologyTrends.slice(0, 8)}
                  margin={{ top: 15, right: 15, left: -10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8DED2" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#82766F"
                    fontSize={11}
                    tickLine={false}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke="#82766F"
                    fontSize={11}
                    tickLine={false}
                    label={{ value: 'Indexed Projects', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 10, fill: '#82766F' } }}
                  />
                  <Tooltip content={<AcademicTooltip />} />
                  <Bar dataKey="count" name="Projects Using Tech" fill="#6D263D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Line Chart: Submissions by Academic Year */}
      <ChartCard
        title="Capstone Submission Volume vs Approval Rate"
        subtitle="Progression of annual capstone proposals and committee approval count (Academic Cycles 2021–2025)"
      >
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={analytics.yearlySubmissions}
              margin={{ top: 15, right: 25, left: -5, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DED2" vertical={false} />
              <XAxis dataKey="year" stroke="#82766F" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#82766F"
                fontSize={11}
                tickLine={false}
                label={{ value: 'Project Count', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 10, fill: '#82766F' } }}
              />
              <Tooltip content={<AcademicTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="submissions"
                name="Total Submissions"
                stroke="#4B192B"
                strokeWidth={2.5}
                dot={{ fill: '#4B192B', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="approved"
                name="Approved Deliverables"
                stroke="#B58C72"
                strokeWidth={2}
                dot={{ fill: '#B58C72', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Two Column Bottom: Pending Reviews & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Reviews Queue (7 cols) */}
        <div className="lg:col-span-7 bg-ivory-card border border-border rounded-card p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-ink-primary">
                Student Proposals Pending Evaluation
              </h3>
              <p className="text-xs text-ink-secondary">
                Submitted candidate proposals requiring committee guidance or Phase 1 approval
              </p>
            </div>
            <Link to="/faculty/reviews" className="text-xs font-semibold text-burgundy hover:underline">
              View All Queue ({pendingReviews.length})
            </Link>
          </div>

          <div className="space-y-3">
            {pendingReviews.length === 0 ? (
              <p className="text-xs text-ink-muted italic py-4 text-center">No proposals awaiting review.</p>
            ) : (
              pendingReviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-lg bg-ivory border border-border flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-ink-primary">{rev.studentName}</span>
                      <span className="text-[11px] font-mono text-ink-muted">({rev.studentRoll})</span>
                      <DomainBadge domain={rev.domain} size="xs" />
                    </div>
                    <h4 className="font-serif text-xs font-bold text-ink-primary truncate">
                      {rev.projectIdea}
                    </h4>
                    <div className="text-[11px] text-ink-secondary">
                      Similarity Overlap: <strong className="text-burgundy font-mono">{rev.similarityScore}%</strong> • Submitted {rev.submissionDate}
                    </div>
                  </div>

                  <Link
                    to="/faculty/reviews"
                    className="px-3 py-1.5 rounded bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-ivory text-xs font-semibold uppercase tracking-wider transition-colors flex-shrink-0"
                  >
                    Evaluate
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Committee Activity (5 cols) */}
        <div className="lg:col-span-5 bg-ivory-card border border-border rounded-card p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-ink-primary">
                Recent Department Activity
              </h3>
              <p className="text-xs text-ink-secondary">
                Supervision timeline & review events
              </p>
            </div>
            <Clock className="w-4 h-4 text-ink-muted" />
          </div>

          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-xs text-ink-muted italic py-4 text-center">No recent committee activity.</p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="flex items-start space-x-3 pb-3 border-b border-border/60 last:border-b-0 last:pb-0">
                  <div className="w-7 h-7 rounded-md bg-beige/60 flex items-center justify-center text-burgundy mt-0.5 flex-shrink-0">
                    {act.type === 'saturation' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                    ) : act.type === 'evaluation' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <FolderKanban className="w-3.5 h-3.5" />
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
                        View detail →
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
