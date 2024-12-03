import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

interface LevelProgressProps {
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

export default function LevelProgress({ level, experience, experienceToNextLevel }: LevelProgressProps) {
  const progress = (experience / experienceToNextLevel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg border border-border p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Niveau {level}</h3>
            <p className="text-sm text-muted-foreground">
              {experience} / {experienceToNextLevel} XP
            </p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
        >
          {level}
        </motion.div>
      </div>
      <Progress value={progress} />
    </motion.div>
  );
}