'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Scissors, Trash2, Check, X, Tag } from 'lucide-react';

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
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Scissors className="w-8 h-8 text-[#C9A84C]" />
                        Servicios y Precios
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1 font-medium">Gestiona los servicios que ofrece tu barbería</p>
                </div>
                <Button onClick={() => setShowForm(v => !v)} variant={showForm ? 'secondary' : 'primary'}>
                    {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    {showForm ? 'Cancelar' : 'Nuevo Servicio'}
                </Button>
            </div>

            {showForm && (
                <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 shadow-sm animate-fade-in">
                    <h3 className="text-lg font-bold text-white mb-6">Agregar Servicio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Nombre</label>
                            <Input placeholder="Ej. Skin Fade" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Precio ($)</label>
                            <Input type="number" placeholder="25" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Duración (min)</label>
                            <Input type="number" placeholder="45" value={duration} onChange={e => setDuration(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleAdd}>Crear Servicio</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(s => (
                    <div key={s.id} className={`bg-[#111111] p-6 rounded-2xl border transition-all relative group shadow-sm flex flex-col justify-between ${s.active ? 'border-white/5 hover:border-[#C9A84C]/30' : 'border-white/5 opacity-50 bg-[#0A0A0A]'}`}>

                        {/* Status Label */}
                        <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                            <button onClick={() => toggleActive(s.id)} className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all ${s.active ? 'bg-[#0A0A0A] border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/10' : 'bg-[#111111] border-white/10 text-zinc-500 hover:text-white'}`} title={s.active ? "Desactivar" : "Activar"}>
                                {s.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            </button>
                            <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg border border-transparent bg-transparent text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <div className="w-12 h-12 bg-[#0A0A0A] rounded-xl border border-white/5 flex items-center justify-center mb-4">
                                <Scissors className={s.active ? "w-6 h-6 text-[#C9A84C]" : "w-6 h-6 text-zinc-600"} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2 pr-16">{s.name}</h4>
                        </div>

                        <div className="flex items-end justify-between mt-6 pt-4 border-t border-white/5">
                            <div>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Precio</p>
                                <span className={`text-2xl font-extrabold ${s.active ? 'text-[#C9A84C]' : 'text-zinc-600'}`}>${s.price}</span>
                            </div>
                            <div className="text-right">
                                <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${s.active ? 'bg-[#C9A84C]/10 text-[#C9A84C]' : 'bg-[#111] text-zinc-500'}`}>{s.duration} min</span>
                            </div>
                        </div>

                        {!s.active && <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-center justify-center bg-gradient-to-t from-[#0A0A0A] pointer-events-none rounded-b-2xl"><span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Servicio Inactivo</span></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
