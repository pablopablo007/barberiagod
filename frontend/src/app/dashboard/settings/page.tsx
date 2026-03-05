'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, User, Link as LinkIcon, Lock, Moon, Key } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-fade-in max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Configuración del Perfil</h1>
                <p className="text-sm text-zinc-400 mt-1">Administra tu barbería, enlaces públicos y credenciales</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Navigation/Sidebar internal settings */}
                <div className="md:col-span-1 border-r border-white/10 pr-6 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-[#d4af37]/10 text-[#d4af37] font-medium text-sm transition-colors">
                        <User className="w-4 h-4" />
                        Perfil & Barbería
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-medium text-sm transition-colors">
                        <LinkIcon className="w-4 h-4" />
                        Portal Público
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-medium text-sm transition-colors">
                        <Lock className="w-4 h-4" />
                        Seguridad
                    </button>
                </div>

                <div className="md:col-span-3 space-y-8">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-medium text-white mb-6">Información General</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-[#d4af37]/50 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                                    <span className="text-4xl font-light text-zinc-500">T</span>
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs text-white">Cambiar Logo</span>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="outline" size="sm" className="mb-2">Subir nuevo logo</Button>
                                    <p className="text-xs text-zinc-500">JPG, PNG optimizados a 500x500px</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Nombre de la Barbería</label>
                                    <Input defaultValue="The Gentleman Barbershop" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Teléfono Público</label>
                                    <Input defaultValue="+34 600 123 456" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Dirección</label>
                                <Input defaultValue="Avenida Principal 123, Madrid" />
                            </div>

                            <div className="pt-4 border-t border-white/10 text-right">
                                <Button>
                                    <Check className="w-4 h-4 mr-2" />
                                    Guardar Cambios
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-medium text-white mb-2">Portal Público (Landing)</h3>
                        <p className="text-sm text-zinc-400 mb-6">Personaliza la URL donde tus clientes agendarán sus cortes.</p>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">URL de Reserva</label>
                                <div className="flex items-center">
                                    <span className="inline-flex items-center px-3 h-10 rounded-l-md border border-r-0 border-white/10 bg-black/80 text-zinc-500 sm:text-sm">
                                        barbero.app/
                                    </span>
                                    <Input defaultValue="the-gentleman" className="rounded-l-none focus-visible:z-10" />
                                </div>
                            </div>

                            <div className="pt-4 text-right">
                                <Button variant="secondary">Actualizar URL</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
