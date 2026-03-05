'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Scissors, Users, CalendarDays, Gift, User, LogOut, Search } from 'lucide-react';

const navItems = [
    { href: '/client', label: 'Inicio', icon: Home },
    { href: '/client/catalog', label: 'Estilos', icon: Scissors },
    { href: '/client/barbers', label: 'Barberos', icon: Users },
    { href: '/client/loyalty', label: 'Puntos', icon: Gift },
    { href: '/client/profile', label: 'Perfil', icon: User },
];

function cn(...c: string[]) { return c.filter(Boolean).join(' '); }

export function ClientNav() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <>
            {/* 1. HEADER DESKTOP (PC) */}
            <nav className="hidden md:flex sticky top-0 z-50 items-center justify-between px-8 py-4 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
                {/* Izquierda: Logo y Buscador Integrado */}
                <div className="flex items-center gap-8">
                    <Link href="/client" className="flex items-center gap-2.5">
                        <Scissors className="w-6 h-6 text-[#C9A84C]" />
                        <span className="text-white font-extrabold text-xl tracking-tight">
                            Elite Cut <span className="text-[#C9A84C]">Barber</span>
                        </span>
                    </Link>
                    <div className="hidden lg:flex items-center bg-[#111] border border-white/5 rounded-full px-4 py-2 w-64 focus-within:border-[#C9A84C]/50 transition-colors">
                        <Search className="w-4 h-4 text-zinc-500 mr-2" />
                        <input type="text" placeholder="Buscar cortes, barberos..." className="bg-transparent border-none text-sm text-white w-full focus:outline-none" />
                    </div>
                </div>

                {/* Centro: Navegación de Texto */}
                <div className="flex items-center gap-1">
                    {navItems.map(n => {
                        const isActive = pathname === n.href || (n.href !== '/client' && pathname.startsWith(n.href));
                        return (
                            <Link
                                key={n.href}
                                href={n.href}
                                className={cn('text-sm font-semibold px-4 py-2 rounded-xl transition-all', isActive ? 'bg-[#C9A84C]/10 text-[#C9A84C] shadow-[inset_0_1px_0_0_rgba(201,168,76,0.2)]' : 'text-zinc-400 hover:text-white hover:bg-white/5')}
                            >
                                {n.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Derecha: Acciones Rápidas */}
                <div className="flex items-center gap-3">
                    <Link href="/client/loyalty" className="flex items-center gap-2 bg-[#111] border border-white/5 px-4 py-2 rounded-xl hover:border-[#C9A84C]/30 transition-colors">
                        <Gift className="w-4 h-4 text-[#C9A84C]" />
                        <span className="text-white text-sm font-bold">350 pts</span>
                    </Link>
                    <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#111] border border-white/5 text-zinc-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 transition-all">
                        <LogOut className="w-4 h-4" />
                    </button>
                    <Link href="/client/book" className="bg-[#C9A84C] text-black text-sm font-bold px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(201,168,76,0.2)] flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        Agendar Ahora
                    </Link>
                </div>
            </nav>

            {/* 2. HEADER MOBILE (Celular - Top Bar simplificada o Logo) */}
            <nav className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
                <Link href="/client" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#111] rounded-lg flex items-center justify-center border border-white/5">
                        <Scissors className="w-4 h-4 text-[#C9A84C]" />
                    </div>
                    <span className="text-white font-bold text-base tracking-tight">EliteCut</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Link href="/client/loyalty" className="flex items-center gap-1.5 bg-[#C9A84C]/10 px-3 py-1.5 rounded-full border border-[#C9A84C]/20">
                        <Gift className="w-3.5 h-3.5 text-[#C9A84C]" />
                        <span className="text-[#C9A84C] text-xs font-bold">350</span>
                    </Link>
                    <button onClick={handleLogout} className="p-2 text-zinc-500">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* 3. BOTTOM TAB BAR (Celular - Navegación Principal) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5 px-2 safe-area-inset shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between px-1 relative h-16">
                    {navItems.map((n, i) => {
                        const isActive = pathname === n.href || (n.href !== '/client' && pathname.startsWith(n.href));
                        const Icon = n.icon;

                        // Si es el botón central, hacerlo flotante y grande
                        if (i === 2) {
                            return (
                                <Link key={n.href} href="/client/book" className="absolute left-1/2 -translate-x-1/2 -top-6 flex flex-col items-center group">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#b87333] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(201,168,76,0.3)] border-4 border-[#0A0A0A] group-active:scale-95 transition-transform">
                                        <CalendarDays className="w-6 h-6 text-black" />
                                    </div>
                                    <span className="text-[10px] font-bold text-[#C9A84C] mt-1.5">Reservar</span>
                                </Link>
                            );
                        }

                        // Resto de botones
                        return (
                            <Link key={n.href} href={n.href} className="flex-1 flex flex-col items-center justify-center gap-1 h-full py-1">
                                <Icon className={cn('w-5 h-5 transition-all duration-300', isActive ? 'text-[#C9A84C] -translate-y-1' : 'text-zinc-500')} />
                                <span className={cn('text-[10px] font-medium transition-all duration-300 absolute bottom-1', isActive ? 'text-[#C9A84C] opacity-100' : 'text-zinc-500 opacity-0 translate-y-2')}>{n.label}</span>
                                {isActive && <div className="absolute top-0 w-8 h-0.5 bg-[#C9A84C] rounded-b-full shadow-[0_2px_10px_rgba(201,168,76,0.5)]" />}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
