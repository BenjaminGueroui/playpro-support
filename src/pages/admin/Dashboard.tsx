import { useState } from 'react';
import { BarChart3, Users, Award, ArrowUpRight } from 'lucide-react';
import { mockUsers, mockClientProgress } from '@/data/mock';
import { calculateProgress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ClientCard from '@/components/admin/ClientCard';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const clients = mockUsers.filter(user => user.role === 'client');
  const totalClients = clients.length;
  const activeClients = Object.keys(mockClientProgress).length;
  const averageProgress = Object.values(mockClientProgress).reduce((acc, progress) => {
    const completed = progress.filter(p => p.isCompleted).length;
    const total = progress.length;
    return acc + calculateProgress(completed, total);
  }, 0) / activeClients;

  const stats = [
    {
      name: 'Total Clients',
      value: totalClients,
      change: '+20%',
      icon: Users
    },
    {
      name: 'Active Onboarding',
      value: activeClients,
      change: '+12%',
      icon: BarChart3
    },
    {
      name: 'Avg. Progress',
      value: `${Math.round(averageProgress)}%`,
      change: '+5%',
      icon: Award
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-6 bg-card rounded-lg border border-border"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-green-500 flex items-center gap-1">
                  {stat.change}
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {clients.map(client => (
          <ClientCard
            key={client.id}
            client={client}
            progress={mockClientProgress[client.id] || []}
          />
        ))}
      </div>
    </div>
  );
}