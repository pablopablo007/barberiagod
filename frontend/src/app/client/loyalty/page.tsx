'use client';

import { useState } from 'react';
import { Gift, Star, Award, Scissors, Check, XCircle, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';

const MAX_CUTS = 10;
const REWARD = 'Kit Premium Elite (Valor $45)';
const JOIN_DATE = 'Marzo 2026';
const FIRST_CUT_DATE = '5 Mar 2026';

export default function LoyaltyPage() {
    const [cuts, setCuts] = useState(10); // Empieza en 10 para probar el canje
    const [showConfetti, setShowConfetti] = useState(false);
    const [redeemed, setRedeemed] = useState(false);

    const handleRedeem = () => {
        setShowConfetti(true);
        setRedeemed(true);

        // Simular el reseteo después de unos segundos
        setTimeout(() => {
            setShowConfetti(false);
            setCuts(0);
            setRedeemed(false);
        }, 5000);
    };

    return (
        <div className="space-y-6 animate-fade-in relative">
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}

            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Elite Black Card</h1>
                <p className="text-zinc-400 text-sm mt-1">Programa de Recompensas Exclusivo</p>
            </div>

            {/* TARJETA VIRTUAL DE FIDELIDAD */}
            <div className="relative w-full aspect-[1.6/1] rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#1A1A1A] via-[#111111] to-black border border-white/10 group hover:border-[#C9A84C]/30 transition-all">
                {/* Branding Background pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] opacity-5 rounded-full blur-[80px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <Scissors className="w-8 h-8 text-[#C9A84C] mb-2" />
                        <h2 className="text-white text-lg font-bold tracking-widest uppercase">Elite Cut</h2>
                        <p className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase">Black Member</p>
                    </div>
                    <div className="text-right">
                        <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">Miembro Desde</p>
                        <p className="text-white text-sm font-semibold">{JOIN_DATE}</p>
                    </div>
                </div>

                <div className="relative z-10 1w-full mt-4">
                    <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">Andrés (Cliente Frecuente)</p>

                    {/* Stamps Track (10 slots) */}
                    <div className="grid grid-cols-5 gap-2 w-full mt-2">
                        {Array.from({ length: MAX_CUTS }).map((_, i) => (
                            <div key={i} className={`aspect-square rounded-full border-2 flex items-center justify-center transition-all ${i < cuts ? 'border-[#C9A84C] bg-[#C9A84C]/10 shadow-[0_0_10px_rgba(201,168,76,0.3)]' : 'border-zinc-800 bg-black/50'} relative overflow-hidden`}>
                                {i < cuts ? (
                                    <Check className="w-5 h-5 text-[#C9A84C]" />
                                ) : (
                                    <span className="text-zinc-700 font-bold text-xs">{i + 1}</span>
                                )}
                                {/* Highlight last cut */}
                                {i === cuts - 1 && <div className="absolute inset-0 border-2 border-[#C9A84C] rounded-full animate-ping opacity-20" />}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <p className="text-[#C9A84C] text-xs font-bold">
                            {cuts} / {MAX_CUTS} Cortes <span className="text-zinc-500 font-normal">({MAX_CUTS - cuts} para recompensa)</span>
                        </p>
                        <p className="text-zinc-600 text-[10px] font-medium tracking-wide">1er Corte: {FIRST_CUT_DATE}</p>
                    </div>
                </div>
            </div>

            {/* ACCIÓN DE CANJE */}
            <div className={`glass-panel p-6 rounded-3xl border transition-all ${cuts >= MAX_CUTS ? 'border-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.1)] bg-[#C9A84C]/5' : 'border-white/5'}`}>
                <div className="flex gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${cuts >= MAX_CUTS ? 'bg-[#C9A84C]' : 'bg-zinc-900 border border-zinc-800'}`}>
                        <Gift className={`w-7 h-7 ${cuts >= MAX_CUTS ? 'text-black' : 'text-zinc-600'}`} />
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold text-lg ${cuts >= MAX_CUTS ? 'text-white' : 'text-zinc-400'}`}>Recompensa Actual</h3>
                        <p className={`text-sm mt-1 mb-4 ${cuts >= MAX_CUTS ? 'text-[#C9A84C] font-semibold' : 'text-zinc-600'}`}>{REWARD}</p>

                        {cuts >= MAX_CUTS ? (
                            <button
                                onClick={handleRedeem}
                                disabled={redeemed}
                                className="w-full py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#a38634] text-black font-extrabold text-sm rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {redeemed ? '¡Recompensa Reclamada!' : 'Reclamar Recompensa Ahora'}
                                {!redeemed && <Gift className="w-4 h-4" />}
                            </button>
                        ) : (
                            <div className="w-full py-3.5 bg-zinc-900 text-zinc-500 font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                                Bloqueado
                            </div>
                        )}
                        {cuts >= MAX_CUTS && !redeemed && (
                            <p className="text-[10px] text-zinc-500 text-center mt-3">Al reclamar, tu tarjeta se reiniciará automáticamente.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* BENEFICIOS BLACK MEMBER */}
            <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A84C]" />
                    Beneficios del Nivel Black
                </h3>
                <div className="space-y-3">
                    {[
                        { title: 'Una recompensa cada 10 cortes', desc: 'Productos, servicios gratis o descuentos grandes.' },
                        { title: 'Prioridad en la Agenda', desc: 'Reserva hasta 2 meses por adelantado.' },
                        { title: 'Bebida de Cortesía Premium', desc: 'Cerveza artesanal o Whisky en cada visita.' },
                    ].map((b, i) => (
                        <div key={i} className="bg-[#111] p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                            <Award className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-white text-sm font-bold">{b.title}</p>
                                <p className="text-zinc-500 text-xs mt-1">{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
