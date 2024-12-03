import { User, OnboardingStep, Badge, ClientProgress } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah@playpro.com',
    name: 'Sarah Johnson',
    role: 'admin',
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-11-20T15:30:00Z'
  },
  {
    id: '2',
    email: 'mike@tennisclub.com',
    name: 'Mike Anderson',
    role: 'client',
    createdAt: '2023-11-01T10:00:00Z',
    updatedAt: '2023-11-20T16:45:00Z'
  },
  {
    id: '3',
    email: 'emma@sportsacademy.com',
    name: 'Emma Williams',
    role: 'client',
    createdAt: '2023-11-10T09:15:00Z',
    updatedAt: '2023-11-20T14:20:00Z'
  }
];

export const mockOnboardingSteps: OnboardingStep[] = [
  {
    id: '1',
    title: 'Account Setup',
    description: 'Set up your PlayPro account and configure basic settings',
    videoUrl: 'https://youtube.com/watch?v=account-setup',
    order: 1,
    checklist: [
      { id: '1-1', text: 'Complete profile information', isCompleted: true },
      { id: '1-2', text: 'Upload business logo', isCompleted: true },
      { id: '1-3', text: 'Set business hours', isCompleted: false }
    ]
  },
  {
    id: '2',
    title: 'Payment Integration',
    description: 'Connect your Stripe account and set up payment processing',
    videoUrl: 'https://youtube.com/watch?v=payment-setup',
    order: 2,
    checklist: [
      { id: '2-1', text: 'Create Stripe account', isCompleted: true },
      { id: '2-2', text: 'Connect Stripe to PlayPro', isCompleted: false },
      { id: '2-3', text: 'Test payment processing', isCompleted: false }
    ]
  },
  {
    id: '3',
    title: 'Staff Management',
    description: 'Add your staff members and set their permissions',
    videoUrl: 'https://youtube.com/watch?v=staff-setup',
    order: 3,
    checklist: [
      { id: '3-1', text: 'Add staff members', isCompleted: false },
      { id: '3-2', text: 'Set staff roles', isCompleted: false },
      { id: '3-3', text: 'Configure schedules', isCompleted: false }
    ]
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Getting Started',
    description: 'Completed account setup and profile configuration',
    imageUrl: '/badges/getting-started.svg',
    unlockedAt: '2023-11-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Payment Pro',
    description: 'Successfully set up payment processing',
    imageUrl: '/badges/payment-pro.svg'
  },
  {
    id: '3',
    name: 'Team Leader',
    description: 'Configured staff management and schedules',
    imageUrl: '/badges/team-leader.svg'
  }
];

export const mockClientProgress: Record<string, ClientProgress[]> = {
  '2': [
    {
      userId: '2',
      stepId: '1',
      completedChecklist: ['1-1', '1-2'],
      isCompleted: true,
      completedAt: '2023-11-15T14:30:00Z'
    },
    {
      userId: '2',
      stepId: '2',
      completedChecklist: ['2-1'],
      isCompleted: false
    },
    {
      userId: '2',
      stepId: '3',
      completedChecklist: [],
      isCompleted: false
    }
  ],
  '3': [
    {
      userId: '3',
      stepId: '1',
      completedChecklist: ['1-1'],
      isCompleted: false
    },
    {
      userId: '3',
      stepId: '2',
      completedChecklist: [],
      isCompleted: false
    },
    {
      userId: '3',
      stepId: '3',
      completedChecklist: [],
      isCompleted: false
    }
  ]
};