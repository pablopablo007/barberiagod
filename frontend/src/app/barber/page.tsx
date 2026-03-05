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
    CONFIRMED: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    PENDING: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    COMPLETED: 'bg-zinc-700/50 text-zinc-400',
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
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Mi Agenda</h1>
                <p className="text-sm text-zinc-400 mt-1 capitalize">{today}</p>
            </div>

            {/* Stats del día */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Citas hoy', value: mockAppointments.length, color: 'text-[#d4af37]' },
                    { label: 'Confirmadas', value: mockAppointments.filter(a => a.status === 'CONFIRMED').length, color: 'text-emerald-400' },
                    { label: 'Pendientes', value: mockAppointments.filter(a => a.status === 'PENDING').length, color: 'text-amber-400' },
                    { label: 'Horas trabajadas', value: '6h 30m', color: 'text-blue-400' },
                ].map(stat => (
                    <div key={stat.label} className="glass-panel p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-zinc-500">{stat.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Lista de citas */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Citas del día</h2>
                <div className="space-y-3">
                    {mockAppointments.map(a => (
                        <div key={a.id} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:bg-[#1a1a1a] transition-colors">
                            <div className="w-14 text-center">
                                <p className="text-[#d4af37] font-bold text-sm">{a.time}</p>
                                <p className="text-zinc-600 text-xs">{a.duration}min</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="flex-1">
                                <p className="text-white font-medium text-sm">{a.client}</p>
                                <p className="text-zinc-500 text-xs mt-0.5">{a.service}</p>
                            </div>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[a.status]}`}>
                                {statusLabels[a.status]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
