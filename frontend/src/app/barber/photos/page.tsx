'use client';

import { useState } from 'react';
import { Camera, Trash2, Plus } from 'lucide-react';
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
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Mis Fotos de Trabajo</h1>
                    <p className="text-sm text-zinc-400 mt-1">Muestra tu portfolio a los clientes</p>
                </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-[#d4af37]/20 flex gap-4 items-end">
                <div className="flex-1">
                    <label className="text-sm font-medium text-zinc-300 block mb-1.5">Descripción del trabajo</label>
                    <input
                        className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]/50"
                        placeholder="Ej. Skin fade con diseño"
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                    />
                </div>
                <Button onClick={addPhoto}>
                    <Plus className="w-4 h-4 mr-2" />
                    Subir Foto
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map(p => (
                    <div key={p.id} className="relative group rounded-xl overflow-hidden aspect-square">
                        <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                            <button onClick={() => remove(p.id)} className="self-end p-1.5 bg-red-500/80 rounded-lg text-white hover:bg-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <p className="text-white text-sm font-medium">{p.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
