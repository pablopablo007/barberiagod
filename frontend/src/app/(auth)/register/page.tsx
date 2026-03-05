'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [tenantName, setTenantName] = useState('');
    const [tenantSlug, setTenantSlug] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/register', {
                tenantName,
                tenantSlug,
                ownerName,
                email,
                password
            });
            toast.success('Cuenta creada exitosamente');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden p-4 py-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-[#d4af37]/5 rounded-full blur-[150px]" />

            <div className="w-full max-w-lg p-8 glass-panel gold-border rounded-2xl z-10 animate-fade-in relative">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Crear Barbería</h1>
                    <p className="text-zinc-400">Únete a la red de barberos premium</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Nombre de Barbería</label>
                            <Input placeholder="Ej. The Gentleman" required value={tenantName} onChange={e => setTenantName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">URL Personalizada</label>
                            <Input placeholder="ej. the-gentleman" required value={tenantSlug} onChange={e => setTenantSlug(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Tu Nombre</label>
                        <Input placeholder="Nombre completo" required value={ownerName} onChange={e => setOwnerName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Correo Electrónico</label>
                        <Input type="email" placeholder="tu@correo.com" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Contraseña</label>
                        <Input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Comenzar ahora'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-500">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-[#d4af37] hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
