import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = "Loading records...", stage, totalStages }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-beige border-t-burgundy animate-spin" />
      </div>
      <p className="text-sm font-medium text-ink-primary mb-1">
        {message}
      </p>
      {stage && totalStages && (
        <span className="text-xs text-ink-muted">
          Stage {stage} of {totalStages}
        </span>
      )}
    </div>
  );
}
