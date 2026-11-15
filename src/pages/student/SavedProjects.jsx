import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Compass, ArrowRight } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import ProjectCard from '../../components/projects/ProjectCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

export default function SavedProjects() {
  const { user } = useAuth();
  const [savedProjects, setSavedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const loadSaved = async () => {
    setLoading(true);
    try {
      const data = await projectService.getSavedProjects(user?.email);
      setSavedProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, [user?.email]);

  const handleBookmarkToggle = async (id) => {
    try {
      await projectService.toggleBookmark(id, user?.email);
      addToast('Project removed from saved literature references', 'info');
      loadSaved();
    } catch (e) {
      addToast('Error removing bookmark', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary">
            Saved Literature & Reference Projects
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Archived capstone projects bookmarked for prior art evaluation and proposal literature review.
          </p>
        </div>

        <Link
          to="/student/projects"
          className="inline-flex items-center text-xs font-semibold text-burgundy hover:text-burgundy-hover"
        >
          <span>Explore Repository</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>

      {loading ? (
        <LoadingState message="Loading saved literature references..." />
      ) : savedProjects.length === 0 ? (
        <EmptyState
          title="No saved projects yet"
          description="Browse the repository and click the bookmark icon on any project card to curate your capstone literature review collection."
          icon={Bookmark}
          actionText="Browse Project Repository"
          onAction={() => window.location.href = '/student/projects'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isBookmarked={true}
              onBookmarkToggle={handleBookmarkToggle}
              basePath="/student/projects"
            />
          ))}
        </div>
      )}
    </div>
  );
}
