import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default'   && 'bg-[var(--color-bg-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
        variant === 'primary'   && 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
        variant === 'secondary' && 'bg-lavender-100 text-lavender-700 dark:bg-lavender-900/30 dark:text-lavender-300',
        variant === 'outline'   && 'border border-[var(--color-border)] text-[var(--color-text-muted)]',
        className,
      )}
    >
      {children}
    </span>
  );
}
