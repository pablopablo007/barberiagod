'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
    LayoutDashboard, CalendarDays, Users, Scissors,
    PackageSearch, Tag, Settings, LogOut
} from 'lucide-react';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/appointments', label: 'Citas', icon: CalendarDays },
    { href: '/dashboard/barbers', label: 'Barberos', icon: Users },
    { href: '/dashboard/services', label: 'Servicios', icon: Scissors },
    { href: '/dashboard/inventory', label: 'Inventario', icon: PackageSearch },
    { href: '/dashboard/promotions', label: 'Promociones', icon: Tag },
    { href: '/dashboard/settings', label: 'Configuración', icon: Settings },
];

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function Sidebar() {
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
                <p className="text-xs text-zinc-600 mt-1">Panel de Propietario</p>
            </div>

            <div className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                                isActive
                                    ? 'bg-[#d4af37]/10 text-[#d4af37]'
                                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                            )}
                        >
                            <Icon className={cn('w-5 h-5', isActive ? 'text-[#d4af37]' : 'text-zinc-500 group-hover:text-zinc-300')} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}
