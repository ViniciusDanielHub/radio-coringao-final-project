import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '@/presentation/stores/ui-store';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - hidden on small screens, collapsible on large */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-surface p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
