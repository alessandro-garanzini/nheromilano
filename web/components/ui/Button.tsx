'use client';

import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-300 ease-out';
  
  const variantClasses = {
    primary: 'bg-nhero-gold text-white hover:bg-nhero-charcoal',
    secondary: 'bg-nhero-charcoal text-white hover:bg-nhero-gold',
    outline: 'border border-white/30 text-white hover:bg-white hover:text-nhero-charcoal backdrop-blur-sm',
    ghost: 'text-nhero-charcoal hover:text-nhero-gold'
  };

  const sizeClasses = {
    small: 'px-5 py-2.5 text-sm',
    medium: 'px-7 py-3.5 text-sm',
    large: 'px-9 py-4 text-base'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('#');
    
    if (isExternal) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
