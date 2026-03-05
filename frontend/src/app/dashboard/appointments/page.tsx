'use client';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, Scissors, User2 } from 'lucide-react';

const mockAppointments = [
    { id: 1, time: '10:00 AM', client: 'Andrés López', service: 'Corte + Barba', status: 'CONFIRMED', barber: 'Marcos G.' },
    { id: 2, time: '11:00 AM', client: 'Carlos Andrade', service: 'Corte Clásico', status: 'PENDING', barber: 'Marcos G.' },
    { id: 3, time: '02:30 PM', client: 'Fernando Ruiz', service: 'Coloración', status: 'CONFIRMED', barber: 'Luis F.' },
    { id: 4, time: '04:00 PM', client: 'Diego Torres', service: 'Skin Fade', status: 'COMPLETED', barber: 'Marcos G.', revenue: '$25.00' },
];

export default function AppointmentsPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Citas Programadas</h1>
                    <p className="text-sm text-zinc-400 mt-1">Lunes, 15 de Octubre 2024</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="hidden sm:inline-flex">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Cambiar Fecha
                    </Button>
                    <Button>
                        Nueva Cita
                    </Button>
                </div>
            </div>

            <div className="flex gap-4 mb-6 overflows-x-auto pb-2 shrink-0 hide-scrollbar">
                {['Todos', 'Marcos G.', 'Luis F.', 'Antonio R.'].map((b, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${i === 0 ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20' : 'bg-black/50 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/5'}`}
                    >
                        {b}
                    </button>
                ))}
            </div>

            <div className="glass-panel rounded-2xl border border-white/10 p-0 md:p-6">
                <div className="space-y-4">
                    {mockAppointments.map((appt) => (
                        <div key={appt.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border border-white/5 bg-black/40 hover:bg-[#1a1a1a] transition-colors group relative overflow-hidden">
                            {appt.status === 'COMPLETED' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />}
                            {appt.status === 'CONFIRMED' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" />}
                            {appt.status === 'PENDING' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />}

                            <div className="w-24 shrink-0 px-2 md:px-4">
                                <span className="text-2xl font-bold text-white tracking-tighter">{appt.time.split(' ')[0]}</span>
                                <span className="text-xs font-medium text-zinc-500 ml-1">{appt.time.split(' ')[1]}</span>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                                        <User2 className="w-5 h-5 text-zinc-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-medium text-white group-hover:text-[#d4af37] transition-colors">{appt.client}</h4>
                                        <span className="text-xs text-zinc-500">Cliente Recurrente</span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-1">
                                    <div className="flex items-center text-sm text-zinc-300">
                                        <Scissors className="w-3.5 h-3.5 mr-2 text-[#d4af37]" />
                                        {appt.service}
                                    </div>
                                    <div className="flex items-center text-xs text-zinc-500">
                                        <User2 className="w-3 h-3 mr-2" />
                                        con {appt.barber}
                                    </div>
                                </div>

                                <div className="flex items-center md:justify-end gap-3">
                                    {appt.status === 'COMPLETED' ? (
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            {appt.revenue}
                                        </span>
                                    ) : (
                                        <>
                                            <Button variant="outline" size="sm" className="hidden md:inline-flex">Reprogramar</Button>
                                            <Button variant={appt.status === 'PENDING' ? 'primary' : 'secondary'} size="sm">
                                                {appt.status === 'PENDING' ? 'Confirmar' : 'Marcar Completado'}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
