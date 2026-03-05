'use client';

import { DollarSign, TrendingUp, Scissors, Calendar } from 'lucide-react';

const mockData = [
    { month: 'Ene', income: 1200 },
    { month: 'Feb', income: 1450 },
    { month: 'Mar', income: 1800, current: true },
];

const recentPayments = [
    { client: 'Andrés López', service: 'Corte Premium', amount: 25, date: '2026-03-05' },
    { client: 'Marco Ruiz', service: 'Arreglo de Barba', amount: 15, date: '2026-03-05' },
    { client: 'Luis Torres', service: 'Combo Corte+Barba', amount: 35, date: '2026-03-04' },
    { client: 'Diego Morales', service: 'Corte Premium', amount: 25, date: '2026-03-04' },
];

export default function BarberIncomePage() {
    const total = recentPayments.reduce((s, p) => s + p.amount, 0);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Mis Ingresos</h1>
                <p className="text-sm text-zinc-400 mt-1">Resumen de ganancias generadas</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Este mes', value: '$1,800', icon: DollarSign, color: 'text-[#d4af37]' },
                    { label: 'Esta semana', value: '$' + total, icon: TrendingUp, color: 'text-emerald-400' },
                    { label: 'Cortes hoy', value: '4', icon: Scissors, color: 'text-blue-400' },
                    { label: 'Próx. cita', value: '09:00', icon: Calendar, color: 'text-purple-400' },
                ].map(stat => (
                    <div key={stat.label} className="glass-panel p-5 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-zinc-500">{stat.label}</p>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Pagos Recientes</h2>
                <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-white/5">
                            <tr>
                                {['Cliente', 'Servicio', 'Fecha', 'Monto'].map(h => (
                                    <th key={h} className="px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-left">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentPayments.map((p, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-3 text-sm text-white font-medium">{p.client}</td>
                                    <td className="px-5 py-3 text-sm text-zinc-400">{p.service}</td>
                                    <td className="px-5 py-3 text-sm text-zinc-500">{p.date}</td>
                                    <td className="px-5 py-3 text-sm text-[#d4af37] font-bold">${p.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
