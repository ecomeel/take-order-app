import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => {
  const inputClasses = [
    "w-full px-4 py-2.5 rounded-lg border bg-white text-slate-900 text-base",
    "placeholder:text-slate-400 transition-all outline-none",
    error ? 
      "border-red-500 focus:ring-4 focus:ring-red-100" : 
      "border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
  ].join(" ");
  
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-slate-700 ml-1">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={inputClasses}
      />
      {error && <span className="text-xs font-medium text-red-600 ml-1">{error}</span>}
    </div>
  )
});

Input.displayName = 'Input';