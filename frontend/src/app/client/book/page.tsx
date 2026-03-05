'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Star, User, Scissors, CalendarDays, Clock, CreditCard, Zap, PenLine } from 'lucide-react';
import Link from 'next/link';

/* ─── DATA ──────────────────────────────────────────────────────── */
const CUTS = [
    { id: 1, name: 'Mid Fade', face: 'Redondo, Ovalado', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop' },
    { id: 2, name: 'Low Fade', face: 'Cuadrado, Alargado', img: 'https://images.unsplash.com/photo-1621605815971-fde2af5db0c9?w=200&h=200&fit=crop' },
    { id: 3, name: 'High Fade', face: 'Redondo, Triangular', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&h=200&fit=crop' },
    { id: 4, name: 'Taper Fade', face: 'Ovalado, Cuadrado', img: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=200&h=200&fit=crop' },
    { id: 5, name: 'Skin Fade', face: 'Cualquier rostro', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop' },
    { id: 6, name: 'Buzz Cut', face: 'Ovalado, Cuadrado', img: 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=200&h=200&fit=crop' },
    { id: 7, name: 'Crew Cut', face: 'Todos excepto alargado', img: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=200&h=200&fit=crop' },
    { id: 8, name: 'Undercut', face: 'Cuadrado, Triangular', img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop' },
    { id: 9, name: 'Pompadour', face: 'Alargado, Ovalado', img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&h=200&fit=crop' },
    { id: 10, name: 'Textured Crop', face: 'Diamante, Ovalado', img: 'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?w=200&h=200&fit=crop' },
];

const BARBERS = [
    { id: 1, name: 'Marcos García', specialty: 'Fades', rating: 4.9, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
    { id: 2, name: 'Carlos Ruiz', specialty: 'Barbas', rating: 4.8, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' },
    { id: 3, name: 'Diego Morales', specialty: 'Diseños', rating: 4.7, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' },
];

const SERVICES = [
    { id: 1, name: 'Corte Clásico', price: 20, duration: '30 min' },
    { id: 2, name: 'Corte + Barba', price: 35, duration: '60 min' },
    { id: 3, name: 'Solo Barba', price: 15, duration: '25 min' },
    { id: 4, name: 'Corte Premium', price: 25, duration: '45 min' },
    { id: 5, name: 'Arreglo Completo', price: 50, duration: '90 min' },
];

const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
const TAKEN = ['09:30', '11:00', '14:30', '16:00'];

const WEEK_DAYS = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return { date: d.toISOString().split('T')[0], day: d.toLocaleDateString('es', { weekday: 'short' }).toUpperCase(), num: d.getDate() };
});

const STEPS = ['Tu Corte', 'Barbero', 'Servicio', 'Fecha & Hora', 'Confirmar'];

type Cut = typeof CUTS[0] | { id: 0; name: string; img: string };

export default function BookPage() {
    const [step, setStep] = useState(0);
    const [cut, setCut] = useState<Cut | null>(null);
    const [customCut, setCustomCut] = useState('');
    const [showCustom, setShowCustom] = useState(false);
    const [barber, setBarber] = useState<typeof BARBERS[0] | null>(null);
    const [service, setService] = useState<typeof SERVICES[0] | null>(null);
    const [day, setDay] = useState(WEEK_DAYS[0]);
    const [time, setTime] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    const effectiveCutName = cut?.id === 0 ? customCut : cut?.name;
    const canNext = [!!effectiveCutName, !!barber, !!service, !!(day && time)];

    /* ── Pantalla de éxito ─────────────────────────────────────────── */
    if (confirmed) return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in space-y-6 px-4">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">¡Cita Confirmada! 🎉</h2>
                <p className="text-zinc-400 text-sm mt-2">Recibirás recordatorio 24h y 1h antes</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-white/5 w-full max-w-sm text-left space-y-3">
                <Row icon={Scissors} label="Corte" value={effectiveCutName} />
                <Row icon={User} label="Barbero" value={barber?.name} />
                <Row icon={Scissors} label="Servicio" value={service?.name} />
                <Row icon={CalendarDays} label="Fecha" value={day.date} />
                <Row icon={Clock} label="Hora" value={time} />
                <Row icon={CreditCard} label="Total" value={`$${service?.price}`} gold />
            </div>
            <Link href="/client" className="w-full max-w-sm block text-center py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black font-bold rounded-2xl text-sm hover:opacity-90">
                Volver al Inicio
            </Link>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-6">
            {/* Barra de progreso */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-white">Reservar Cita</h1>
                    <span className="text-xs text-zinc-500">{step + 1}/{STEPS.length}</span>
                </div>
                <div className="flex gap-1.5">
                    {STEPS.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-[#d4af37]' : 'bg-zinc-800'}`} />
                    ))}
                </div>
                <p className="text-sm font-semibold text-[#d4af37]">{STEPS[step]}</p>
            </div>

            {/* ── PASO 0: Seleccionar Corte ────────────────────────────── */}
            {step === 0 && (
                <div className="space-y-4">
                    <p className="text-sm text-zinc-400">Elige el estilo que quieres hoy</p>

                    {/* Grid de cortes */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                        {CUTS.map(c => (
                            <button
                                key={c.id}
                                onClick={() => { setCut(c); setShowCustom(false); setCustomCut(''); }}
                                className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${cut?.id === c.id && !showCustom ? 'border-[#d4af37] scale-[0.97]' : 'border-transparent hover:border-white/20'}`}
                            >
                                <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <p className="absolute bottom-1.5 left-0 right-0 text-white text-[10px] font-semibold text-center px-1 leading-tight">
                                    {c.name}
                                </p>
                                {cut?.id === c.id && !showCustom && (
                                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#d4af37] rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-black" />
                                    </div>
                                )}
                            </button>
                        ))}

                        {/* Opción Personalizado */}
                        <button
                            onClick={() => { setShowCustom(true); setCut({ id: 0, name: 'Personalizado', img: '' }); }}
                            className={`relative rounded-2xl aspect-square border-2 flex flex-col items-center justify-center gap-1.5 transition-all bg-zinc-900 ${showCustom ? 'border-[#d4af37] scale-[0.97]' : 'border-zinc-800 hover:border-zinc-600'}`}
                        >
                            <PenLine className={`w-6 h-6 ${showCustom ? 'text-[#d4af37]' : 'text-zinc-500'}`} />
                            <span className={`text-[10px] font-semibold ${showCustom ? 'text-[#d4af37]' : 'text-zinc-500'}`}>Personalizado</span>
                            {showCustom && (
                                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#d4af37] rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-black" />
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Textarea para personalizado */}
                    {showCustom && (
                        <div className="animate-fade-in glass-panel p-4 rounded-2xl border border-[#d4af37]/30 space-y-2">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <PenLine className="w-4 h-4 text-[#d4af37]" />
                                Describe el corte que quieres
                            </label>
                            <textarea
                                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-3 py-2.5 text-sm resize-none min-h-[90px] focus:outline-none focus:border-[#d4af37]/50 placeholder-zinc-600"
                                placeholder="Ej: Quiero un degradado bajo en los lados con el top largo hacia atrás, barba recortada a 1 cm..."
                                value={customCut}
                                onChange={e => setCustomCut(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Label de selección actual con recomendación de rostro */}
                    {(cut && !showCustom && cut.id !== 0) && (
                        <div className="animate-fade-in bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl p-4 mt-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-[#C9A84C]" />
                                <p className="text-base font-bold text-white">{cut.name} seleccionado</p>
                            </div>
                            <div className="flex items-start gap-2 bg-[#111] p-3 rounded-lg border border-white/5">
                                <User className="w-4 h-4 text-[#C9A84C] mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-zinc-300">Recomendado para rostro:</p>
                                    <p className="text-sm text-[#C9A84C] font-medium leading-tight mt-0.5">{(cut as typeof CUTS[0]).face}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── PASO 1: Barbero ─────────────────────────────────────── */}
            {step === 1 && (
                <div className="space-y-3">
                    <p className="text-sm text-zinc-400">¿Con quién quieres tu {effectiveCutName}?</p>
                    {BARBERS.map(b => (
                        <button key={b.id} onClick={() => setBarber(b)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${barber?.id === b.id ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/5 glass-panel hover:border-white/15'}`}>
                            <img src={b.img} alt={b.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                            <div className="flex-1 text-left">
                                <p className="text-white font-semibold">{b.name}</p>
                                <p className="text-zinc-500 text-xs">{b.specialty}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                                    <span className="text-xs text-zinc-400">{b.rating}</span>
                                </div>
                            </div>
                            {barber?.id === b.id && <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0" />}
                        </button>
                    ))}
                </div>
            )}

            {/* ── PASO 2: Servicio ────────────────────────────────────── */}
            {step === 2 && (
                <div className="space-y-3">
                    {SERVICES.map(s => (
                        <button key={s.id} onClick={() => setService(s)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${service?.id === s.id ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/5 glass-panel hover:border-white/15'}`}>
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm">{s.name}</p>
                                <span className="text-xs font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full mt-1 inline-block">{s.duration}</span>
                            </div>
                            <div className="text-right flex-shrink-0 flex items-center gap-3">
                                <p className="text-[#d4af37] font-bold text-lg">${s.price}</p>
                                {service?.id === s.id && <Check className="w-5 h-5 text-[#d4af37]" />}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* ── PASO 3: Fecha y Hora ─────────────────────────────────── */}
            {step === 3 && (
                <div className="space-y-5">
                    <div>
                        <p className="text-sm font-medium text-zinc-400 mb-3">Selecciona el día</p>
                        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                            {WEEK_DAYS.map(d => (
                                <button key={d.date} onClick={() => { setDay(d); setTime(null); }}
                                    className={`min-w-[52px] flex flex-col items-center py-3 rounded-2xl border transition-all flex-shrink-0 ${day.date === d.date ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-zinc-800 hover:border-zinc-600'}`}>
                                    <span className="text-[10px] font-semibold text-zinc-500">{d.day}</span>
                                    <span className={`text-lg font-bold mt-0.5 ${day.date === d.date ? 'text-[#d4af37]' : 'text-white'}`}>{d.num}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-400 mb-3">Horarios disponibles</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {TIMES.map(t => {
                                const taken = TAKEN.includes(t);
                                const sel = time === t;
                                return (
                                    <button key={t} onClick={() => !taken && setTime(t)} disabled={taken}
                                        className={`py-3 rounded-xl text-sm font-semibold border transition-all ${taken ? 'border-zinc-800 text-zinc-700 cursor-not-allowed line-through' : sel ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' : 'border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900'}`}>
                                        {t}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ── PASO 4: Confirmar ────────────────────────────────────── */}
            {step === 4 && (
                <div className="space-y-4">
                    <div className="glass-panel p-5 rounded-2xl border border-[#d4af37]/20 space-y-3.5">
                        <p className="text-sm font-semibold text-[#d4af37] mb-2">Resumen de tu cita</p>
                        <Row icon={Scissors} label="Corte" value={effectiveCutName} />
                        <div className="h-px bg-white/5" />
                        <Row icon={User} label="Barbero" value={barber?.name} />
                        <Row icon={Scissors} label="Servicio" value={service?.name} />
                        <div className="h-px bg-white/5" />
                        <Row icon={CalendarDays} label="Fecha" value={day.date} />
                        <Row icon={Clock} label="Hora" value={time} />
                        <div className="h-px bg-white/5" />
                        <Row icon={CreditCard} label="Total" value={`$${service?.price}`} gold />
                    </div>
                    <div className="glass-panel p-4 rounded-xl border border-zinc-800 flex items-start gap-3">
                        <Zap className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Recordatorios automáticos <strong className="text-zinc-300">24h</strong> y <strong className="text-zinc-300">1h</strong> antes de tu cita.
                        </p>
                    </div>
                </div>
            )}

            {/* ── Navegación ─────────────────────────────────────────── */}
            <div className="flex gap-3 pt-2 pb-2">
                {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 px-5 py-3.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 rounded-2xl text-sm font-semibold transition-colors">
                        <ChevronLeft className="w-4 h-4" /> Atrás
                    </button>
                )}
                {step < 4 ? (
                    <button onClick={() => setStep(s => s + 1)} disabled={!canNext[step]}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black hover:opacity-90">
                        Siguiente <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button onClick={() => setConfirmed(true)}
                        className="flex-1 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black hover:opacity-90 transition-opacity">
                        Confirmar Reserva ✓
                    </button>
                )}
            </div>
        </div>
    );
}

function Row({ icon: Icon, label, value, gold }: { icon: any; label: string; value?: string | null; gold?: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <Icon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span className="text-zinc-500 text-sm flex-1">{label}</span>
            <span className={`text-sm font-semibold ${gold ? 'text-[#d4af37] text-base' : 'text-white'}`}>{value || '—'}</span>
        </div>
    );
}
