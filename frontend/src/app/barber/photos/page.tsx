'use client';

import { useState } from 'react';
import { Camera, Trash2, Plus, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop', caption: 'Skin fade clásico' },
    { id: 2, url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop', caption: 'Barba a tijeras' },
    { id: 3, url: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=400&fit=crop', caption: 'Degradado moderno' },
];

export default function BarberPhotosPage() {
    const [photos, setPhotos] = useState(mockPhotos);
    const [caption, setCaption] = useState('');

    const addPhoto = () => {
        const sampleUrls = [
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=400&h=400&fit=crop',
        ];
        const url = sampleUrls[Math.floor(Math.random() * sampleUrls.length)];
        setPhotos(prev => [...prev, { id: Date.now(), url, caption: caption || 'Nuevo trabajo' }]);
        setCaption('');
    };

    const remove = (id: number) => setPhotos(prev => prev.filter(p => p.id !== id));

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <ImageIcon className="w-8 h-8 text-[#C9A84C]" />
                        Mis Trabajos
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1 font-medium">Sube fotos de tus mejores cortes para tu portafolio público</p>
                </div>
            </div>

            <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4 items-end shadow-sm">
                <div className="flex-1 w-full relative">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Descripción del Título</label>
                    <div className="relative">
                        <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            className="w-full bg-[#0A0A0A] border border-white/5 text-white font-medium rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors shadow-inner"
                            placeholder="Ej. Skin fade con diseño en navaja..."
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                        />
                    </div>
                </div>
                <Button onClick={addPhoto} className="w-full md:w-auto mt-4 md:mt-0 px-8">
                    <Plus className="w-5 h-5 mr-2" />
                    Subir al Perfil
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map(p => (
                    <div key={p.id} className="relative group rounded-2xl overflow-hidden aspect-square border border-white/5 bg-[#111111] shadow-sm">
                        <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                            <button onClick={() => remove(p.id)} className="self-end p-2 bg-rose-500/20 backdrop-blur-md rounded-xl text-rose-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white border border-rose-500/30">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-bold truncate">{p.caption}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
