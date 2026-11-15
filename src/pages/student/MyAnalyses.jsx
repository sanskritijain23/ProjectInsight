import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, FileSearch, Calendar, ArrowRight, Search, FileText } from 'lucide-react';
import { analysisService } from '../../services/analysisService';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../../components/common/SearchBar';
import AnalysisCard from '../../components/analysis/AnalysisCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

export default function MyAnalyses() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadAnalyses() {
      setLoading(true);
      try {
        const data = await analysisService.getAnalyses(search, user?.email);
        setAnalyses(data);
      } catch (err) {
        console.error('Failed to load analyses:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadAnalyses();
    }, 150);

    return () => clearTimeout(timer);
  }, [search, user?.email]);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary">
            Proposal Feasibility & Analysis History
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Review past prior art pre-checks, lineage comparisons, and technical gap evaluations.
          </p>
        </div>

        <Link
          to="/student/analyse"
          className="inline-flex items-center px-4 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all self-start sm:self-auto focus:outline-none"
        >
          <FileSearch className="w-3.5 h-3.5 mr-1.5" />
          <span>New Feasibility Check</span>
        </Link>
      </div>

      {/* Search Toolbar */}
      <div className="bg-ivory-card p-4 rounded-card border border-border shadow-card flex items-center justify-between">
        <div className="w-full sm:max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search submitted topics by title, domain, or concepts..."
          />
        </div>
        <span className="hidden sm:inline text-xs text-ink-muted">
          Showing <strong className="text-ink-primary">{analyses.length}</strong> analysis records
        </span>
      </div>

      {/* Analyses List */}
      {loading ? (
        <LoadingState message="Retrieving historical submissions..." />
      ) : analyses.length === 0 ? (
        <EmptyState
          title="No proposal analyses found"
          description={
            search
              ? "No submitted proposal matches your search keyword."
              : "You haven't submitted any capstone project topics for prior art evaluation yet."
          }
          icon={History}
          actionText="Run Your First Feasibility Check"
          onAction={() => window.location.href = '/student/analyse'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} basePath="/student/analysis" />
          ))}
        </div>
      )}
    </div>
  );
}
