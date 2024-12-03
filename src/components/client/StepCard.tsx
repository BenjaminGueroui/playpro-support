import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { OnboardingStep, ClientProgress } from '@/types';

interface StepCardProps {
  step: OnboardingStep;
  progress?: ClientProgress;
  isLast: boolean;
}

export default function StepCard({ step, progress, isLast }: StepCardProps) {
  const isCompleted = progress?.isCompleted;
  const isActive = !isCompleted && progress?.completedChecklist.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-semibold ${
          isCompleted
            ? 'bg-green-500/20 text-green-500'
            : isActive
            ? 'bg-primary/20 text-primary'
            : 'bg-muted text-muted-foreground'
        }`}>
          {step.order}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-border mt-2" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{step.title}</h3>
          </div>
          <Button
            variant={isCompleted ? 'outline' : 'gradient'}
            size="sm"
            asChild
          >
            <Link to={`/client/step/${step.id}`}>
              {isCompleted ? 'Revoir' : isActive ? 'Continuer' : 'Commencer'}
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {step.description}
        </p>
        <div className="space-y-2">
          {step.checklist.map((item) => {
            const isItemCompleted = progress?.completedChecklist.includes(item.id);
            return (
              <motion.div
                key={item.id}
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`w-4 h-4 rounded-full ${
                  isItemCompleted
                    ? 'bg-green-500'
                    : 'bg-muted'
                }`} />
                <span className={isItemCompleted ? '' : 'text-muted-foreground'}>
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}