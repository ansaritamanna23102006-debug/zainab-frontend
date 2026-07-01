import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  className,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  type = 'button',
  disabled = false,
  onClick,
  href,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-medium rounded-full transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 hover:shadow-lg';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white hover:shadow-primary/10 shadow-sm border border-transparent',
    secondary: 'bg-white hover:bg-slate-50 text-accent hover:shadow-slate-200/50 shadow-sm border border-slate-200',
    accent: 'bg-accent hover:bg-accent-hover text-white hover:shadow-slate-900/10 shadow-sm border border-transparent',
    outline: 'border border-primary text-primary hover:bg-accent-light bg-transparent',
    ghost: 'hover:bg-slate-50 text-slate-600 hover:text-accent bg-transparent hover:shadow-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('https://') || href.startsWith('wa.me');
    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClassName}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
