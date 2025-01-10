import { useState } from 'react';

interface Preference {
  id: string;
  title: string;
  description: string;
  value: string | boolean;
  type: 'select' | 'toggle';
  options?: string[];
}

const defaultPreferences: Preference[] = [
  {
    id: 'language',
    title: 'Language',
    description: 'Choose your preferred language',
    value: 'english',
    type: 'select',
    options: ['english', 'spanish', 'french']
  },
  {
    id: 'units',
    title: 'Measurement Units',
    description: 'Choose your preferred measurement system',
    value: 'imperial',
    type: 'select',
    options: ['imperial', 'metric']
  },
  {
    id: 'darkMode',
    title: 'Dark Mode',
    description: 'Enable dark mode for the app',
    value: false,
    type: 'toggle'
  },
  {
    id: 'emailReceipts',
    title: 'Email Receipts',
    description: 'Automatically send receipts to your email',
    value: true,
    type: 'toggle'
  }
];

export default function PreferencesSettings() {
  const [preferences, setPreferences] = useState(defaultPreferences);

  const handleChange = (id: string, newValue: string | boolean) => {
    setPreferences(preferences.map(pref =>
      pref.id === id ? { ...pref, value: newValue } : pref
    ));
  };

  return (
    <div className="space-y-6">
      {preferences.map(pref => (
        <div key={pref.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{pref.title}</h3>
              <p className="text-sm text-gray-500">{pref.description}</p>
            </div>
            {pref.type === 'select' ? (
              <select
                value={pref.value as string}
                onChange={(e) => handleChange(pref.id, e.target.value)}
                className="p-2 border rounded-lg capitalize"
              >
                {pref.options?.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <button
                onClick={() => handleChange(pref.id, !pref.value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pref.value ? 'bg-black' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pref.value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        className="w-full bg-black text-white text-lg py-4 rounded-lg"
      >
        Save Preferences
      </button>
    </div>
  );
}