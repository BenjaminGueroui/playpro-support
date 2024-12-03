export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  order: number;
  checklist: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  unlockedAt?: string;
}

export interface ClientProgress {
  userId: string;
  stepId: string;
  completedChecklist: string[];
  isCompleted: boolean;
  completedAt?: string;
}