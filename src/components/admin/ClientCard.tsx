import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { calculateProgress } from '@/lib/utils';
import type { User, ClientProgress } from '@/types';

interface ClientCardProps {
  client: User;
  progress: ClientProgress[];
}

export default function ClientCard({ client, progress }: ClientCardProps) {
  const completedSteps = progress.filter(p => p.isCompleted).length;
  const totalSteps = progress.length;
  const progressPercentage = calculateProgress(completedSteps, totalSteps);
  const lastActivity = progress
    .filter(p => p.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">{client.name}</h3>
          <p className="text-sm text-muted-foreground">{client.email}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/admin/clients/${client.id}`}>View Details</Link>
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Onboarding Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} />
        </div>

        <div className="text-sm">
          <p className="text-muted-foreground">
            Last Activity:{' '}
            {lastActivity?.completedAt
              ? new Date(lastActivity.completedAt).toLocaleDateString()
              : 'No activity yet'}
          </p>
          <p className="mt-1">
            Completed {completedSteps} of {totalSteps} steps
          </p>
        </div>

        {progressPercentage < 100 && progressPercentage > 0 && (
          <div className="bg-background/50 p-3 rounded-md text-sm">
            <p className="text-muted-foreground">
              Client might need assistance with the next steps
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}