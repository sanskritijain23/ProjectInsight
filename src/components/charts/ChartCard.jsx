import React from 'react';

export default function ChartCard({ title, subtitle, action, children, className = "" }) {
  return (
    <div className={`bg-ivory-card p-5 rounded-card border border-border shadow-card flex flex-col ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-ink-primary">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="flex-1 w-full min-h-[260px]">
        {children}
      </div>
    </div>
  );
}
