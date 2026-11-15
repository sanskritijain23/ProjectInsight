import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, RotateCcw, Compass } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useToast } from '../../context/ToastContext';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import ProjectCard from '../../components/projects/ProjectCard';
import ProjectTable from '../../components/projects/ProjectTable';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

export default function ProjectRepository({ basePath = "/student/projects" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filters state
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedDomain, setSelectedDomain] = useState(searchParams.get('domain') || 'All');
  const [selectedTech, setSelectedTech] = useState(searchParams.get('tech') || 'All');
  const [sortBy, setSortBy] = useState('newest');

  // Options
  const [availableDomains, setAvailableDomains] = useState([]);
  const [availableTechs, setAvailableTechs] = useState([]);

  // Load available filter options
  useEffect(() => {
    async function initOptions() {
      const [doms, techs] = await Promise.all([
        projectService.getAvailableDomains(),
        projectService.getAvailableTechnologies()
      ]);
      setAvailableDomains(['All', ...doms]);
      setAvailableTechs(['All', ...techs]);
    }
    initOptions();
  }, []);

  // Fetch projects whenever filters change
  useEffect(() => {
    async function fetchFilteredProjects() {
      setLoading(true);
      try {
        const data = await projectService.getProjects({
          search,
          domain: selectedDomain,
          technology: selectedTech,
          sort: sortBy
        });
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchFilteredProjects();
    }, 150);

    return () => clearTimeout(timer);
  }, [search, selectedDomain, selectedTech, sortBy]);

  const handleBookmarkToggle = async (id) => {
    try {
      const isNowSaved = await projectService.toggleBookmark(id);
      addToast(
        isNowSaved ? 'Project bookmarked to your research list' : 'Project removed from saved research',
        'info'
      );
      setProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, isBookmarked: isNowSaved } : p))
      );
    } catch (err) {
      addToast('Error updating bookmark', 'error');
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedDomain('All');
    setSelectedTech('All');
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters = search || selectedDomain !== 'All' || selectedTech !== 'All';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Context Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary">
            Curriculum Project Repository
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Browse verified engineering capstones across department cohorts for prior art and literature references.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="p-1 rounded-lg bg-ivory-card border border-border flex items-center space-x-1 shadow-soft">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors focus:outline-none ${
                viewMode === 'grid'
                  ? 'bg-burgundy text-ivory shadow-soft'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-beige/40'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors focus:outline-none ${
                viewMode === 'list'
                  ? 'bg-burgundy text-ivory shadow-soft'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-beige/40'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-ivory-card p-4 rounded-card border border-border shadow-card space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search bar */}
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by project title, abstract, methodology, or technology keywords..."
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <FilterDropdown
              label=""
              value={selectedDomain}
              options={availableDomains.map(d => ({ value: d, label: d === 'All' ? 'All Domains' : d }))}
              onChange={setSelectedDomain}
            />

            <FilterDropdown
              label=""
              value={selectedTech}
              options={availableTechs.map(t => ({ value: t, label: t === 'All' ? 'All Technologies' : t }))}
              onChange={setSelectedTech}
            />

            <FilterDropdown
              label=""
              value={sortBy}
              options={[
                { value: 'newest', label: 'Sort: Newest First' },
                { value: 'citations', label: 'Sort: Highly Cited' },
                { value: 'title', label: 'Sort: Alphabetical' },
                { value: 'year', label: 'Sort: Academic Year' },
              ]}
              onChange={setSortBy}
            />

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center px-3 py-2 text-xs font-semibold text-ink-secondary hover:text-burgundy bg-beige/40 hover:bg-beige/70 rounded-lg transition-colors focus:outline-none"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter stats bar */}
        <div className="flex items-center justify-between text-xs text-ink-muted pt-1 border-t border-border/60">
          <span>
            Showing <strong className="text-ink-primary">{projects.length}</strong> indexed projects
          </span>
          {hasActiveFilters && (
            <span className="text-burgundy text-[11px] font-medium">
              Filters active ({[selectedDomain !== 'All' ? selectedDomain : null, selectedTech !== 'All' ? selectedTech : null].filter(Boolean).join(', ')})
            </span>
          )}
        </div>
      </div>

      {/* Projects Display */}
      {loading ? (
        <LoadingState message="Querying repository records..." />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects match your criteria"
          description="Try broadening your search term or clearing the active domain and technology filters."
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isBookmarked={project.isBookmarked}
              onBookmarkToggle={handleBookmarkToggle}
              basePath={basePath}
            />
          ))}
        </div>
      ) : (
        <ProjectTable
          projects={projects}
          onBookmarkToggle={handleBookmarkToggle}
          basePath={basePath}
        />
      )}
    </div>
  );
}
