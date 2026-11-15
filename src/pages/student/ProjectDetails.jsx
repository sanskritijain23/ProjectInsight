import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  User,
  GraduationCap,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileSearch,
  ExternalLink,
  Share2,
  BookOpen
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useToast } from '../../context/ToastContext';
import DomainBadge from '../../components/common/DomainBadge';
import TechnologyTag from '../../components/common/TechnologyTag';
import ProjectCard from '../../components/projects/ProjectCard';
import LoadingState from '../../components/common/LoadingState';
import { useAuth } from '../../context/AuthContext';

export default function ProjectDetails({ basePath = "/student/projects" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const data = await projectService.getProjectById(id);
        if (!data) {
          addToast('Project record not found', 'error');
          navigate(basePath);
          return;
        }
        setProject(data);
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id, navigate, addToast, basePath]);

  const handleBookmark = async () => {
    if (!project) return;
    if (!user) {
      addToast('Please sign in with your academic account to bookmark projects.', 'info');
      navigate('/login', { state: { from: { pathname: `${basePath}/${project.id}` } } });
      return;
    }
    const isSaved = await projectService.toggleBookmark(project.id);
    setProject(prev => ({ ...prev, isBookmarked: isSaved }));
    addToast(isSaved ? 'Project bookmarked to your research references' : 'Bookmark removed', 'info');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Project reference link copied to clipboard', 'success');
    }
  };

  if (loading) {
    return <LoadingState message="Retrieving project details & citation lineage..." />;
  }

  if (!project) return null;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Navigation & Actions Top Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link
          to={basePath}
          className="inline-flex items-center text-xs font-semibold text-ink-secondary hover:text-burgundy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to Project Repository</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-lg border border-border bg-ivory-card hover:bg-beige/40 text-ink-secondary hover:text-ink-primary transition-colors text-xs flex items-center space-x-1.5 focus:outline-none"
            title="Share Project Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-all focus:outline-none ${
              project.isBookmarked
                ? 'border-burgundy/40 bg-burgundy/10 text-burgundy'
                : 'border-border bg-ivory-card hover:bg-beige/40 text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${project.isBookmarked ? 'fill-burgundy' : ''}`} />
            <span>{project.isBookmarked ? 'Saved in Research' : 'Save Reference'}</span>
          </button>

          <Link
            to={`/student/analyse?benchmarkId=${project.id}`}
            className="px-4 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all flex items-center space-x-1.5 focus:outline-none"
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Evaluate Proposal Against This Record</span>
            <span className="sm:hidden">Compare</span>
          </Link>
        </div>
      </div>

      {/* Main Dossier Header */}
      <div className="bg-ivory-card border border-border rounded-card p-6 sm:p-7 shadow-card space-y-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <DomainBadge domain={project.domain} size="md" />
          <span className="text-xs font-mono text-ink-muted bg-beige/40 px-2.5 py-1 rounded border border-border">
            Academic Year {project.academicYear}
          </span>
          <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-medium">
            Status: {project.status || "Verified Capstone Deliverable"}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-burgundy-dark leading-tight">
          {project.title}
        </h1>

        {/* Author / Advisor line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 pb-4 border-y border-border/80 text-xs text-ink-secondary">
          <div className="flex items-center space-x-2.5">
            <User className="w-4 h-4 text-burgundy flex-shrink-0" />
            <div>
              <span className="text-ink-muted block text-[10px] uppercase font-bold tracking-wider">Authors / Cohort</span>
              <span className="font-medium text-ink-primary">{project.author}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <GraduationCap className="w-4 h-4 text-antique flex-shrink-0" />
            <div>
              <span className="text-ink-muted block text-[10px] uppercase font-bold tracking-wider">Faculty Advisor</span>
              <span className="font-medium text-ink-primary">{project.advisor}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <Calendar className="w-4 h-4 text-ink-muted flex-shrink-0" />
            <div>
              <span className="text-ink-muted block text-[10px] uppercase font-bold tracking-wider">Submission Date</span>
              <span className="font-medium text-ink-primary">{project.submissionDate}</span>
            </div>
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-base uppercase font-bold tracking-wider text-burgundy">
            Project Abstract
          </h3>
          <p className="text-sm text-ink-primary leading-relaxed font-serif italic text-base bg-ivory/60 p-4 rounded-lg border border-border">
            "{project.abstract}"
          </p>
        </div>

        {/* Detailed Description */}
        {project.description && (
          <div className="space-y-1.5 pt-1">
            <h3 className="font-serif text-base uppercase font-bold tracking-wider text-ink-secondary">
              Technical Overview & Architecture
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Technologies Used */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-xs uppercase font-bold tracking-wider text-ink-secondary">
            Technology Stack & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <TechnologyTag key={tech} name={tech} />
            ))}
          </div>
        </div>

        {/* GitHub repository link */}
        {project.githubUrl && (
          <div className="pt-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-mono text-ink-primary hover:text-burgundy bg-beige/40 hover:bg-beige/70 px-3.5 py-2 rounded-lg border border-border transition-colors focus:outline-none"
            >
              <Github className="w-4 h-4 text-ink-primary" />
              <span>{project.githubUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 text-ink-muted ml-1" />
            </a>
          </div>
        )}
      </div>

      {/* Features & Limitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Features */}
        <div className="bg-ivory-card border border-border rounded-card p-5 sm:p-6 shadow-card space-y-3.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-burgundy/10 flex items-center justify-center text-burgundy">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-ink-primary">
                Demonstrated Features
              </h3>
              <p className="text-xs text-ink-muted">Implemented functional deliverables</p>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-ink-primary">
            {project.features?.map((feat, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-ivory/60 border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Documented Limitations */}
        <div className="bg-ivory-card border border-border rounded-card p-5 sm:p-6 shadow-card space-y-3.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-antique/15 flex items-center justify-center text-antique-dark">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-ink-primary">
                Documented Limitations
              </h3>
              <p className="text-xs text-ink-muted">Known boundaries & open research vectors</p>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-ink-secondary">
            {project.limitations?.map((lim, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-ivory/60 border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-antique mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{lim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Projects Lineage */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-ink-primary">
                Related Prior Art & Predecessors
              </h3>
              <p className="text-xs text-ink-secondary">
                Archived projects addressing overlapping domains or sharing core frameworks
              </p>
            </div>
            <Link to={basePath} className="text-xs font-semibold text-burgundy hover:text-burgundy-hover">
              Browse Entire Repository →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.relatedProjects.map((rel) => (
              <ProjectCard
                key={rel.id}
                project={rel}
                isBookmarked={rel.isBookmarked}
                basePath={basePath}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
