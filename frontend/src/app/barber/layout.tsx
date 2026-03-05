import { BarberSidebar } from '@/components/barber/barber-sidebar';

export default function BarberLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#050505]">
            <BarberSidebar />
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative z-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
