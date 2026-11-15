import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Layers } from 'lucide-react';
import DomainBadge from '../common/DomainBadge';
import SimilarityScore from '../common/SimilarityScore';

export default function AnalysisCard({ analysis, basePath = "/student/analysis" }) {
  return (
    <div className="bg-ivory-card rounded-card border border-border hover:border-burgundy/30 shadow-card hover:shadow-elevated transition-all duration-200 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <DomainBadge domain={analysis.domain} size="xs" />
          <div className="flex items-center text-xs text-ink-muted">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {analysis.date}
          </div>
        </div>

        <Link to={`${basePath}/${analysis.id}`}>
          <h3 className="font-serif text-lg font-bold text-ink-primary hover:text-burgundy transition-colors line-clamp-2 mb-2">
            {analysis.title}
          </h3>
        </Link>

        <p className="text-xs text-ink-secondary line-clamp-2 mb-4 leading-relaxed">
          {analysis.description}
        </p>
      </div>

      <div className="pt-3 border-t border-border">
        <div className="mb-3">
          <SimilarityScore score={analysis.highestSimilarity} size="sm" showBar={false} />
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center text-xs text-ink-secondary">
            <Layers className="w-3.5 h-3.5 mr-1 text-ink-muted" />
            {analysis.features?.length || 0} proposed modules
          </span>

          <Link
            to={`${basePath}/${analysis.id}`}
            className="inline-flex items-center text-xs font-semibold text-burgundy hover:text-burgundy-hover transition-colors"
          >
            <span>View Feasibility Report</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
