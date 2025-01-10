import { useState } from 'react';

export default function SecuritySettings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEnable2FA, setShowEnable2FA] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Password</h3>
        <p className="text-sm text-gray-500 mb-4">
          Last changed 30 days ago
        </p>
        <button
          onClick={() => setShowChangePassword(true)}
          className="text-blue-600 text-sm"
        >
          Change Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              is2FAEnabled ? 'bg-black' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                is2FAEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {!is2FAEnabled && (
          <button
            onClick={() => setShowEnable2FA(true)}
            className="text-blue-600 text-sm"
          >
            Set Up Two-Factor Authentication
          </button>
        )}
      </div>

      {/* Login History */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Recent Login Activity</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium">New York, United States</p>
              <p className="text-gray-500">Chrome on Windows</p>
            </div>
            <p className="text-gray-500">Just now</p>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium">Los Angeles, United States</p>
              <p className="text-gray-500">Safari on iPhone</p>
            </div>
            <p className="text-gray-500">Yesterday</p>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 rounded-lg"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enable 2FA Modal */}
      {showEnable2FA && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Set Up Two-Factor Authentication</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <img
                  src="/qr-placeholder.png"
                  alt="2FA QR Code"
                  className="mx-auto w-48 h-48"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Scan this QR code with your authenticator app
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="000000"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setIs2FAEnabled(true);
                    setShowEnable2FA(false);
                  }}
                  className="flex-1 bg-black text-white py-2 rounded-lg"
                >
                  Verify
                </button>
                <button
                  onClick={() => setShowEnable2FA(false)}
                  className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}