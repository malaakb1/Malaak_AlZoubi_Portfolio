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
  sm: { img: 20, label: 'text-xs', gap: 'gap-1',   padding: 'px-2 py-1'    },
  md: { img: 28, label: 'text-xs', gap: 'gap-1.5', padding: 'px-2.5 py-1.5' },
  lg: { img: 36, label: 'text-sm', gap: 'gap-2',   padding: 'px-3 py-2'    },
};

export function ToolIcon({ tool, size = 'md', showLabel = true, className }: ToolIconProps) {
  const { img, label, gap, padding } = sizeMap[size];
  const [imgError, setImgError] = useState(false);

  if (tool.iconType === 'text' || !tool.iconUrl || imgError) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-md font-mono font-semibold text-xs whitespace-nowrap',
          'border border-[var(--color-border)] bg-[var(--color-card)]',
          'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
          'transition-colors duration-150',
          padding,
          className,
        )}
        title={tool.name}
        style={{ borderLeftColor: tool.color ?? undefined }}
      >
        {tool.name}
      </span>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center',
        showLabel ? gap : '',
        className,
      )}
      title={tool.name}
    >
      <div className="relative flex items-center justify-center p-1.5 rounded-md bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-150">
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
        <span className={cn('text-center text-[var(--color-text-muted)]', label)}>
          {tool.name}
        </span>
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
