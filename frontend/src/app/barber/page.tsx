'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const mockAppointments = [
    { id: 1, client: 'Andrés López', service: 'Corte Premium', time: '09:00', duration: 45, status: 'CONFIRMED' },
    { id: 2, client: 'Marco Ruiz', service: 'Arreglo de Barba', time: '10:00', duration: 30, status: 'PENDING' },
    { id: 3, client: 'Luis Torres', service: 'Combo Corte+Barba', time: '11:30', duration: 75, status: 'CONFIRMED' },
    { id: 4, client: 'Diego Morales', service: 'Corte Premium', time: '14:00', duration: 45, status: 'PENDING' },
];

const statusStyles: Record<string, string> = {
    CONFIRMED: 'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20',
    PENDING: 'bg-[#111111] text-zinc-400 border border-white/10',
    COMPLETED: 'bg-zinc-800/50 text-zinc-500',
    CANCELLED: 'bg-rose-500/10 text-rose-400',
};

const statusLabels: Record<string, string> = {
    CONFIRMED: 'Confirmada', PENDING: 'Pendiente', COMPLETED: 'Completada', CANCELLED: 'Cancelada',
};

export default function BarberPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (!u) { router.push('/login'); return; }
        const parsed = JSON.parse(u);
        if (parsed.role !== 'BARBER') { router.push('/login'); return; }
        setUser(parsed);
    }, []);

    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Mi Agenda</h1>
                <p className="text-sm text-zinc-500 mt-1 capitalize font-medium">{today}</p>
            </div>

            {/* Stats del día */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: 'Citas Hoy', value: mockAppointments.length, color: 'text-white' },
                    { label: 'Confirmadas', value: mockAppointments.filter(a => a.status === 'CONFIRMED').length, color: 'text-[#C9A84C]' },
                    { label: 'Pendientes', value: mockAppointments.filter(a => a.status === 'PENDING').length, color: 'text-zinc-400' },
                    { label: 'Horas Trabajadas', value: '6h 30m', color: 'text-white' },
                ].map(stat => (
                    <div key={stat.label} className="bg-[#111111] p-5 rounded-2xl border border-white/5 shadow-sm relative overflow-hidden group hover:border-[#C9A84C]/30 transition-all">
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#C9A84C]/5 rounded-full blur-xl group-hover:bg-[#C9A84C]/10 transition-colors" />
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider relative z-10">{stat.label}</p>
                        <p className={`text-3xl font-extrabold mt-2 relative z-10 ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Lista de citas */}
            <div>
                <h2 className="text-xl font-bold text-white mb-6">Próximos Turnos</h2>
                <div className="space-y-4">
                    {mockAppointments.map(a => (
                        <div key={a.id} className="bg-[#111111] p-5 rounded-2xl border border-white/5 flex items-center gap-6 hover:border-[#C9A84C]/30 transition-all shadow-sm group">
                            <div className="w-16 text-center flex-shrink-0">
                                <p className="text-[#C9A84C] font-extrabold text-lg">{a.time}</p>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{a.duration} min</p>
                            </div>

                            <div className="w-px h-12 bg-white/5" />

                            <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-base truncate">{a.client}</p>
                                <p className="text-zinc-500 text-sm mt-0.5 truncate">{a.service}</p>
                            </div>

                            <span className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${statusStyles[a.status]}`}>
                                {statusLabels[a.status]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
