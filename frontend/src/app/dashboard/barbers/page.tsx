'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const mockBarbers = [
    { id: 1, name: 'Marcos García', role: 'Master Barber', rating: 4.9, services: 1420 },
    { id: 2, name: 'Luis Felipe', role: 'Senior Barber', rating: 4.8, services: 950 },
    { id: 3, name: 'Antonio R.', role: 'Stylist', rating: 4.7, services: 430 },
];

export default function BarbersPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Barberos del Equipo</h1>
                    <p className="text-sm text-zinc-400 mt-1">Gestiona horarios, perfiles y rendimiento</p>
                </div>
                <Button className="shrink-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Barbero
                </Button>
            </div>

            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            className="w-full h-10 bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs text-zinc-500 bg-black/40 border-b border-white/10">
                            <tr>
                                <th className="font-medium px-6 py-4">Barbero</th>
                                <th className="font-medium px-6 py-4">Especialidad</th>
                                <th className="font-medium px-6 py-4">Calificación</th>
                                <th className="font-medium px-6 py-4">Servicios Comp.</th>
                                <th className="font-medium px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockBarbers.map((barber) => (
                                <tr key={barber.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b6508] flex items-center justify-center text-black font-bold text-xs">
                                                {barber.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-white">{barber.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{barber.role}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center text-[#d4af37]">
                                            ★ {barber.rating}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{barber.services}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
