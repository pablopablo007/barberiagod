'use client';

import { Users, DollarSign, Calendar, Scissors } from 'lucide-react';

const stats = [
    { title: 'Ingresos Mensuales', value: '$45,231', icon: DollarSign, trend: '+12.5%' },
    { title: 'Citas Hoy', value: '24', icon: Calendar, trend: '+4' },
    { title: 'Nuevos Clientes', value: '12', icon: Users, trend: '+2' },
    { title: 'Servicios Populares', value: 'Corte Premium', icon: Scissors, trend: '' },
];

export default function DashboardHome() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white tracking-tight">Vistazo General</h1>
                <p className="text-sm text-zinc-500">Última actualización: Hoy, 10:24 AM</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.title} className="glass-panel p-6 rounded-2xl gold-border hover:bg-[#1a1a1a] transition-colors relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-xl group-hover:bg-[#d4af37]/20 transition-colors" />
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-zinc-400 mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                            <div className="p-2 bg-black/50 rounded-lg border border-white/5">
                                <stat.icon className="w-5 h-5 text-[#d4af37]" />
                            </div>
                        </div>
                        {stat.trend && (
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-emerald-500 font-medium">{stat.trend}</span>
                                <span className="text-zinc-500 ml-2">vs mes anterior</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 h-[400px]">
                    <h3 className="text-lg font-medium text-white mb-4">Ingresos (Demo Gráfico)</h3>
                    <div className="w-full h-[300px] flex items-end justify-between p-4 bg-black/40 rounded-xl relative">
                        {/* Simple CSS bar chart visualization */}
                        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                            <div key={i} className="w-[10%] bg-gradient-to-t from-[#d4af37]/20 to-[#d4af37] rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                        <div className="absolute inset-x-0 bottom-0 border-b border-white/10" />
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-medium text-white mb-4">Próximas Citas</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-black/50 border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#d4af37] font-medium">
                                    CA
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">Carlos Andrade</p>
                                    <p className="text-xs text-zinc-500">Corte Clásico + Barba</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-[#d4af37]">11:00 AM</p>
                                    <p className="text-xs text-zinc-500">Marcos G.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
