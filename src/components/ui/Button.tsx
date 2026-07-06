import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group/btn relative inline-flex items-center justify-center gap-2 font-semibold rounded-full',
          'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
          'disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap active:scale-[0.97]',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-5 py-2.5 text-sm',
          size === 'lg' && 'px-7 py-3.5 text-base',
          // Mint primary — the main action colour
          variant === 'primary' &&
            'bg-primary-500 text-cream hover:bg-primary-400 shadow-[0_0_0_0_rgba(133,57,83,0)] hover:shadow-glow-mint',
          // Purple→pink secondary
          variant === 'secondary' &&
            'bg-gradient-pink-purple text-white hover:shadow-glow-pink',
          variant === 'ghost' &&
            'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--surface)] hover:text-[var(--color-text)]',
          variant === 'outline' &&
            'border border-[var(--color-border)] text-[var(--color-text)] hover:border-primary-400 hover:text-primary-400 hover:shadow-glow-mint',
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
