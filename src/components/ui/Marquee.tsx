'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal marquee. Duplicates its children once and translates
 * -50% so the loop is seamless. Direction-agnostic (works under RTL because it
 * animates transform, not layout).
 */
export function Marquee({
  children,
  speed = 34,
  reverse = false,
  className,
  itemClassName,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn('marquee-mask group/marquee relative w-full overflow-hidden', className)}
    >
      <div
        className={cn(
          'flex w-max',
          reverse ? 'animate-marquee-rev' : 'animate-marquee',
          pauseOnHover && 'group-hover/marquee:[animation-play-state:paused]',
        )}
        style={{ ['--marquee-duration' as string]: `${speed}s` }}
      >
        <div className={cn('flex shrink-0 items-center', itemClassName)} aria-hidden={false}>
          {children}
        </div>
        <div className={cn('flex shrink-0 items-center', itemClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
