import { ClientNav } from '@/components/client/client-nav';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#c9a84c]/30">
            <ClientNav />
            <main className="max-w-2xl mx-auto px-4 pt-4 pb-28 md:pb-12">
                {children}
            </main>
        </div>
    );
}
