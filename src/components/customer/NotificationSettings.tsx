import { useState } from 'react';

interface NotificationSetting {
  id: string;
  type: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: 'job_updates',
    type: 'Job Updates',
    description: 'Get notified about your move status',
    email: true,
    push: true,
    sms: false
  },
  {
    id: 'reminders',
    type: 'Reminders',
    description: 'Receive reminders before scheduled moves',
    email: true,
    push: true,
    sms: true
  },
  {
    id: 'promotions',
    type: 'Promotions',
    description: 'Special offers and discounts',
    email: true,
    push: false,
    sms: false
  },
  {
    id: 'billing',
    type: 'Billing',
    description: 'Payment confirmations and receipts',
    email: true,
    push: true,
    sms: true
  }
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  const toggleSetting = (id: string, channel: 'email' | 'push' | 'sms') => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? { ...setting, [channel]: !setting[channel] }
        : setting
    ));
  };

  return (
    <div className="space-y-6">
      {settings.map(setting => (
        <div key={setting.id} className="border rounded-lg p-4">
          <div className="mb-4">
            <h3 className="font-semibold">{setting.type}</h3>
            <p className="text-sm text-gray-500">{setting.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={setting.email}
                  onChange={() => toggleSetting(setting.id, 'email')}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm">Email</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={setting.push}
                  onChange={() => toggleSetting(setting.id, 'push')}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm">Push</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={setting.sms}
                  onChange={() => toggleSetting(setting.id, 'sms')}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm">SMS</span>
              </label>
            </div>
          </div>
        </div>
      ))}

      <button
        className="w-full bg-black text-white text-lg py-4 rounded-lg"
      >
        Save Notification Settings
      </button>
    </div>
  );
}