'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Tag, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';

const mockPromos = [
    { id: 1, code: 'ELITE10', discount: 10, validUntil: '2026-12-31', active: true },
    { id: 2, code: 'PROMO20', discount: 20, validUntil: '2026-06-30', active: false },
];

export default function PromotionsPage() {
    const [promos, setPromos] = useState(mockPromos);
    const [showForm, setShowForm] = useState(false);
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [validUntil, setValidUntil] = useState('');

    const handleAdd = () => {
        if (!code || !discount || !validUntil) return;
        setPromos(prev => [...prev, { id: Date.now(), code: code.toUpperCase(), discount: parseInt(discount), validUntil, active: true }]);
        setCode(''); setDiscount(''); setValidUntil('');
        setShowForm(false);
    };

    const toggle = (id: number) => {
        setPromos(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    };

    const remove = (id: number) => {
        setPromos(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Promociones y Códigos</h1>
                    <p className="text-sm text-zinc-400 mt-1">Crea y administra descuentos para tus clientes</p>
                </div>
                <Button onClick={() => setShowForm(v => !v)}>
                    <Plus className="w-4 h-4 mr-2" />
                    {showForm ? 'Cancelar' : 'Nueva Promoción'}
                </Button>
            </div>

            {showForm && (
                <div className="glass-panel p-6 rounded-2xl border border-[#d4af37]/30 animate-fade-in">
                    <h3 className="text-lg font-medium text-white mb-4">Crear Promoción</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Código</label>
                            <Input placeholder="Ej. VERANO30" value={code} onChange={e => setCode(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Descuento (%)</label>
                            <Input type="number" min="1" max="100" placeholder="15" value={discount} onChange={e => setDiscount(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Válido hasta</label>
                            <Input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} />
                        </div>
                    </div>
                    <Button onClick={handleAdd}>Guardar Promoción</Button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {promos.map(p => (
                    <div key={p.id} className={`relative glass-panel p-6 rounded-xl border ${p.active ? 'border-[#d4af37]/20' : 'border-zinc-700/30 opacity-50'} hover:bg-[#1a1a1a] transition-all group`}>
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => remove(p.id)} className="p-1 text-zinc-500 hover:text-red-400 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#d4af37]/10 rounded-lg">
                                <Tag className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <code className="text-lg font-bold text-white tracking-widest">{p.code}</code>
                        </div>

                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-4xl font-bold text-[#d4af37]">{p.discount}%</p>
                                <p className="text-xs text-zinc-500 mt-1">de descuento</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-zinc-500">Vence el</p>
                                <p className="text-sm font-medium text-zinc-300">{p.validUntil}</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-700/50 text-zinc-500'}`}>
                                {p.active ? '● Activo' : '○ Inactivo'}
                            </span>
                            <button
                                onClick={() => toggle(p.id)}
                                className={`text-xs px-3 py-1 rounded-lg border transition-colors ${p.active ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10' : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}`}
                            >
                                {p.active ? 'Desactivar' : 'Activar'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
