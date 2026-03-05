'use client';

import { useState } from 'react';
import { Calendar, User, Clock, Scissors, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data para el slug
const tenantInfo = {
    name: 'The Gentleman Barbershop',
    description: 'Cortes clásicos, técnica moderna. Experiencia premium para el hombre de hoy.',
    address: 'Avenida Principal 123, Madrid',
    services: [
        { id: 1, name: 'Corte Premium', price: 25, duration: 45, desc: 'Fade perfecto + lavado con masaje' },
        { id: 2, name: 'Arreglo de Barba', price: 15, duration: 30, desc: 'Toalla caliente, perfilado y aceites' },
        { id: 3, name: 'Combo: Corte + Barba', price: 35, duration: 75, desc: 'La experiencia completa' },
    ],
    barbers: [
        { id: 101, name: 'Marcos G.', role: 'Master Barber', available: true },
        { id: 102, name: 'Luis F.', role: 'Senior Barber', available: true },
    ],
    availableTimes: ['10:00 AM', '11:00 AM', '12:30 PM', '04:00 PM', '05:30 PM']
};

export default function BookingPage({ params }: { params: { slug: string } }) {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const isStep1Complete = selectedService !== null;
    const isStep2Complete = selectedBarber !== null;
    const isStep3Complete = selectedTime !== null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans pb-24">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-zinc-900 border-b border-[#d4af37]/20 flex flex-col items-center justify-center text-center px-4">
                {/* Decorative Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/20 via-black to-black opacity-60" />

                <div className="z-10 bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
                        {tenantInfo.name}
                    </h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
                        {tenantInfo.description}
                    </p>
                    <p className="text-[#d4af37] mt-3 font-medium text-sm">{tenantInfo.address}</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 md:mt-12 space-y-12">

                {/* Step 1: Services */}
                <div className={`transition-opacity duration-300 ${step < 1 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isStep1Complete ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-white border border-white/20'}`}>1</div>
                        <h2 className="text-2xl font-semibold text-white">Selecciona tu Servicio</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {tenantInfo.services.map(s => (
                            <button
                                key={s.id}
                                onClick={() => { setSelectedService(s.id); setStep(2); }}
                                className={`text-left p-5 rounded-xl border transition-all duration-200 ${selectedService === s.id ? 'bg-[#d4af37]/10 border-[#d4af37] ring-1 ring-[#d4af37]' : 'bg-black/50 border-white/10 hover:border-white/30 hover:bg-[#1a1a1a]'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-semibold ${selectedService === s.id ? 'text-[#d4af37]' : 'text-white'}`}>{s.name}</h3>
                                    <span className="font-bold text-white">${s.price}</span>
                                </div>
                                <p className="text-sm text-zinc-500 mb-4">{s.desc}</p>
                                <div className="flex items-center text-xs text-zinc-400 font-medium">
                                    <Clock className="w-3.5 h-3.5 mr-1" />
                                    {s.duration} min
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2: Barbers */}
                <div className={`transition-opacity duration-300 ${step < 2 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isStep2Complete ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-white border border-white/20'}`}>2</div>
                        <h2 className="text-2xl font-semibold text-white">Elige al Barbero</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {tenantInfo.barbers.map(b => (
                            <button
                                key={b.id}
                                onClick={() => { setSelectedBarber(b.id); setStep(3); }}
                                className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200 ${selectedBarber === b.id ? 'bg-[#d4af37]/10 border-[#d4af37] ring-1 ring-[#d4af37]' : 'bg-black/50 border-white/10 hover:border-white/30 hover:bg-[#1a1a1a]'}`}
                            >
                                <div className="w-16 h-16 rounded-full bg-zinc-800 mb-3 flex items-center justify-center text-xl font-bold text-white overflow-hidden">
                                    {b.name.charAt(0)}
                                </div>
                                <h3 className={`font-medium ${selectedBarber === b.id ? 'text-[#d4af37]' : 'text-white'}`}>{b.name}</h3>
                                <span className="text-xs text-zinc-500 mt-1">{b.role}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 3: Date & Time */}
                <div className={`transition-opacity duration-300 ${step < 3 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isStep3Complete ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-white border border-white/20'}`}>3</div>
                        <h2 className="text-2xl font-semibold text-white">Fecha y Hora</h2>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        {/* Simple date picker placeholder */}
                        <div className="flex items-center justify-center py-4 border-b border-white/10 mb-6">
                            <Calendar className="w-5 h-5 text-[#d4af37] mr-3" />
                            <span className="font-medium text-white">Próximo Jueves, 18 Octubre</span>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {tenantInfo.availableTimes.map((time, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-3 px-2 rounded-lg text-sm font-medium border transition-colors ${selectedTime === time ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-black text-zinc-300 border-white/10 hover:bg-zinc-800'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Floating Bottom Bar for confirmation */}
            {isStep1Complete && isStep2Complete && isStep3Complete && (
                <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-[#d4af37]/30 p-4 transform translate-y-0 transition-transform duration-500 z-50 animate-slide-up">
                    <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-zinc-400">Resumen de tu reserva</p>
                            <p className="text-white font-medium">
                                Corte con <span className="text-[#d4af37]">{tenantInfo.barbers.find(b => b.id === selectedBarber)?.name}</span> a las <span className="text-[#d4af37]">{selectedTime}</span>
                            </p>
                        </div>
                        <Button size="lg" className="w-full sm:w-auto font-bold text-base px-10">
                            Confirmar Reserva
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
