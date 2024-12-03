import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { user, clearAuth } = useAuthStore();

  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tableau de bord administrateur</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user?.name}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAuth}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}