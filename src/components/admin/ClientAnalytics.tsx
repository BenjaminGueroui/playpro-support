import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { calculateProgress } from '@/lib/utils';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import type { User, ClientProgress } from '@/types';

interface ClientAnalyticsProps {
  client: User;
  progress: ClientProgress[];
}

export default function ClientAnalytics({ client, progress }: ClientAnalyticsProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const completedSteps = progress.filter(p => p.isCompleted).length;
  const totalSteps = progress.length;
  const progressPercentage = calculateProgress(completedSteps, totalSteps);

  // Calculate time analytics
  const timeAnalytics = progress
    .filter(p => p.completedAt)
    .map(p => {
      const completedDate = new Date(p.completedAt!);
      const previousStep = progress[progress.indexOf(p) - 1];
      const startDate = previousStep?.completedAt 
        ? new Date(previousStep.completedAt)
        : new Date(client.createdAt);
      
      return {
        stepId: p.stepId,
        timeSpent: completedDate.getTime() - startDate.getTime(),
        completedAt: completedDate
      };
    });

  const averageTimePerStep = timeAnalytics.length
    ? timeAnalytics.reduce((acc, curr) => acc + curr.timeSpent, 0) / timeAnalytics.length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg border border-border overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/admin/clients/${client.id}/customize`}>
                {t('admin.customizeOnboarding')}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{t('admin.onboardingProgress')}</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              {t('admin.averageTimePerStep', {
                time: Math.round(averageTimePerStep / (1000 * 60 * 60))
              })} heures
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="border-t border-border"
        >
          <div className="p-6 space-y-4">
            <h4 className="font-medium">{t('admin.stepBreakdown')}</h4>
            {timeAnalytics.map((analytics) => (
              <div
                key={analytics.stepId}
                className="flex items-center justify-between text-sm"
              >
                <span>Étape {analytics.stepId}</span>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    {Math.round(analytics.timeSpent / (1000 * 60 * 60))} heures
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(analytics.completedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}