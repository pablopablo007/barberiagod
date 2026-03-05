'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarDays, ImageIcon, DollarSign, User, LogOut, Scissors } from 'lucide-react';

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
        <div className="flex flex-col w-64 h-screen border-r border-white/5 bg-[#111111] sticky top-0 shadow-xl">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-[#C9A84C]" />
                    Elite Cut <span className="text-[#C9A84C]">Barber</span>
                </h2>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-bold">Panel de Barbero</p>
            </div>

            <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/barber' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative',
                                isActive
                                    ? 'bg-[#C9A84C]/10 text-[#C9A84C] shadow-[inset_2px_0_0_0_#C9A84C]'
                                    : 'text-zinc-500 hover:bg-[#181818] hover:text-white'
                            )}
                        >
                            <Icon className={cn('w-5 h-5 transition-transform duration-300', isActive ? 'text-[#C9A84C]' : 'text-zinc-500 group-hover:text-zinc-400 group-hover:scale-110')} />
                            <span className={cn("font-semibold text-sm", isActive ? "text-[#C9A84C]" : "text-zinc-400 group-hover:text-white")}>{item.label}</span>
                            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#C9A84C] rounded-r-md shadow-[0_0_10px_rgba(201,168,76,0.6)]" />}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold text-sm">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}
