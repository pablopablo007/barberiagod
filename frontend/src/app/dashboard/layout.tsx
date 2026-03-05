import { Sidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#0A0A0A] text-white selection:bg-[#c9a84c]/30">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative z-10 max-w-6xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
