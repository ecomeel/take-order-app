import { SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label, options, ...props }: Props) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
    <select
      {...props}
      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white 
        text-slate-900 text-base outline-none focus:border-blue-600 focus:ring-4 
        focus:ring-blue-50 transition-all appearance-none cursor-pointer"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);