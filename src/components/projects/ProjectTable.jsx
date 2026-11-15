import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit3, Trash2, Bookmark, ExternalLink } from 'lucide-react';
import DomainBadge from '../common/DomainBadge';
import TechnologyTag from '../common/TechnologyTag';

export default function ProjectTable({
  projects,
  onBookmarkToggle,
  onEdit,
  onDelete,
  isFacultyView = false,
  basePath = "/student/projects"
}) {
  return (
    <div className="overflow-x-auto bg-ivory-card border border-border rounded-card shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-ivory/80 border-b border-border text-xs uppercase tracking-wider text-ink-secondary font-semibold">
          <tr>
            <th className="py-3.5 px-4">Project Title & Abstract</th>
            <th className="py-3.5 px-4">Domain</th>
            <th className="py-3.5 px-4 hidden md:table-cell">Technologies</th>
            <th className="py-3.5 px-4 hidden lg:table-cell">Year</th>
            <th className="py-3.5 px-4 hidden sm:table-cell">Author / Advisor</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {projects.map((proj) => (
            <tr key={proj.id} className="hover:bg-ivory/40 transition-colors">
              {/* Title & Abstract */}
              <td className="py-3.5 px-4 max-w-sm">
                <Link
                  to={`${basePath}/${proj.id}`}
                  className="font-serif font-bold text-ink-primary hover:text-burgundy transition-colors text-base block mb-0.5 line-clamp-1"
                >
                  {proj.title}
                </Link>
                <p className="text-xs text-ink-secondary line-clamp-2">
                  {proj.abstract}
                </p>
              </td>

              {/* Domain */}
              <td className="py-3.5 px-4 whitespace-nowrap">
                <DomainBadge domain={proj.domain} size="xs" />
              </td>

              {/* Technologies */}
              <td className="py-3.5 px-4 hidden md:table-cell">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {proj.technologies?.slice(0, 3).map((tech) => (
                    <TechnologyTag key={tech} name={tech} />
                  ))}
                  {proj.technologies?.length > 3 && (
                    <span className="text-xs text-ink-muted">+{proj.technologies.length - 3}</span>
                  )}
                </div>
              </td>

              {/* Academic Year */}
              <td className="py-3.5 px-4 whitespace-nowrap hidden lg:table-cell text-xs text-ink-secondary">
                {proj.academicYear}
              </td>

              {/* Author / Advisor */}
              <td className="py-3.5 px-4 whitespace-nowrap hidden sm:table-cell text-xs text-ink-secondary">
                <div className="font-medium text-ink-primary truncate max-w-[140px]">{proj.author}</div>
                <div className="text-ink-muted truncate max-w-[140px]">{proj.advisor}</div>
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                <div className="flex items-center justify-end space-x-2">
                  <Link
                    to={`${basePath}/${proj.id}`}
                    className="p-1.5 text-ink-secondary hover:text-burgundy hover:bg-beige/40 rounded transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  {onBookmarkToggle && (
                    <button
                      onClick={() => onBookmarkToggle(proj.id)}
                      className={`p-1.5 rounded hover:bg-beige/40 transition-colors ${
                        proj.isBookmarked ? 'text-burgundy' : 'text-ink-muted hover:text-ink-primary'
                      }`}
                      title={proj.isBookmarked ? "Remove bookmark" : "Save project"}
                    >
                      <Bookmark className={`w-4 h-4 ${proj.isBookmarked ? 'fill-burgundy' : ''}`} />
                    </button>
                  )}

                  {isFacultyView && onEdit && (
                    <button
                      onClick={() => onEdit(proj)}
                      className="p-1.5 text-ink-secondary hover:text-burgundy hover:bg-beige/40 rounded transition-colors"
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}

                  {isFacultyView && onDelete && (
                    <button
                      onClick={() => onDelete(proj)}
                      className="p-1.5 text-ink-secondary hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
