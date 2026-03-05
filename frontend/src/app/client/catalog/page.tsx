'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const FACE_TYPES = ['Todos', 'Redondo', 'Cuadrado', 'Ovalado', 'Triangular', 'Alargado'];

const CUTS = [
    { id: 1, name: 'Mid Fade', desc: 'Degradado suave a la mitad de la cabeza, versátil y moderno.', faces: ['Redondo', 'Ovalado', 'Triangular'], img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop', time: '45 min' },
    { id: 2, name: 'Low Fade', desc: 'Corte limpio con degradado bajo. Elegante y profesional.', faces: ['Cuadrado', 'Ovalado', 'Alargado'], img: 'https://images.unsplash.com/photo-1621605815971-fde2af5db0c9?w=400&h=400&fit=crop', time: '40 min' },
    { id: 3, name: 'High Fade', desc: 'Degradado alto y definido. Estilo urbano y atrevido.', faces: ['Redondo', 'Triangular'], img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop', time: '40 min' },
    { id: 4, name: 'Taper Fade', desc: 'Transición natural hacia los lados. Clásico y atemporal.', faces: ['Ovalado', 'Alargado', 'Cuadrado'], img: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=400&fit=crop', time: '45 min' },
    { id: 5, name: 'Skin Fade', desc: 'Degradado hasta la piel. Máximo contraste y efecto premium.', faces: ['Redondo', 'Cuadrado', 'Ovalado', 'Triangular', 'Alargado'], img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop', time: '50 min' },
    { id: 6, name: 'Buzz Cut', desc: 'Corte al ras uniforme. Mínimo mantenimiento, máxima confianza.', faces: ['Ovalado', 'Cuadrado'], img: 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=400&h=400&fit=crop', time: '25 min' },
    { id: 7, name: 'Crew Cut', desc: 'Corte corto en lados y largo arriba. Clásico militar modernizado.', faces: ['Ovalado', 'Cuadrado', 'Redondo'], img: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=400&h=400&fit=crop', time: '35 min' },
    { id: 8, name: 'Undercut', desc: 'Lados cortos y la parte superior larga. Contraste dramático.', faces: ['Cuadrado', 'Triangular', 'Ovalado'], img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=400&fit=crop', time: '50 min' },
    { id: 9, name: 'Pompadour', desc: 'Volumen hacia atrás. Estilo rock-clásico con actitud.', faces: ['Alargado', 'Ovalado'], img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop', time: '55 min' },
    { id: 10, name: 'Textured Crop', desc: 'Textura natural con movimiento. Informal pero cuidado.', faces: ['Redondo', 'Cuadrado', 'Ovalado', 'Alargado', 'Triangular'], img: 'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?w=400&h=400&fit=crop', time: '40 min' },
];

const faceLabel: Record<string, string> = {
    Redondo: 'Recomendado para rostro redondo',
    Cuadrado: 'Ideal para rostro cuadrado',
    Ovalado: 'Funciona bien en rostros ovalados',
    Triangular: 'Perfecto para rostro triangular',
    Alargado: 'Equilibra el rostro alargado',
};

export default function CatalogPage() {
    const [selected, setSelected] = useState('Todos');
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState<number | null>(null);

    const filtered = CUTS.filter(c => {
        const matchFace = selected === 'Todos' || c.faces.includes(selected);
        const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
        return matchFace && matchSearch;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">Catálogo de Estilos</h1>
                <p className="text-sm text-zinc-400 mt-0.5">Encuentra el corte perfecto para tu tipo de rostro</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl pl-10 pr-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                    placeholder="Buscar estilo..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Face type filter */}
            <div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2.5">Filtrar por tipo de rostro</p>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                    {FACE_TYPES.map(f => (
                        <button
                            key={f}
                            onClick={() => setSelected(f)}
                            className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${selected === f ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cut count */}
            <p className="text-xs text-zinc-500">{filtered.length} estilos {selected !== 'Todos' ? `para rostro ${selected.toLowerCase()}` : 'disponibles'}</p>

            {/* Cuts Grid */}
            <div className="grid grid-cols-2 gap-3">
                {filtered.map(cut => (
                    <div
                        key={cut.id}
                        className="cursor-pointer group"
                        onClick={() => setExpanded(expanded === cut.id ? null : cut.id)}
                    >
                        <div className="relative rounded-2xl overflow-hidden aspect-square">
                            <img src={cut.img} alt={cut.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <p className="text-white font-bold text-sm leading-tight">{cut.name}</p>
                                <p className="text-zinc-400 text-[10px] mt-0.5 leading-tight">
                                    {cut.faces[0] ? faceLabel[cut.faces[0]] : ''}
                                </p>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/60 text-zinc-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                {cut.time}
                            </div>
                        </div>

                        {/* Expanded info */}
                        {expanded === cut.id && (
                            <div className="mt-2 p-3 glass-panel rounded-xl border border-[#d4af37]/20 animate-fade-in">
                                <p className="text-white text-sm font-semibold mb-1">{cut.name}</p>
                                <p className="text-zinc-400 text-xs leading-relaxed">{cut.desc}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {cut.faces.map(f => (
                                        <span key={f} className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-full">{f}</span>
                                    ))}
                                </div>
                                <a href="/client/book" className="mt-3 block text-center text-xs font-bold bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black py-2 rounded-lg">
                                    Reservar este estilo
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
