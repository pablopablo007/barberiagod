'use client';

import { Button } from '@/components/ui/button';
import { PackageSearch, Plus, ArrowDown, ArrowUp } from 'lucide-react';

const mockInventory = [
    { id: 1, name: 'Cera Fijación Fuerte (Oud)', qty: 45, min: 10, price: 18.50 },
    { id: 2, name: 'Aceite para Barba Premium', qty: 12, min: 15, price: 24.00, alert: true },
    { id: 3, name: 'Shampoo Anticaída', qty: 28, min: 10, price: 22.00 },
    { id: 4, name: 'Tónico Capilar Mentol', qty: 5, min: 10, price: 15.00, alert: true },
];

export default function InventoryPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Inventario de Productos</h1>
                    <p className="text-sm text-zinc-400 mt-1">Control de stock de tienda y uso interno</p>
                </div>
                <Button className="shrink-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir Producto
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <p className="text-sm font-medium text-zinc-400 mb-1">Total Productos Únicos</p>
                    <h3 className="text-2xl font-bold text-white">124</h3>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5">
                    <p className="text-sm font-medium text-rose-400 mb-1">Bajo Stock (Alertas)</p>
                    <h3 className="text-2xl font-bold text-rose-500">2<span className="text-lg font-normal text-rose-400/70 ml-2">requieren atención</span></h3>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <p className="text-sm font-medium text-zinc-400 mb-1">Valor Estimado Inventario</p>
                    <h3 className="text-2xl font-bold text-[#d4af37]">$3,450.00</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockInventory.map((item) => (
                    <div key={item.id} className={`glass-panel p-5 rounded-xl border ${item.alert ? 'border-rose-500/30' : 'border-white/10'} hover:bg-[#1a1a1a] transition-all`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5">
                                <PackageSearch className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <span className="text-sm font-bold text-white">${item.price.toFixed(2)}</span>
                        </div>
                        <h4 className="text-base font-semibold text-white mb-4 line-clamp-1">{item.name}</h4>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex flex-col">
                                <span className="text-xs text-zinc-500">Stock Actual</span>
                                <span className={`text-xl font-bold ${item.alert ? 'text-rose-500' : 'text-white'}`}>
                                    {item.qty} <span className="text-xs text-zinc-500 font-normal">/ min {item.min}</span>
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors">
                                    <ArrowDown className="w-4 h-4 text-rose-400" />
                                </button>
                                <button className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors">
                                    <ArrowUp className="w-4 h-4 text-emerald-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
