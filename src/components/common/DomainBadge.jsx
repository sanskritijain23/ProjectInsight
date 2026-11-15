import React from 'react';

const DOMAIN_STYLES = {
  'Healthcare': {
    bg: 'bg-rose-subtle/40',
    text: 'text-burgundy-dark',
    border: 'border-rose-muted/40'
  },
  'Cybersecurity': {
    bg: 'bg-beige/50',
    text: 'text-burgundy',
    border: 'border-beige-dark/60'
  },
  'Artificial Intelligence': {
    bg: 'bg-burgundy/10',
    text: 'text-burgundy',
    border: 'border-burgundy/20'
  },
  'IoT': {
    bg: 'bg-antique/15',
    text: 'text-antique-dark',
    border: 'border-antique/30'
  },
  'Web Development': {
    bg: 'bg-beige-light',
    text: 'text-ink-primary',
    border: 'border-border'
  },
  'Education': {
    bg: 'bg-rose-soft/50',
    text: 'text-burgundy-secondary',
    border: 'border-rose-muted/30'
  }
};

export default function DomainBadge({ domain, size = 'sm' }) {
  const style = DOMAIN_STYLES[domain] || {
    bg: 'bg-ivory-muted',
    text: 'text-ink-secondary',
    border: 'border-border'
  };

  const sizeClasses = size === 'xs'
    ? 'text-xs px-2 py-0.5'
    : size === 'md'
    ? 'text-sm px-3 py-1'
    : 'text-xs px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center font-medium tracking-wide uppercase rounded border ${style.bg} ${style.text} ${style.border} ${sizeClasses}`}
      style={{ letterSpacing: '0.04em' }}
    >
      {domain}
    </span>
  );
}
