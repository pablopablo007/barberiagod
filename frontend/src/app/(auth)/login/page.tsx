'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });

            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));

            toast.success('Bienvenido, ' + data.user.name);

            // Redirigir según el rol
            const role = data.user.role;
            if (role === 'OWNER') router.push('/dashboard');
            else if (role === 'BARBER') router.push('/barber');
            else router.push('/client');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden p-4">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-md p-8 glass-panel gold-border rounded-2xl z-10 animate-fade-in relative">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Ingresar</h1>
                    <p className="text-zinc-400">Accede a tu cuenta de Elite Cut Barber</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Correo Electrónico</label>
                        <Input
                            type="email"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-zinc-300">Contraseña</label>
                            <Link href="#" className="text-xs text-[#d4af37] hover:underline">¿Olvidaste tu contraseña?</Link>
                        </div>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-zinc-500">
                    ¿No tienes una cuenta?{' '}
                    <Link href="/register" className="text-[#d4af37] hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}
