import { Link } from 'react-router-dom';
import { Users, BarChart, Settings } from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: BarChart },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          PlayPro Support
        </span>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}