'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Tag, Trash2, Check, X } from 'lucide-react';

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
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Tag className="w-8 h-8 text-[#C9A84C]" />
                        Promociones y Códigos
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1 font-medium">Crea y administra descuentos para tus clientes</p>
                </div>
                <Button onClick={() => setShowForm(v => !v)} variant={showForm ? 'secondary' : 'primary'}>
                    {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    {showForm ? 'Cancelar' : 'Nueva Promoción'}
                </Button>
            </div>

            {showForm && (
                <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 shadow-sm animate-fade-in">
                    <h3 className="text-lg font-bold text-white mb-6">Crear Promoción</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Código</label>
                            <Input placeholder="Ej. VERANO30" value={code} onChange={e => setCode(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Descuento (%)</label>
                            <Input type="number" min="1" max="100" placeholder="15" value={discount} onChange={e => setDiscount(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Válido hasta</label>
                            <Input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} className="bg-[#0A0A0A]" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleAdd}>Crear Código</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promos.map(p => (
                    <div key={p.id} className={`bg-[#111111] p-6 rounded-2xl border transition-all relative group shadow-sm flex flex-col justify-between ${p.active ? 'border-white/5 hover:border-[#C9A84C]/30' : 'border-white/5 opacity-50 bg-[#0A0A0A]'}`}>

                        {/* Action Buttons Top Right */}
                        <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                            <button onClick={() => toggle(p.id)} className={`flex items-center justify-center p-1.5 rounded-lg border transition-all ${p.active ? 'bg-[#0A0A0A] border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/10' : 'bg-[#111111] border-white/10 text-zinc-500 hover:text-white'}`} title={p.active ? "Desactivar" : "Activar"}>
                                {p.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            </button>
                            <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg border border-transparent bg-transparent text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-[#0A0A0A] border border-white/5 rounded-xl">
                                <Tag className={p.active ? "w-5 h-5 text-[#C9A84C]" : "w-5 h-5 text-zinc-600"} />
                            </div>
                            <code className="text-xl font-extrabold text-white tracking-widest">{p.code}</code>
                        </div>

                        <div className="flex items-end justify-between py-4 border-t border-white/5">
                            <div>
                                <p className="text-4xl font-extrabold text-white">{p.discount} <span className="text-xl text-[#C9A84C]">%</span></p>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Descuento</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Vence el</p>
                                <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${p.active ? 'bg-[#C9A84C]/10 text-[#C9A84C]' : 'bg-[#111] text-zinc-500'}`}>{p.validUntil}</span>
                            </div>
                        </div>

                        {!p.active && <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-center justify-center bg-gradient-to-t from-[#0A0A0A] pointer-events-none rounded-b-2xl"><span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Promoción Inactiva</span></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
