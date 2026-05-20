import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-[var(--radius-md,14px)] font-medium transition-[var(--animate-transition-default,all_0.3s_ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer overflow-hidden relative';
  
  const variants = {
    primary: 'bg-brand text-[#0D1117] hover:brightness-110 hover:shadow-[0_0_18px_rgba(0,242,255,0.4)]',
    secondary: 'bg-accent text-white hover:brightness-110 hover:shadow-[0_0_18px_rgba(166,130,255,0.4)]',
    outline: 'border border-brand text-brand bg-transparent hover:bg-[rgba(0,242,255,0.08)] hover:shadow-[0_0_18px_rgba(0,242,255,0.2)]',
    ghost: 'hover:bg-ui-surface text-primary-text hover:text-white',
    glass: 'glass-card text-white hover:bg-ui-surface hover:shadow-[0_0_24px_rgba(0,242,255,0.15)] border-ui-border',
  };

  const sizes = {
    sm: 'h-9 px-3 text-[14px]',
    md: 'h-11 px-6 text-[16px]',
    lg: 'h-14 px-8 text-[18px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
