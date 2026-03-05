'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Camera, Scissors, Edit3, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FACE_TYPES = ['Redondo', 'Cuadrado', 'Ovalado', 'Triangular', 'Alargado'];
const FAVE_CUTS = ['Mid Fade', 'Low Fade', 'High Fade', 'Taper Fade', 'Skin Fade', 'Buzz Cut', 'Textured Crop', 'Undercut'];
const FAVE_BARBERS = ['Sin preferencia', 'Marcos García', 'Carlos Ruiz', 'Diego Morales'];

export default function ClientProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [editing, setEditing] = useState(false);
    const [faceType, setFaceType] = useState('Ovalado');
    const [favCut, setFavCut] = useState('Mid Fade');
    const [favBarber, setFavBarber] = useState('Marcos García');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (!u) { router.push('/login'); return; }
        setUser(JSON.parse(u));
    }, []);

    const handleSave = () => {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Avatar & Name */}
            <div className="flex flex-col items-center pt-4">
                <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-[#d4af37]" />
                    </div>
                    {editing && (
                        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#d4af37] rounded-xl flex items-center justify-center">
                            <Camera className="w-4 h-4 text-black" />
                        </button>
                    )}
                </div>
                <h1 className="text-xl font-bold text-white">{user?.name}</h1>
                <p className="text-sm text-zinc-500">{user?.email}</p>

                {/* Quick stats */}
                <div className="flex items-center gap-6 mt-4">
                    {[
                        { label: 'Cortes', value: '3' },
                        { label: 'Puntos', value: '350' },
                        { label: 'Reseñas', value: '2' },
                    ].map(s => (
                        <div key={s.label} className="text-center">
                            <p className="text-lg font-bold text-[#d4af37]">{s.value}</p>
                            <p className="text-xs text-zinc-600">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preferences */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white">Mis Preferencias</h2>
                    <button onClick={() => setEditing(v => !v)} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#d4af37] transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                        {editing ? 'Cancelar' : 'Editar'}
                    </button>
                </div>

                {/* Face type */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tipo de Rostro</p>
                    {editing ? (
                        <div className="flex flex-wrap gap-2">
                            {FACE_TYPES.map(f => (
                                <button key={f} onClick={() => setFaceType(f)}
                                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${faceType === f ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm font-semibold text-white">{faceType}</p>
                    )}
                </div>

                {/* Favorite cut */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Estilo Favorito</p>
                    {editing ? (
                        <div className="flex flex-wrap gap-2">
                            {FAVE_CUTS.map(c => (
                                <button key={c} onClick={() => setFavCut(c)}
                                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${favCut === c ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Scissors className="w-4 h-4 text-[#d4af37]" />
                            <p className="text-sm font-semibold text-white">{favCut}</p>
                        </div>
                    )}
                </div>

                {/* Favorite barber */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Barbero Favorito</p>
                    {editing ? (
                        <div className="flex flex-col gap-2">
                            {FAVE_BARBERS.map(b => (
                                <button key={b} onClick={() => setFavBarber(b)}
                                    className={`flex items-center justify-between text-sm px-4 py-2.5 rounded-xl border font-medium transition-all ${favBarber === b ? 'border-[#d4af37] bg-[#d4af37]/5 text-[#d4af37]' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
                                    {b}
                                    {favBarber === b && <span className="text-[#d4af37]">✓</span>}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm font-semibold text-white">{favBarber}</p>
                    )}
                </div>

                {editing && (
                    <button onClick={handleSave}
                        className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black font-bold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" />
                        {saved ? '¡Guardado!' : 'Guardar Preferencias'}
                    </button>
                )}
            </div>

            {/* Rating stats */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5">
                <h2 className="text-sm font-semibold text-white mb-4">Mis Reseñas</h2>
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-[#d4af37]">5.0</p>
                        <div className="flex gap-0.5 mt-1 justify-center">
                            {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />)}
                        </div>
                        <p className="text-xs text-zinc-600 mt-1">promedio</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map(n => (
                            <div key={n} className="flex items-center gap-2">
                                <span className="text-xs text-zinc-600 w-3">{n}</span>
                                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#d4af37] rounded-full" style={{ width: n === 5 ? '100%' : '0%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
