import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
                    {
                        'bg-[#C9A84C] text-black hover:bg-[#b5953e] shadow-[0_0_15px_rgba(201,168,76,0.2)] hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]': variant === 'primary',
                        'bg-[#111111] text-white hover:bg-[#181818] border border-white/10 hover:border-white/20 shadow-sm': variant === 'secondary',
                        'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40': variant === 'danger',
                        'border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10': variant === 'outline',
                        'hover:bg-[#111111] text-zinc-400 hover:text-white': variant === 'ghost',

                        'h-8 px-4 text-xs': size === 'sm',
                        'h-11 px-6': size === 'md',
                        'h-14 px-8 text-base': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';
