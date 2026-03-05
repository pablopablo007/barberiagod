'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export default function Home() {
    const [deviceSelected, setDeviceSelected] = useState<string | null>(null);

    useEffect(() => {
        const savedDevice = localStorage.getItem('preferred_device');
        if (savedDevice) setDeviceSelected(savedDevice);
    }, []);

    const handleSelect = (device: 'mobile' | 'desktop') => {
        localStorage.setItem('preferred_device', device);
        setDeviceSelected(device);
        // Para simplificar, redirigimos al login principal
        window.location.href = '/login';
    };

    if (deviceSelected) {
        // Si ya seleccionó, no renderiza nada y el useEffect se encarga de redirigir (o lo forzamos acá)
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-t-2 border-[#d4af37] animate-spin"></div>
        </div>;
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="z-10 text-center mb-12 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                    Bienvenido a <span className="gold-gradient-text">Elite Cut Barber</span>
                </h1>
                <p className="text-zinc-400 text-lg">Para ofrecerte la mejor experiencia, cuéntanos:</p>
            </div>

            <div className="z-10 mb-8 animate-slide-up">
                <h2 className="text-2xl font-light text-zinc-300">¿Desde qué dispositivo usarás la aplicación?</h2>
            </div>

            <div className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>

                {/* Celular Option */}
                <button
                    onClick={() => handleSelect('mobile')}
                    className="group relative flex flex-col items-center justify-center p-8 rounded-2xl glass-panel gold-border hover:bg-[#1a1a1a] transition-all duration-300 hover:scale-105"
                >
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/10 transition-colors">
                        <Smartphone className="w-8 h-8 text-zinc-400 group-hover:text-[#d4af37] transition-colors" />
                    </div>
                    <span className="text-xl font-medium text-white group-hover:text-[#d4af37] transition-colors">Celular</span>
                    <p className="text-sm text-zinc-500 mt-2 text-center">Experiencia optimizada para clientes y reservas rápidas.</p>
                </button>

                {/* Computadora Option */}
                <button
                    onClick={() => handleSelect('desktop')}
                    className="group relative flex flex-col items-center justify-center p-8 rounded-2xl glass-panel gold-border hover:bg-[#1a1a1a] transition-all duration-300 hover:scale-105"
                >
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/10 transition-colors">
                        <Monitor className="w-8 h-8 text-zinc-400 group-hover:text-[#d4af37] transition-colors" />
                    </div>
                    <span className="text-xl font-medium text-white group-hover:text-[#d4af37] transition-colors">Computadora</span>
                    <p className="text-sm text-zinc-500 mt-2 text-center">Panel completo para dueños y administración de barbería.</p>
                </button>

            </div>
        </main>
    );
}
