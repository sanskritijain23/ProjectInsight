import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowUpRight, Calendar, User, Code2 } from 'lucide-react';
import DomainBadge from '../common/DomainBadge';
import TechnologyTag from '../common/TechnologyTag';

export default function ProjectCard({
  project,
  onBookmarkToggle,
  isBookmarked = false,
  basePath = "/student/projects"
}) {
  return (
    <div className="group bg-ivory-card rounded-card border border-border hover:border-burgundy/40 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div className="p-5 flex-1">
        {/* Top metadata */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <DomainBadge domain={project.domain} />
          
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-xs text-ink-muted">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {project.academicYear}
            </span>
            {onBookmarkToggle && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onBookmarkToggle(project.id);
                }}
                className={`p-1 rounded hover:bg-beige/50 transition-colors ${
                  isBookmarked ? 'text-burgundy' : 'text-ink-muted hover:text-ink-primary'
                }`}
                title={isBookmarked ? "Remove bookmark" : "Save project"}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-burgundy' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <Link to={`${basePath}/${project.id}`} className="block group-hover:text-burgundy transition-colors">
          <h3 className="font-serif text-lg font-bold text-ink-primary leading-snug line-clamp-2 mb-2">
            {project.title}
          </h3>
        </Link>

        {/* Abstract */}
        <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3 mb-4">
          {project.abstract}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.technologies?.slice(0, 4).map((tech) => (
            <TechnologyTag key={tech} name={tech} />
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-xs font-mono text-ink-muted px-1.5 py-0.5 rounded bg-beige-light/50 border border-border">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-border/70 bg-ivory/40 flex items-center justify-between text-xs text-ink-secondary">
        <div className="flex items-center truncate max-w-[180px]" title={project.author}>
          <User className="w-3.5 h-3.5 mr-1.5 text-ink-muted flex-shrink-0" />
          <span className="truncate">{project.author || "Student Team"}</span>
        </div>

        <Link
          to={`${basePath}/${project.id}`}
          className="inline-flex items-center font-medium text-burgundy hover:text-burgundy-hover transition-colors"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}
