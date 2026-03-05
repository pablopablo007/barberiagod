'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Clock, ChevronRight, Scissors, Star, CalendarDays, Gift, CalendarCheck, Tag } from 'lucide-react';

/* ─── DATA ──────────────────────────────────────────────────────── */
const promotions = [
    { id: 1, title: 'Lunes de Corte', desc: '20% off en cualquier servicio', code: 'LUNES20', color: 'from-[#181818] to-[#111111]' },
    { id: 2, title: 'Estreno del Mes', desc: '10% off en tu primer corte del mes', code: 'MES10', color: 'from-[#181818] to-[#111111]' },
    { id: 3, title: 'Trae un Amigo', desc: '2 cortes por el precio de 1.5', code: 'AMIGO50', color: 'from-[#181818] to-[#111111]' },
];

const nearbyShops = [
    { id: 1, name: 'Elite Cut Barber', rating: 4.9, dist: '0.3 km', open: true, wait: '10 min' },
    { id: 2, name: "The Gentleman's Club", rating: 4.7, dist: '0.8 km', open: true, wait: '25 min' },
    { id: 3, name: 'Razor Sharp', rating: 4.5, dist: '1.2 km', open: false, wait: 'Cierra 18:00' },
];

const quickActions = [
    { icon: CalendarDays, label: 'Reservar Cita', href: '/client/book', color: 'text-[#C9A84C]' },
    { icon: Scissors, label: 'Estilos', href: '/client/catalog', color: 'text-white' },
    { icon: Star, label: 'Mis Puntos', href: '/client/loyalty', color: 'text-[#C9A84C]' },
    { icon: CalendarCheck, label: 'Mis Citas', href: '/client/appointments', color: 'text-white' },
];

export default function ClientHomePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (!u) { router.push('/login'); return; }
        const parsed = JSON.parse(u);
        if (parsed.role !== 'CLIENT') { router.push('/login'); return; }
        setUser(parsed);
    }, []);

    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* ── 2. HERO / BIENVENIDA ─────────────────────────────────── */}
            <div className="pt-4 space-y-5">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Bienvenido, {user?.name?.split(' ')[0] || 'Andrés'}</h1>
                    <p className="text-zinc-400 text-sm mt-1">¿Qué estilo buscas hoy?</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        className="w-full bg-[#111111] border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#C9A84C]/50 transition-colors shadow-sm"
                        placeholder="Buscar servicio o estilo..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* ── 3. ACCIONES RÁPIDAS (4 botones en fila) ─────────────── */}
            <div className="grid grid-cols-4 gap-3">
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <Link key={i} href={action.href} className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 bg-[#111111] border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-[#C9A84C]/30 group-hover:bg-[#181818] transition-all shadow-sm">
                                <Icon className={`w-6 h-6 ${action.color}`} />
                            </div>
                            <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-white transition-colors">{action.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* ── 4. CARD PRÓXIMA CITA (Destacada en Dorado) ──────────── */}
            <Link href="/client/book" className="block">
                <div className="bg-[#C9A84C] p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform shadow-[0_8px_30px_rgba(201,168,76,0.15)]">
                    {/* Decals background */}
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute right-0 bottom-0 p-4 opacity-20">
                        <Scissors className="w-24 h-24 text-black" />
                    </div>

                    <div className="relative z-10 w-4/5">
                        <p className="text-black/70 text-xs font-bold uppercase tracking-widest mb-1.5">Reserva Rápida</p>
                        <h2 className="text-black font-extrabold text-2xl leading-tight">Agenda tu próxima cita</h2>

                        <div className="flex items-center gap-2 mt-4 text-black/80 text-sm font-semibold">
                            <span>Elige tu corte</span>
                            <ChevronRight className="w-4 h-4 opacity-50" />
                            <span>Barbero</span>
                            <ChevronRight className="w-4 h-4 opacity-50" />
                            <span>Fecha</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* ── 5. SECCIÓN PROMOCIONES (Carrusel Horizontal) ────────── */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                        <Tag className="w-5 h-5 text-[#C9A84C]" />
                        Promociones
                    </h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide snap-x snap-mandatory">
                    {promotions.map(promo => (
                        <div
                            key={promo.id}
                            className={`min-w-[260px] flex-shrink-0 snap-start bg-gradient-to-br ${promo.color} p-5 rounded-3xl border border-white/5 shadow-sm`}
                        >
                            <h3 className="font-bold text-base text-white">{promo.title}</h3>
                            <p className="text-sm mt-1 text-zinc-400">{promo.desc}</p>

                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                <code className="font-bold tracking-widest text-xs text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1.5 rounded-lg">{promo.code}</code>
                                <Link href="/client/book" className="text-xs font-bold text-white hover:text-[#C9A84C] transition-colors">
                                    Canjear →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── 6. SECCIÓN CERCA DE TI (Lista de Barberías) ─────────── */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                        <MapPin className="w-5 h-5 text-[#C9A84C]" />
                        Cerca de ti
                    </h2>
                </div>
                <div className="space-y-3">
                    {nearbyShops
                        .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()))
                        .map(shop => (
                            <Link key={shop.id} href="/client/book" className="block">
                                <div className="bg-[#111111] p-4 rounded-2xl border border-white/5 hover:bg-[#181818] hover:border-[#C9A84C]/20 transition-all group shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-[#0A0A0A] rounded-2xl border border-white/5 flex items-center justify-center flex-shrink-0">
                                            <Scissors className="w-6 h-6 text-[#C9A84C]" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-white font-bold text-base truncate">{shop.name}</p>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0 uppercase tracking-wider ${shop.open ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#181818] text-zinc-500'}`}>
                                                    {shop.open ? 'Abierto' : 'Cerrado'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-1.5">
                                                <span className="flex items-center gap-1.5 text-sm text-zinc-400 font-medium">
                                                    <Star className="w-3.5 h-3.5 text-[#C9A84C] fill-[#C9A84C]" />
                                                    {shop.rating}
                                                </span>
                                                <div className="w-1 h-1 rounded-full bg-zinc-700" />
                                                <span className="flex items-center gap-1.5 text-sm text-zinc-400 font-medium">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {shop.dist}
                                                </span>
                                                <div className="w-1 h-1 rounded-full bg-zinc-700" />
                                                <span className="flex items-center gap-1.5 text-sm text-zinc-400 font-medium">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {shop.wait}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-[#C9A84C] transition-colors flex-shrink-0" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>

        </div>
    );
}
