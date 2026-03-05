'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarDays, ImageIcon, DollarSign, User, LogOut } from 'lucide-react';

const navItems = [
    { href: '/barber', label: 'Mi Agenda', icon: CalendarDays },
    { href: '/barber/photos', label: 'Mis Fotos', icon: ImageIcon },
    { href: '/barber/income', label: 'Mis Ingresos', icon: DollarSign },
    { href: '/barber/profile', label: 'Mi Perfil', icon: User },
];

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function BarberSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <div className="flex flex-col w-64 h-screen border-r border-white/10 bg-[#0a0a0a] sticky top-0">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white tracking-tight">
                    Elite Cut <span className="gold-gradient-text">Barber</span>
                </h2>
                <p className="text-xs text-zinc-600 mt-1">Panel de Barbero</p>
            </div>

            <div className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/barber' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                                isActive ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                            )}
                        >
                            <Icon className={cn('w-5 h-5', isActive ? 'text-[#d4af37]' : 'text-zinc-500')} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/10">
                <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}
