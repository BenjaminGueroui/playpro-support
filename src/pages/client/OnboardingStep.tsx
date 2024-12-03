import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { mockOnboardingSteps } from '@/data/mock';
import ChecklistItem from '@/components/client/ChecklistItem';
import { ArrowLeft } from 'lucide-react';

export default function OnboardingStep() {
  const { t } = useTranslation();
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const step = mockOnboardingSteps.find(s => s.id === stepId);

  useEffect(() => {
    setCompletedItems([]);
  }, [stepId]);

  if (!step) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Étape introuvable</h2>
        <Button onClick={() => navigate('/client')}>
          Retourner au tableau de bord
        </Button>
      </div>
    );
  }

  const handleCompleteItem = (itemId: string) => {
    setCompletedItems(prev => [...prev, itemId]);
  };

  const handleCompleteStep = async () => {
    if (isCompleting || completedItems.length !== step.checklist.length) return;
    setIsCompleting(true);

    try {
      confetti({
        particleCount: 300,
        spread: 180,
        origin: { x: 0.9, y: 0.1 },
        colors: ['#EC4899', '#8B5CF6', '#FFD700'],
      });

      toast({
        title: "🎉 Étape Terminée !",
        description: "Félicitations ! Tu peux passer à l'étape suivante. 🚀",
        duration: 3000,
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentIndex = mockOnboardingSteps.findIndex(s => s.id === stepId);
      const nextStep = mockOnboardingSteps[currentIndex + 1];
      
      if (nextStep) {
        navigate(`/client/step/${nextStep.id}`);
      } else {
        navigate('/client');
      }
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur s'est produite. Réessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex items-center gap-2"
        >
          <Link to="/client">
            <ArrowLeft className="w-4 h-4" />
            Retour au Dashboard
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{step.title}</h1>
        <p className="text-muted-foreground">{step.description}</p>
      </div>

      {step.videoUrl && (
        <div className="aspect-video rounded-lg overflow-hidden bg-card">
          <iframe
            src={step.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Liste des tâches</h2>
        <div className="space-y-2">
          {step.checklist.map((item) => (
            <ChecklistItem
              key={item.id}
              id={item.id}
              text={item.text}
              isCompleted={completedItems.includes(item.id)}
              onComplete={handleCompleteItem}
              points={10}
              isDisabled={false}
            />
          ))}
        </div>
      </div>

      <Button
        variant="gradient"
        className="w-full"
        disabled={completedItems.length !== step.checklist.length || isCompleting}
        onClick={handleCompleteStep}
      >
        {isCompleting ? 'Finalisation...' : 'Terminer l\'étape'}
      </Button>
    </div>
  );
}