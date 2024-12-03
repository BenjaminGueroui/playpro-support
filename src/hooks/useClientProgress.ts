import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';
import { calculateProgress } from '@/lib/utils';
import type { ClientProgress } from '@/types';

// This is a mock function - replace with actual API call
const fetchClientProgress = async (userId: string): Promise<ClientProgress[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          userId,
          stepId: '1',
          completedChecklist: ['1', '2'],
          isCompleted: true,
          completedAt: new Date().toISOString(),
        },
        // Add more mock progress data as needed
      ]);
    }, 500);
  });
};

export function useClientProgress() {
  const user = useAuthStore((state) => state.user);

  const { data: progressData } = useQuery({
    queryKey: ['clientProgress', user?.id],
    queryFn: () => fetchClientProgress(user?.id || ''),
    enabled: !!user?.id,
  });

  const completedSteps = progressData?.filter((p) => p.isCompleted).length || 0;
  const totalSteps = progressData?.length || 0;
  const progress = calculateProgress(completedSteps, totalSteps);

  return {
    progress,
    progressData,
  };
}