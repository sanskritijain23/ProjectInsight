import React from 'react';
import { CheckCircle2, PlusCircle, Layers, ShieldCheck } from 'lucide-react';

export default function ComparisonPanel({ comparison, topMatchTitle }) {
  if (!comparison) return null;

  const { commonFeatures = [], newlyProposedFeatures = [] } = comparison;

  return (
    <div className="bg-ivory-card rounded-card border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border bg-ivory/50">
        <h3 className="font-serif text-xl font-bold text-ink-primary mb-1">
          Feature Differential & Architectural Mapping
        </h3>
        <p className="text-xs text-ink-secondary leading-relaxed">
          Side-by-side comparison illustrating structural convergence with <span className="font-semibold text-burgundy">{topMatchTitle}</span> and newly introduced capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left Column: Common Features (Overlaps) */}
        <div className="p-6">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-7 h-7 rounded-md bg-beige/60 flex items-center justify-center text-ink-secondary">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-ink-primary">
                Common Baseline Features
              </h4>
              <p className="text-xs text-ink-muted">Shared foundational capabilities in the archive</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {commonFeatures.map((feat, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-ivory/60 border border-border">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ink-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-semibold text-ink-primary mb-1">
                      {feat.name}
                    </h5>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {feat.context}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Newly Proposed Features (Novelty) */}
        <div className="p-6 bg-burgundy/[0.015]">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-7 h-7 rounded-md bg-burgundy/10 flex items-center justify-center text-burgundy">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-burgundy-dark">
                Newly Proposed Novel Features
              </h4>
              <p className="text-xs text-ink-muted">Distinctive additions not present in current matches</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {newlyProposedFeatures.map((feat, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-burgundy/5 border border-burgundy/20">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h5 className="text-xs font-bold text-burgundy-dark">
                    {feat.name}
                  </h5>
                  {feat.impact && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-burgundy text-ivory">
                      {feat.impact}
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {feat.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
