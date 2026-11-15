import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-primary/50 backdrop-blur-sm animate-fade-in">
      <div
        className={`bg-ivory-card border border-border rounded-card shadow-modal w-full ${maxWidth} overflow-hidden transform transition-all animate-scale-up`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-ivory/50">
          <h3 className="font-serif text-xl font-bold text-ink-primary">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink-primary p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
