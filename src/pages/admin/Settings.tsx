import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Cog, Globe, Bell } from 'lucide-react';

interface SettingsState {
  general: {
    companyName: string;
    supportEmail: string;
  };
  localization: {
    defaultLanguage: string;
    timezone: string;
  };
  notifications: {
    emailNotifications: boolean;
    progressAlerts: boolean;
  };
}

interface FieldOption {
  value: string;
  label: string;
}

interface Field {
  label: string;
  type: 'text' | 'email' | 'select' | 'checkbox';
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  options?: FieldOption[];
}

export default function Settings() {
  const { toast } = useToast();

  const [settings, setSettings] = useState<SettingsState>({
    general: {
      companyName: 'PlayPro Support',
      supportEmail: 'support@playpro.com'
    },
    localization: {
      defaultLanguage: 'fr',
      timezone: 'Europe/Paris'
    },
    notifications: {
      emailNotifications: true,
      progressAlerts: true
    }
  });

  const handleChange = (
    section: keyof SettingsState,
    field: string,
    value: string | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos modifications ont été enregistrées avec succès.",
      duration: 3000,
    });
  };

  const sections = [
    {
      id: 'general',
      icon: Cog,
      title: 'Paramètres généraux',
      description: 'Configurez les paramètres de base de votre plateforme',
      fields: [
        {
          label: 'Nom de l\'entreprise',
          type: 'text',
          value: settings.general.companyName,
          onChange: (value: string | boolean) => handleChange('general', 'companyName', value as string)
        },
        {
          label: 'Email de support',
          type: 'email',
          value: settings.general.supportEmail,
          onChange: (value: string | boolean) => handleChange('general', 'supportEmail', value as string)
        }
      ]
    },
    {
      id: 'localization',
      icon: Globe,
      title: 'Localisation',
      description: 'Gérez les paramètres de langue et de fuseau horaire',
      fields: [
        {
          label: 'Langue par défaut',
          type: 'select',
          value: settings.localization.defaultLanguage,
          onChange: (value: string | boolean) => handleChange('localization', 'defaultLanguage', value as string),
          options: [
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'English' }
          ]
        },
        {
          label: 'Fuseau horaire',
          type: 'select',
          value: settings.localization.timezone,
          onChange: (value: string | boolean) => handleChange('localization', 'timezone', value as string),
          options: [
            { value: 'Europe/Paris', label: 'Paris (UTC+1)' },
            { value: 'Europe/London', label: 'London (UTC)' }
          ]
        }
      ]
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifications',
      description: 'Configurez vos préférences de notification',
      fields: [
        {
          label: 'Notifications par email',
          type: 'checkbox',
          value: settings.notifications.emailNotifications,
          onChange: (value: string | boolean) => handleChange('notifications', 'emailNotifications', value as boolean)
        },
        {
          label: 'Alertes de progression',
          type: 'checkbox',
          value: settings.notifications.progressAlerts,
          onChange: (value: string | boolean) => handleChange('notifications', 'progressAlerts', value as boolean)
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Paramètres</h2>
        <Button variant="gradient" onClick={handleSave}>
          Enregistrer
        </Button>
      </div>

      <div className="grid gap-6">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {section.fields.map((field: Field, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <label className="flex-1 text-sm font-medium">
                      {field.label}
                    </label>
                    {field.type === 'text' || field.type === 'email' ? (
                      <input
                        type={field.type}
                        value={field.value as string}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="px-3 py-2 bg-background border border-input rounded-md"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={field.value as string}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="px-3 py-2 bg-background border border-input rounded-md"
                      >
                        {field.options?.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={field.value as boolean}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}