import React, { useState } from 'react';
import { Plus, X, Check, AlertCircle } from 'lucide-react';

export default function FeatureList({
  items = [],
  onChange,
  readOnly = false,
  label = "Features",
  placeholder = "Add a feature and press enter...",
  type = "positive" // 'positive' or 'limitation'
}) {
  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    onChange([...items, inputVal.trim()]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, idx) => idx !== index));
  };

  const bulletIcon = type === 'limitation'
    ? <AlertCircle className="w-3.5 h-3.5 text-antique mt-0.5 flex-shrink-0" />
    : <Check className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />;

  return (
    <div>
      {label && (
        <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-2">
          {label} ({items.length})
        </label>
      )}

      {/* Input when not readOnly */}
      {!readOnly && (
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-ivory-card border border-border rounded-lg text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 transition-all"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-2 bg-beige/60 hover:bg-beige text-ink-primary hover:text-burgundy text-xs font-medium rounded-lg border border-border transition-colors flex items-center"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add
          </button>
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <p className="text-xs text-ink-muted italic py-1">No items specified yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start justify-between p-2.5 rounded-lg bg-ivory-card border border-border text-xs text-ink-primary"
            >
              <div className="flex items-start space-x-2 mr-2">
                {bulletIcon}
                <span className="leading-relaxed">{item}</span>
              </div>
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-ink-muted hover:text-red-600 p-0.5 rounded transition-colors flex-shrink-0"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
