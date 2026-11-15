import React from 'react';

export default function SimilarityScore({ score, showBar = true, size = 'md', label = 'Overall Semantic Similarity' }) {
  // Determine tone and label
  let statusText = 'Low Semantic Similarity';
  let barColor = 'bg-antique';
  let badgeClass = 'text-antique-dark bg-antique/10 border-antique/30';

  if (score >= 70) {
    statusText = 'High Semantic Similarity';
    barColor = 'bg-burgundy';
    badgeClass = 'text-burgundy-dark bg-burgundy/10 border-burgundy/25';
  } else if (score >= 45) {
    statusText = 'Moderate Semantic Similarity';
    barColor = 'bg-burgundy-secondary';
    badgeClass = 'text-burgundy bg-rose-muted/20 border-rose-muted/40';
  }

  if (size === 'sm') {
    return (
      <div className="flex items-center space-x-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border font-mono ${badgeClass}`}>
          {score}%
        </span>
        <span className="text-xs text-ink-secondary">{statusText}</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-serif font-bold text-burgundy-dark font-mono">
            {score}%
          </span>
          <span className="text-xs uppercase tracking-wider text-ink-secondary font-medium">
            {label}
          </span>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${badgeClass}`}>
          {statusText}
        </span>
      </div>

      {showBar && (
        <div className="w-full bg-beige/60 h-2 rounded-full overflow-hidden border border-border">
          <div
            className={`h-full ${barColor} transition-all duration-700 ease-out rounded-full`}
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  );
}
