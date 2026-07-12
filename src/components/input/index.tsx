import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightElement, className = '', containerClassName = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label className="text-[14px] text-primary-text font-medium ml-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            className={`w-full h-11 px-4 bg-ui-surface border border-ui-border rounded-lg text-[14px] text-white placeholder-ui-muted transition-colors focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            } ${rightElement ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 text-ui-muted flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <span className="text-red-400 text-xs ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
