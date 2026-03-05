'use client';

import { useState } from 'react';
import { Star, Check, Scissors, Calendar } from 'lucide-react';
import Link from 'next/link';

const APPOINTMENTS = [
    { id: 1, service: 'Corte Premium', barber: 'Marcos García', barberImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', date: '2026-03-10', time: '10:00', status: 'CONFIRMED', price: 25, reviewed: false },
    { id: 2, service: 'Arreglo de Barba', barber: 'Marcos García', barberImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', date: '2026-02-28', time: '11:00', status: 'COMPLETED', price: 15, reviewed: false },
    { id: 3, service: 'Combo Corte+Barba', barber: 'Carlos Ruiz', barberImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', date: '2026-02-14', time: '09:00', status: 'COMPLETED', price: 35, reviewed: true, rating: 5, comment: 'Excelente servicio, muy profesional' },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
    CONFIRMED: { label: 'Confirmada', cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    PENDING: { label: 'Pendiente', cls: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
    COMPLETED: { label: 'Completada', cls: 'bg-zinc-700/50 text-zinc-400' },
    CANCELLED: { label: 'Cancelada', cls: 'bg-rose-500/10 text-rose-400' },
};

export default function ClientAppointmentsPage() {
    const [appts, setAppts] = useState(APPOINTMENTS);
    const [reviewing, setReviewing] = useState<number | null>(null);
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'history'>('all');

    const submitReview = (id: number) => {
        setAppts(prev => prev.map(a => a.id === id ? { ...a, reviewed: true, rating, comment } : a));
        setReviewing(null);
        setRating(0);
        setComment('');
    };

    const filtered = appts.filter(a => {
        if (filter === 'upcoming') return a.status === 'CONFIRMED' || a.status === 'PENDING';
        if (filter === 'history') return a.status === 'COMPLETED' || a.status === 'CANCELLED';
        return true;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">Mis Citas</h1>
                <p className="text-sm text-zinc-400 mt-0.5">Próximas reservas e historial</p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 p-1 bg-zinc-900 rounded-2xl">
                {[['all', 'Todas'], ['upcoming', 'Próximas'], ['history', 'Historial']].map(([val, lbl]) => (
                    <button key={val} onClick={() => setFilter(val as any)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${filter === val ? 'bg-[#d4af37] text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>
                        {lbl}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-12 text-zinc-600">
                    <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No hay citas en esta sección</p>
                    <Link href="/client/book" className="mt-3 inline-block text-xs text-[#d4af37]">Reservar ahora →</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map(a => (
                        <div key={a.id} className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                            <div className="p-4 flex items-center gap-3">
                                <img src={a.barberImg} alt={a.barber} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold text-sm truncate">{a.service}</p>
                                    <p className="text-zinc-500 text-xs">con {a.barber}</p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-zinc-600">
                                        <Calendar className="w-3 h-3" />{a.date} · {a.time}
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${statusConfig[a.status].cls}`}>
                                        {statusConfig[a.status].label}
                                    </span>
                                    <p className="text-[#d4af37] font-bold text-sm mt-1">${a.price}</p>
                                </div>
                            </div>

                            {/* Completed + not reviewed */}
                            {a.status === 'COMPLETED' && !a.reviewed && reviewing !== a.id && (
                                <div className="px-4 pb-4">
                                    <button onClick={() => setReviewing(a.id)}
                                        className="w-full py-2.5 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold rounded-xl hover:bg-[#d4af37]/5 transition-colors flex items-center justify-center gap-2">
                                        <Star className="w-3.5 h-3.5" />
                                        Calificar este servicio
                                    </button>
                                </div>
                            )}

                            {/* Review form */}
                            {reviewing === a.id && (
                                <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3 animate-fade-in">
                                    <p className="text-xs font-medium text-zinc-400">¿Cómo fue tu experiencia?</p>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <button key={s} onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)} onClick={() => setRating(s)}>
                                                <Star className={`w-8 h-8 ${s <= (hovered || rating) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-zinc-700'} transition-colors`} />
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl px-3 py-2 resize-none min-h-[72px] focus:outline-none focus:border-[#d4af37]/50"
                                        placeholder="Comparte tu experiencia (opcional)..."
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={() => setReviewing(null)} className="flex-1 py-2 text-xs text-zinc-500 border border-zinc-800 rounded-xl">Cancelar</button>
                                        <button onClick={() => submitReview(a.id)} disabled={!rating}
                                            className="flex-1 py-2 text-xs font-bold bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black rounded-xl disabled:opacity-30 flex items-center justify-center gap-1.5">
                                            <Check className="w-3.5 h-3.5" />
                                            Enviar Reseña
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Already reviewed */}
                            {a.reviewed && a.rating && a.status === 'COMPLETED' && (
                                <div className="px-4 pb-4 border-t border-white/5 pt-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-0.5">
                                            {Array(5).fill(0).map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < (a.rating || 0) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-zinc-700'}`} />
                                            ))}
                                        </div>
                                        <p className="text-xs text-zinc-500 italic">"{a.comment}"</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
