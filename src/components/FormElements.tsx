import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, required, className, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-zinc-50/50",
          className
        )}
        {...props}
      />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, required, options, className, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-zinc-50/50 appearance-none",
          className
        )}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
