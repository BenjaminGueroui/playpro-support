import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useToast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';

interface ChecklistItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
  onComplete: (id: string) => void;
  points: number;
  isDisabled?: boolean;
}

export default function ChecklistItem({
  id,
  text,
  isCompleted,
  onComplete,
  points,
  isDisabled
}: ChecklistItemProps) {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (isCompleted || isChecking || isDisabled) return;
    
    setIsChecking(true);
    
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.1 },
        colors: ['#EC4899', '#8B5CF6', '#FFD700']
      });

      toast({
        title: "🎉 Excellent !",
        description: `+${points} points ! Continue comme ça ! 🚀`,
        duration: 3000,
      });

      onComplete(id);
      
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur s'est produite. Réessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 p-4 rounded-lg border border-border transition-colors ${
        isCompleted ? 'bg-green-500/10 border-green-500/20' : !isDisabled ? 'hover:bg-accent cursor-pointer' : 'opacity-50'
      }`}
      onClick={handleCheck}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isCompleted
            ? 'bg-green-500 border-green-500'
            : 'border-muted-foreground'
        }`}
      >
        {isCompleted && <Check className="w-4 h-4 text-white" />}
      </div>
      <span className={isCompleted ? 'line-through text-muted-foreground' : ''}>
        {text}
      </span>
      <span className="ml-auto text-sm text-muted-foreground">
        +{points} points
      </span>
    </motion.div>
  );
}