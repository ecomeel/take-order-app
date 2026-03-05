import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', disabled, ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 disabled:bg-slate-300 disabled:shadow-none',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:opacity-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-red-100 disabled:bg-red-300',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-50 disabled:text-slate-300',
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-bold transition-all duration-200 
        flex items-center justify-center gap-2
        ${variants[variant]} 
        ${disabled ? 'cursor-not-allowed scale-100' : 'cursor-pointer active:scale-95'} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};