import { Outlet } from 'react-router-dom';
import Header from '@/components/client/Header';

export default function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}