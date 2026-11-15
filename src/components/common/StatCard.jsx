import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <div className="bg-ivory-card p-5 rounded-card border border-border shadow-card hover:border-burgundy/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-ink-secondary">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-burgundy/5 flex items-center justify-center text-burgundy">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-serif font-bold text-ink-primary">
          {value}
        </span>
        {trend && (
          <span className="text-xs font-medium text-burgundy">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
