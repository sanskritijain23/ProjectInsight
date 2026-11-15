import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  PieChart as PieIcon,
  Layers,
  ShieldAlert,
  Database,
  Info
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
import { analyticsService } from '../../services/analyticsService';
import ChartCard from '../../components/charts/ChartCard';
import LoadingState from '../../components/common/LoadingState';

const AcademicTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-ivory-card border border-border p-3 rounded-lg shadow-elevated text-xs font-sans">
        <p className="font-bold text-ink-primary mb-1 border-b border-border/80 pb-1">{label || payload[0].name}</p>
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

export default function FacultyAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      setLoading(true);
      try {
        const res = await analyticsService.getFacultyAnalytics();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading || !data) {
    return <LoadingState message="Loading department analytics & domain saturation reports..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-burgundy bg-burgundy/10 px-2.5 py-0.5 rounded border border-burgundy/20">
            Curriculum Oversight
          </span>
          <span className="text-border">•</span>
          <span className="text-ink-secondary font-medium">Department of Computer Science & Engineering</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark mt-1">
          Capstone Domain Saturation & Technology Analytics
        </h2>

        <p className="text-xs sm:text-sm text-ink-secondary mt-1 leading-relaxed max-w-3xl">
          Aggregated multi-year trends identifying saturated project themes, technology adoption patterns, and historical similarity distributions across graduating engineering cohorts.
        </p>

        {/* Data Source Transparency Pill */}
        <div className="mt-3 inline-flex items-center space-x-2 text-xs text-ink-muted bg-ivory-card border border-border px-3 py-1 rounded-md">
          <Database className="w-3.5 h-3.5 text-antique" />
          <span>Dataset: 144 Sample Capstone Deliverables (Academic Cycles 2021–2025)</span>
        </div>
      </div>

      {/* Top 2 charts with proper titles, axis labels, legends, date ranges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Domain Distribution (Donut) */}
        <div className="lg:col-span-5">
          <ChartCard
            title="Curriculum Domain Distribution"
            subtitle="Percentage share of 144 archived projects across 6 engineering domains (2021–2025)"
          >
            <div className="h-[270px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.domainDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {data.domainDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFCF7" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<AcademicTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-2 pt-3 border-t border-border text-xs">
              {data.domainDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-ink-secondary">{item.name}</span>
                  </div>
                  <div className="font-mono text-ink-primary font-bold">
                    {item.count} projects ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Most Used Technologies (Bar Chart) */}
        <div className="lg:col-span-7">
          <ChartCard
            title="Technology Stack Penetration"
            subtitle="Project counts across core programming languages, frameworks, and tools (2021–2025)"
          >
            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.technologyTrends}
                  margin={{ top: 15, right: 15, left: -5, bottom: 35 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8DED2" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#82766F"
                    fontSize={11}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke="#82766F"
                    fontSize={11}
                    tickLine={false}
                    label={{ value: 'Project Count', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 10, fill: '#82766F' } }}
                  />
                  <Tooltip content={<AcademicTooltip />} />
                  <Bar dataKey="count" name="Adopted Projects" fill="#6D263D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Repeated Project Themes (Saturation Alert Table) */}
      <div className="bg-ivory-card border border-border rounded-card p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-burgundy/10 flex items-center justify-center text-burgundy">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-ink-primary">
                Identified Saturated Project Themes
              </h3>
              <p className="text-xs text-ink-secondary">
                Themes historically over-submitted by student cohorts; requires mandatory architectural differentiation
              </p>
            </div>
          </div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-antique">
            Committee Redirection Policy
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory border-b border-border text-[10px] uppercase tracking-wider text-ink-secondary font-bold">
              <tr>
                <th className="py-2.5 px-3">Saturated Theme</th>
                <th className="py-2.5 px-3">Historical Submissions</th>
                <th className="py-2.5 px-3">Saturation Level</th>
                <th className="py-2.5 px-3">Committee Redirection Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.repeatedThemes.map((theme, idx) => (
                <tr key={idx} className="hover:bg-ivory/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-ink-primary max-w-xs">
                    {theme.theme}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-burgundy">
                    {theme.attempts} proposals
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      theme.saturationLevel === 'Critical Saturation'
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {theme.saturationLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-ink-secondary leading-relaxed">
                    {theme.recommendation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Similarity Distribution & Yearly Output Lineage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Similarity Score Distribution */}
        <ChartCard
          title="Cohort Lineage Similarity Distribution"
          subtitle="Proposals grouped by conceptual overlap band (Sample Evaluations, 2021–2025)"
        >
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.similarityDistribution}
                margin={{ top: 15, right: 15, left: -5, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DED2" vertical={false} />
                <XAxis
                  dataKey="range"
                  stroke="#82766F"
                  fontSize={10}
                  tickLine={false}
                  label={{ value: 'Overlap Band', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#82766F' } }}
                />
                <YAxis
                  stroke="#82766F"
                  fontSize={11}
                  tickLine={false}
                  label={{ value: 'Proposals', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 10, fill: '#82766F' } }}
                />
                <Tooltip content={<AcademicTooltip />} />
                <Bar dataKey="count" name="Evaluated Proposals" fill="#8A4053" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Academic Year Growth */}
        <ChartCard
          title="Annual Proposal Submissions vs Committee Approvals"
          subtitle="Longitudinal progression of capstone output across graduating cohorts (2021–2025)"
        >
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.yearlySubmissions}
                margin={{ top: 15, right: 25, left: -5, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DED2" vertical={false} />
                <XAxis dataKey="year" stroke="#82766F" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#82766F"
                  fontSize={11}
                  tickLine={false}
                  label={{ value: 'Projects', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 10, fill: '#82766F' } }}
                />
                <Tooltip content={<AcademicTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="submissions"
                  name="Submitted Proposals"
                  stroke="#4B192B"
                  strokeWidth={2}
                  dot={{ fill: '#4B192B', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="approved"
                  name="Approved Deliverables"
                  stroke="#6D263D"
                  strokeWidth={2}
                  dot={{ fill: '#6D263D', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
