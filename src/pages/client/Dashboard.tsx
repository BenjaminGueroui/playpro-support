import { useAuthStore } from '@/store/auth';
import { mockOnboardingSteps, mockBadges, mockClientProgress } from '@/data/mock';
import Achievements from '@/components/client/Achievements';
import StepCard from '@/components/client/StepCard';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const progress = mockClientProgress[user?.id || ''] || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bienvenue, {user?.name} !</h1>
        <p className="text-muted-foreground">
          Continuez votre parcours d'intégration et débloquez des récompenses.
        </p>
      </div>

      <Achievements badges={mockBadges} />

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold mb-6">Suivre mon Onboarding</h2>
        <div className="space-y-6">
          {mockOnboardingSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              progress={progress.find(p => p.stepId === step.id)}
              isLast={index === mockOnboardingSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}