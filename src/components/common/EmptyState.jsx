import React from 'react';
import { BookOpen, FolderSearch } from 'lucide-react';

export default function EmptyState({
  title = "No records found",
  description = "No entries match your current search filters or criteria.",
  icon: Icon = FolderSearch,
  actionText,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-ivory-card border border-border border-dashed rounded-card">
      <div className="w-12 h-12 rounded-full bg-beige/60 flex items-center justify-center text-burgundy mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-ink-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-ink-secondary max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-sm font-medium rounded-lg transition-colors shadow-soft"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
