'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ToolItem } from '@/types';

interface ToolIconProps {
  tool: ToolItem;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { img: 18, box: 'w-8 h-8',   label: 'text-[11px]', gap: 'gap-1.5' },
  md: { img: 22, box: 'w-11 h-11', label: 'text-xs',     gap: 'gap-2'   },
  lg: { img: 28, box: 'w-14 h-14', label: 'text-sm',     gap: 'gap-2'   },
};

export function ToolIcon({ tool, size = 'md', showLabel = true, className }: ToolIconProps) {
  const { img, box, label, gap } = sizeMap[size];
  const [imgError, setImgError] = useState(false);

  // Text-only pill fallback (no icon URL / explicit text / failed load)
  if (tool.iconType === 'text' || !tool.iconUrl || imgError) {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-lg font-mono font-semibold text-[11px] whitespace-nowrap px-2.5 py-1.5',
          'border border-[var(--color-border)] bg-[var(--surface)] backdrop-blur-sm',
          'text-[var(--color-text)] hover:border-primary-400/60 transition-colors duration-200',
          className,
        )}
        title={tool.name}
        style={{ boxShadow: tool.color ? `inset 3px 0 0 0 ${tool.color}` : undefined }}
      >
        {tool.name}
      </span>
    );
  }

  return (
    <div className={cn('group/tool flex flex-col items-center', showLabel && gap, className)} title={tool.name}>
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl p-2',
          'border border-[var(--color-border)] bg-[var(--surface)] backdrop-blur-sm',
          'transition-all duration-200 group-hover/tool:-translate-y-1 group-hover/tool:border-primary-400/60 group-hover/tool:shadow-glow-mint',
          box,
        )}
      >
        <Image
          src={tool.iconUrl}
          alt={`${tool.name} logo`}
          width={img}
          height={img}
          className="object-contain"
          unoptimized
          onError={() => setImgError(true)}
        />
      </div>
      {showLabel && (
        <span className={cn('text-center text-[var(--color-text-muted)]', label)}>{tool.name}</span>
      )}
    </div>
  );
}

interface ToolIconRowProps {
  tools: ToolItem[];
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ToolIconRow({ tools, size = 'md', showLabel = true, className }: ToolIconRowProps) {
  return (
    <div className={cn('flex flex-wrap items-start gap-3', className)}>
      {tools.map((tool) => (
        <ToolIcon key={tool.name} tool={tool} size={size} showLabel={showLabel} />
      ))}
    </div>
  );
}
