'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Scissors, Pencil, Trash2 } from 'lucide-react';

const mockServices = [
    { id: 1, name: 'Corte Premium', price: 25, duration: 45, active: true },
    { id: 2, name: 'Arreglo de Barba', price: 15, duration: 30, active: true },
    { id: 3, name: 'Combo Corte+Barba', price: 35, duration: 75, active: true },
    { id: 4, name: 'Coloración', price: 50, duration: 90, active: false },
];

export default function ServicesPage() {
    const [services, setServices] = useState(mockServices);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');

    const handleAdd = () => {
        if (!name || !price || !duration) return;
        setServices(prev => [...prev, { id: Date.now(), name, price: parseFloat(price), duration: parseInt(duration), active: true }]);
        setName(''); setPrice(''); setDuration('');
        setShowForm(false);
    };

    const toggleActive = (id: number) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    const remove = (id: number) => {
        setServices(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Catálogo de Servicios</h1>
                    <p className="text-sm text-zinc-400 mt-1">Gestiona los servicios que ofrece tu barbería</p>
                </div>
                <Button onClick={() => setShowForm(v => !v)}>
                    <Plus className="w-4 h-4 mr-2" />
                    {showForm ? 'Cancelar' : 'Nuevo Servicio'}
                </Button>
            </div>

            {showForm && (
                <div className="glass-panel p-6 rounded-2xl border border-[#d4af37]/30 animate-fade-in">
                    <h3 className="text-lg font-medium text-white mb-4">Agregar Servicio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Nombre</label>
                            <Input placeholder="Ej. Skin Fade" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Precio ($)</label>
                            <Input type="number" placeholder="25" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Duración (min)</label>
                            <Input type="number" placeholder="45" value={duration} onChange={e => setDuration(e.target.value)} />
                        </div>
                    </div>
                    <Button onClick={handleAdd}>Guardar Servicio</Button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map(s => (
                    <div key={s.id} className={`relative glass-panel p-5 rounded-xl border ${s.active ? 'border-white/10' : 'border-zinc-700/50 opacity-60'} group hover:bg-[#1a1a1a] transition-all`}>
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => toggleActive(s.id)} className={`text-xs px-2 py-0.5 rounded-full border ${s.active ? 'border-rose-500/40 text-rose-400 hover:bg-rose-500/10' : 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'}`}>
                                {s.active ? 'Desactivar' : 'Activar'}
                            </button>
                            <button onClick={() => remove(s.id)} className="p-1 text-zinc-500 hover:text-red-400 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center mb-4">
                            <Scissors className="w-5 h-5 text-[#d4af37]" />
                        </div>
                        <h4 className="text-base font-semibold text-white mb-2">{s.name}</h4>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-2xl font-bold text-[#d4af37]">${s.price}</span>
                            <span className="text-sm font-medium text-zinc-400 bg-black/50 border border-white/5 px-3 py-1 rounded-full">{s.duration} min</span>
                        </div>
                        {!s.active && <span className="absolute top-2 left-2 text-xs bg-zinc-700 text-zinc-400 px-2 py-0.5 rounded-full">Inactivo</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
