import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base
          'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
          // Sizes
          size === 'sm'  && 'px-4 py-2 text-sm',
          size === 'md'  && 'px-5 py-2.5 text-sm',
          size === 'lg'  && 'px-7 py-3.5 text-base',
          // Variants
          variant === 'primary'   && 'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-glow active:scale-95',
          variant === 'secondary' && 'bg-lavender-100 hover:bg-lavender-200 text-lavender-800 dark:bg-lavender-900/30 dark:hover:bg-lavender-900/50 dark:text-lavender-300',
          variant === 'ghost'     && 'bg-transparent hover:bg-[var(--color-bg-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
          variant === 'outline'   && 'border border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
