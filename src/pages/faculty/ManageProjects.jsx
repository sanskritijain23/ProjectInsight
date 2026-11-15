import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Trash2, Edit3, Eye, AlertTriangle } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useToast } from '../../context/ToastContext';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import ProjectTable from '../../components/projects/ProjectTable';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

export default function ManageProjects() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [availableDomains, setAvailableDomains] = useState([]);

  // Delete modal state
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const [data, doms] = await Promise.all([
        projectService.getProjects({ search, domain, sort: 'newest' }),
        projectService.getAvailableDomains()
      ]);
      setProjects(data);
      setAvailableDomains(['All', ...doms]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProjects();
    }, 150);
    return () => clearTimeout(timer);
  }, [search, domain]);

  const handleEdit = (proj) => {
    navigate(`/faculty/projects/edit/${proj.id}`);
  };

  const handleDeletePrompt = (proj) => {
    setProjectToDelete(proj);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await projectService.deleteProject(projectToDelete.id);
      addToast(`Project "${projectToDelete.title}" deleted from repository`, 'success');
      setProjectToDelete(null);
      await loadProjects();
    } catch (err) {
      addToast('Failed to delete project', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary">
            Manage Institutional Project Repository
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Index, update, verify, or archive capstone deliverables across academic years.
          </p>
        </div>

        <Link
          to="/faculty/projects/new"
          className="inline-flex items-center px-4 py-2.5 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" />
          <span>Index New Project</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-ivory-card p-4 rounded-card border border-border shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search projects by title, abstract, or author..."
          />
        </div>

        <div className="flex items-center space-x-3">
          <FilterDropdown
            label=""
            value={domain}
            options={availableDomains.map(d => ({ value: d, label: d === 'All' ? 'All Domains' : d }))}
            onChange={setDomain}
          />
          <span className="text-xs text-ink-muted">
            Total: <strong className="text-ink-primary">{projects.length}</strong>
          </span>
        </div>
      </div>

      {/* Table view */}
      {loading ? (
        <LoadingState message="Loading project management records..." />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Try adjusting your search query or domain filter."
          actionText="Add New Project"
          onAction={() => navigate('/faculty/projects/new')}
        />
      ) : (
        <ProjectTable
          projects={projects}
          isFacultyView={true}
          onEdit={handleEdit}
          onDelete={handleDeletePrompt}
          basePath="/student/projects"
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title="Confirm Project Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3 text-ink-primary text-xs">
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-700 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-ink-primary text-sm">
                Delete "{projectToDelete?.title}"?
              </p>
              <p className="text-ink-secondary leading-relaxed">
                This will permanently delete this record from the college archive, removing it from semantic similarity calculations and search indices.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setProjectToDelete(null)}
              className="px-4 py-2 rounded-lg border border-border bg-ivory-card hover:bg-beige/40 text-xs font-medium text-ink-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-soft"
            >
              {isDeleting ? 'Deleting...' : 'Delete Permanently'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
