import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/data/mock';

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setAuth(user, 'mock-token');
      navigate(user.role === 'admin' ? '/admin' : '/client');
    }
  };

  return (
    <div className="bg-card p-8 rounded-lg border border-border shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          PlayPro Support
        </h1>
        <p className="text-muted-foreground mt-2">
          Connectez-vous à votre tableau de bord
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <Button type="submit" variant="gradient" className="w-full">
          Se connecter
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Comptes de démonstration :</p>
        <p>Admin : sarah@playpro.com</p>
        <p>Client : mike@tennisclub.com</p>
        <p className="mt-1 text-xs">(N'importe quel mot de passe fonctionnera)</p>
      </div>
    </div>
  );
}