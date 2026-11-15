import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ label, value, options, onChange, icon: Icon, className = "" }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {label && (
        <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`appearance-none bg-ivory-card border border-border text-ink-primary text-sm rounded-lg py-2.5 pr-9 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 transition-all shadow-soft cursor-pointer ${
            Icon ? 'pl-9' : 'pl-3.5'
          }`}
        >
          {options.map((opt) => {
            const optVal = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
      </div>
    </div>
  );
}
