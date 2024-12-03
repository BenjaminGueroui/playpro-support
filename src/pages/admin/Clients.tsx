import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { mockUsers, mockClientProgress } from '@/data/mock';
import { Button } from '@/components/ui/button';
import ClientAnalytics from '@/components/admin/ClientAnalytics';

export default function Clients() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const clients = mockUsers.filter(user => user.role === 'client');
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const progress = mockClientProgress[client.id] || [];
    const completedSteps = progress.filter(p => p.isCompleted).length;
    const totalSteps = progress.length;
    
    switch (filter) {
      case 'active':
        return matchesSearch && completedSteps > 0 && completedSteps < totalSteps;
      case 'completed':
        return matchesSearch && completedSteps === totalSteps;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{t('admin.clients')}</h2>
        <Button variant="gradient">
          {t('admin.addClient')}
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder={t('admin.searchClients')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredClients.map(client => (
          <ClientAnalytics
            key={client.id}
            client={client}
            progress={mockClientProgress[client.id] || []}
          />
        ))}
      </div>
    </div>
  );
}