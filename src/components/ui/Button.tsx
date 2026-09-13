import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-bold transition-colors duration-200";
  const variants = {
    primary: "bg-[#5C167D] text-white hover:bg-[#4A1066]",
    secondary: "bg-[#c9a24b] text-white hover:bg-[#b89139]",
    outline: "border-2 border-[#5C167D] text-[#5C167D] hover:bg-theme-cream",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};
