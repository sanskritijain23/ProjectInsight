import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search projects by title, abstract, or domain...", className = "" }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-ink-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 bg-ivory-card border border-border rounded-lg text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 transition-all shadow-soft"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 text-ink-muted hover:text-ink-primary p-0.5 rounded transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
