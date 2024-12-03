import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Trophy } from 'lucide-react';
import type { Badge } from '@/types';

interface AchievementsProps {
  badges: Badge[];
}

export default function Achievements({ badges }: AchievementsProps) {
  const { toast } = useToast();

  useEffect(() => {
    const unlockedBadges = badges.filter(badge => badge.unlockedAt);
    const lastUnlocked = unlockedBadges[unlockedBadges.length - 1];

    if (lastUnlocked?.unlockedAt) {
      const unlockDate = new Date(lastUnlocked.unlockedAt);
      const now = new Date();
      const timeDiff = now.getTime() - unlockDate.getTime();
      const minutesDiff = Math.floor(timeDiff / 1000 / 60);

      if (minutesDiff < 5) {
        toast({
          title: "New Achievement Unlocked! 🎉",
          description: `Congratulations! You've earned the "${lastUnlocked.name}" badge.`,
        });
      }
    }
  }, [badges]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 bg-card rounded-lg border border-border relative overflow-hidden ${
            !badge.unlockedAt && 'opacity-50'
          }`}
        >
          {badge.unlockedAt && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2"
            >
              <Trophy className="w-5 h-5 text-yellow-500" />
            </motion.div>
          )}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center">
              <img
                src={badge.imageUrl}
                alt={badge.name}
                className="w-6 h-6"
              />
            </div>
            <div>
              <h3 className="font-semibold">{badge.name}</h3>
              <p className="text-sm text-muted-foreground">
                {badge.unlockedAt 
                  ? `Unlocked ${new Date(badge.unlockedAt).toLocaleDateString()}`
                  : 'Locked'}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {badge.description}
          </p>
          {!badge.unlockedAt && (
            <div className="mt-4 p-2 bg-background/50 rounded text-xs text-muted-foreground">
              Complete related tasks to unlock this achievement
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}