import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'gold' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
        variant === 'default' &&
          'bg-[var(--surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
        variant === 'primary' &&
          'bg-primary-500/12 text-primary-400 border border-primary-500/30',
        variant === 'secondary' &&
          'bg-magenta-500/12 text-magenta-400 border border-magenta-500/30',
        variant === 'gold' &&
          'bg-gold-500/12 text-gold-400 border border-gold-500/30',
        variant === 'outline' &&
          'border border-[var(--color-border)] text-[var(--color-text-muted)]',
        className,
      )}
    >
      {children}
    </span>
  );
}
