import React from 'react';
import { cn } from '@/lib/utils';

export default function Textarea({
  label,
  id,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
  error,
  className,
  ...props
}) {
  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-700 tracking-wide font-sans">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-200 resize-none',
          error ? 'border-red-500 focus:ring-red-500/5 focus:border-red-500' : ''
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium pl-1">{error}</span>}
    </div>
  );
}
