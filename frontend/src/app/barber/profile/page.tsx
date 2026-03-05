'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BarberProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [bio, setBio] = useState('Master Barber con 10 años de experiencia. Especialista en fades y barbas clásicas.');
    const [phone, setPhone] = useState('+34 600 000 222');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (!u) { router.push('/login'); return; }
        setUser(JSON.parse(u));
    }, []);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-xl">
            <div>
                <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                <p className="text-sm text-zinc-400 mt-1">Información visible para tus clientes</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-5">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                        <User className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-lg">{user?.name}</p>
                        <p className="text-zinc-500 text-sm">{user?.email}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Bio / Descripción</label>
                    <textarea
                        className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm min-h-[100px] resize-none focus:outline-none focus:border-[#d4af37]/50"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Teléfono</label>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                <Button onClick={handleSave} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {saved ? '¡Guardado!' : 'Guardar Cambios'}
                </Button>
            </div>
        </div>
    );
}
