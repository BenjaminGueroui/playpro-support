import { Progress } from '@/components/ui/progress';
import { useClientProgress } from '@/hooks/useClientProgress';

export default function ProgressBar() {
  const { progress } = useClientProgress();

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progression de l'intégration</span>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
}