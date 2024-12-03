import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function Header() {
  const { user, clearAuth } = useAuthStore();
  
  const progressData = {
    experience: 750,
    experienceToNextLevel: 1000,
  };

  const progress = (progressData.experience / progressData.experienceToNextLevel) * 100;

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            PlayPro Support
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-32">
              <Progress value={progress} className="w-32" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progressData.experience} / {progressData.experienceToNextLevel} XP
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Bienvenue, {user?.name}
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