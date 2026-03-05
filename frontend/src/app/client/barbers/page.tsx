'use client';

import { useState } from 'react';
import { Star, Award, Scissors, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const barbers = [
    {
        id: 1,
        name: 'Marcos García',
        specialty: 'Especialista en Fades',
        rating: 4.9,
        reviews: 312,
        years: 10,
        cuts: 4821,
        available: true,
        nextSlot: '10:00',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&facepad=2',
        portfolio: [
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=150&h=150&fit=crop',
        ],
    },
    {
        id: 2,
        name: 'Carlos Ruiz',
        specialty: 'Barbas y Afeitado Clásico',
        rating: 4.8,
        reviews: 198,
        years: 7,
        cuts: 3200,
        available: true,
        nextSlot: '11:30',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&facepad=2',
        portfolio: [
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150&h=150&fit=crop',
        ],
    },
    {
        id: 3,
        name: 'Diego Morales',
        specialty: 'Cortes Modernos y Diseños',
        rating: 4.7,
        reviews: 156,
        years: 5,
        cuts: 2100,
        available: false,
        nextSlot: 'Mañana 09:00',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&facepad=2',
        portfolio: [
            'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?w=150&h=150&fit=crop',
        ],
    },
];

export default function BarbersPage() {
    const [openPortfolio, setOpenPortfolio] = useState<number | null>(null);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">Nuestros Barberos</h1>
                <p className="text-sm text-zinc-400 mt-0.5">Elige al experto que mejor se adapta a ti</p>
            </div>

            <div className="space-y-4">
                {barbers.map(b => (
                    <div key={b.id} className="glass-panel rounded-2xl border border-white/5 overflow-hidden hover:border-[#d4af37]/20 transition-all">
                        {/* Main Card */}
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="relative flex-shrink-0">
                                    <img src={b.img} alt={b.name} className="w-16 h-16 rounded-2xl object-cover" />
                                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050505] ${b.available ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-white font-bold text-base">{b.name}</p>
                                            <p className="text-zinc-500 text-xs mt-0.5">{b.specialty}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm flex-shrink-0">
                                            <Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                                            <span className="text-white font-bold">{b.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1"><Award className="w-3 h-3" />{b.years} años</span>
                                        <span><Scissors className="w-3 h-3 inline mr-1" />{b.cuts.toLocaleString()} cortes</span>
                                        <span>{b.reviews} reseñas</span>
                                    </div>

                                    {/* Stars */}
                                    <div className="flex items-center gap-0.5 mt-1.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(b.rating) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-zinc-700'}`} />
                                        ))}
                                        <span className="text-zinc-600 text-[10px] ml-1">({b.reviews})</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    onClick={() => setOpenPortfolio(openPortfolio === b.id ? null : b.id)}
                                    className="flex-1 py-2 text-xs font-semibold border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 rounded-xl transition-colors"
                                >
                                    Ver portfolio
                                </button>
                                <Link href="/client/book" className="flex-1 py-2 text-xs font-bold text-center rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black hover:opacity-90 transition-opacity">
                                    {b.available ? `Reservar · ${b.nextSlot}` : b.nextSlot}
                                </Link>
                            </div>
                        </div>

                        {/* Portfolio */}
                        {openPortfolio === b.id && (
                            <div className="px-4 pb-4 animate-fade-in">
                                <p className="text-xs text-zinc-500 font-medium mb-2">Trabajos recientes</p>
                                <div className="flex gap-2">
                                    {b.portfolio.map((url, i) => (
                                        <div key={i} className="flex-1 rounded-xl overflow-hidden aspect-square">
                                            <img src={url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
