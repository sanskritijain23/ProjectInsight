import React from 'react';

export default function TechnologyTag({ name, onRemove, clickable, onClick }) {
  return (
    <span
      onClick={clickable ? onClick : undefined}
      className={`inline-flex items-center text-xs font-mono font-normal px-2.5 py-1 rounded bg-beige-light/70 text-ink-primary border border-border transition-colors ${
        clickable ? 'cursor-pointer hover:border-burgundy/40 hover:bg-beige/40' : ''
      }`}
    >
      <span>{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          className="ml-1.5 text-ink-muted hover:text-burgundy transition-colors focus:outline-none"
        >
          ×
        </button>
      )}
    </span>
  );
}
