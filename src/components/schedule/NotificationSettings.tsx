import { useState } from 'react';

interface NotificationSetting {
  id: string;
  type: string;
  description: string;
  enabled: boolean;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: 'reminder_24h',
    type: '24 Hour Reminder',
    description: 'Get notified 24 hours before your scheduled move',
    enabled: true
  },
  {
    id: 'reminder_2h',
    type: '2 Hour Reminder',
    description: 'Get notified 2 hours before your scheduled move',
    enabled: true
  },
  {
    id: 'status_updates',
    type: 'Status Updates',
    description: 'Receive notifications when your move status changes',
    enabled: true
  },
  {
    id: 'crew_assigned',
    type: 'Crew Assignment',
    description: 'Get notified when a moving crew is assigned',
    enabled: true
  }
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
        <p className="text-sm text-gray-500 mb-4">
          Choose how and when you want to be notified about your moves.
        </p>
      </div>

      <div className="space-y-4">
        {settings.map(setting => (
          <div
            key={setting.id}
            className="flex items-start space-x-4 p-4 border rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium">{setting.type}</h3>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
            <button
              onClick={() => toggleSetting(setting.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.enabled ? 'bg-black' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  setting.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Contact Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
            <button className="text-sm text-blue-600">Change</button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-gray-500">(555) 123-4567</p>
            </div>
            <button className="text-sm text-blue-600">Change</button>
          </div>
        </div>
      </div>
    </div>
  );
}