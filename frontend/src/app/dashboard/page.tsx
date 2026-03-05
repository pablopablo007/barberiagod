'use client';

import { Users, DollarSign, Calendar, Scissors, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const stats = [
    { title: 'Ingresos Mensuales', value: '$4,231', icon: DollarSign, trend: '+12.5%' },
    { title: 'Citas Hoy', value: '24', icon: Calendar, trend: '+4' },
    { title: 'Nuevos Clientes', value: '12', icon: Users, trend: '+2' },
    { title: 'Corte Estrella', value: 'Mid Fade', icon: Scissors, trend: '' },
];

export default function DashboardHome() {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Vistazo General</h1>
                    <p className="text-zinc-500 mt-1 font-medium">Última actualización: Hoy, 10:24 AM</p>
                </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-[#111111] p-6 rounded-2xl border border-white/5 hover:border-[#C9A84C]/30 transition-all relative overflow-hidden group shadow-sm">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#C9A84C]/5 rounded-full blur-2xl group-hover:bg-[#C9A84C]/10 transition-colors" />

                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <p className="text-sm font-bold text-zinc-500 mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
                            </div>
                            <div className="w-12 h-12 bg-[#0A0A0A] rounded-xl border border-white/5 flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-[#C9A84C]" />
                            </div>
                        </div>
                        {stat.trend && (
                            <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex items-center text-sm">
                                <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{stat.trend}</span>
                                <span className="text-zinc-500 ml-2 font-medium text-xs">vs mes anterior</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico Demo */}
                <div className="lg:col-span-2 bg-[#111111] p-6 rounded-2xl border border-white/5 h-[420px] shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6">Ingresos de la Semana</h3>
                    <div className="flex-1 flex items-end justify-between px-2 pb-6 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-b border-white/5" />)}
                        </div>

                        {/* Bars */}
                        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                            <div key={i} className="w-[8%] group relative z-10 flex flex-col items-center justify-end h-full">
                                <div className="w-full bg-gradient-to-t from-[#C9A84C]/20 to-[#C9A84C] rounded-t-md transition-all hover:opacity-80" style={{ height: `${h}%` }} />
                                <span className="absolute -bottom-6 text-xs font-bold text-zinc-500">
                                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Próximas Citas */}
                <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Próximas Citas</h3>
                        <Link href="/dashboard/appointments" className="text-xs font-bold text-[#C9A84C] hover:text-[#b5953e] transition-colors">Ver todas</Link>
                    </div>
                    <div className="space-y-3 flex-1">
                        {[
                            { client: 'Carlos A.', service: 'Corte + Barba', time: '11:00 AM', barber: 'Marcos G.' },
                            { client: 'Luis M.', service: 'Mid Fade', time: '11:45 AM', barber: 'Juan P.' },
                            { client: 'Diego R.', service: 'Corte Premium', time: '12:30 PM', barber: 'Marcos G.' },
                            { client: 'Andrés V.', service: 'Taper Fade', time: '01:00 PM', barber: 'Marcos G.' },
                        ].map((cita, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-[#C9A84C]/20 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center text-[#C9A84C] font-extrabold text-sm">
                                    {cita.client.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{cita.client}</p>
                                    <p className="text-xs text-zinc-500 truncate">{cita.service}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs font-bold text-[#C9A84C]">{cita.time}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{cita.barber}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#C9A84C] transition-colors hidden sm:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
