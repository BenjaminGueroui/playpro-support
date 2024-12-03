import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import AdminLayout from '@/layouts/AdminLayout';
import ClientLayout from '@/layouts/ClientLayout';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import Dashboard from '@/pages/admin/Dashboard';
import Clients from '@/pages/admin/Clients';
import Settings from '@/pages/admin/Settings';
import ClientDashboard from '@/pages/client/Dashboard';
import OnboardingStep from '@/pages/client/OnboardingStep';
import ClientCustomization from '@/pages/admin/ClientCustomization';
import NotFound from '@/pages/NotFound';

function PrivateRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'admin' | 'client' }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/client'} replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  const user = useAuthStore((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={
        user ? (
          <Navigate to={user.role === 'admin' ? '/admin' : '/client'} replace />
        ) : (
          <Navigate to="/login" replace />
        )
      } />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/admin" element={
        <PrivateRoute requiredRole="admin">
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="settings" element={<Settings />} />
        <Route path="clients/:clientId/customize" element={<ClientCustomization />} />
      </Route>

      <Route path="/client" element={
        <PrivateRoute requiredRole="client">
          <ClientLayout />
        </PrivateRoute>
      }>
        <Route index element={<ClientDashboard />} />
        <Route path="step/:stepId" element={<OnboardingStep />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}