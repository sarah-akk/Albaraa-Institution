import React, { useState } from 'react';

const mockSettingsData = {
  personalSettings: {
    fullName: 'أحمد العلي',
    email: 'ahmed.ali@example.com',
    phoneNumber: '+961 123 4567',
    address: 'شارع البستان، بيروت، لبنان',
  },
  securitySettings: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  preferences: {
    language: 'ar',
    theme: 'light',
  },
};

interface PersonalSettings {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Preferences {
  language: string;
  theme: string;
}

interface SettingsProps {
  personalSettings: PersonalSettings;
  securitySettings: SecuritySettings;
  preferences: Preferences;
}

const Settings: React.FC<SettingsProps> = () => {
  const [personal, setPersonal] = useState<PersonalSettings>(
    mockSettingsData.personalSettings
  );
  const [security, setSecurity] = useState<SecuritySettings>(
    mockSettingsData.securitySettings
  );
  const [prefs, setPrefs] = useState<Preferences>(mockSettingsData.preferences);

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonal({ ...personal, [name]: value });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurity({ ...security, [name]: value });
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPrefs({ ...prefs, [name]: value });
  };

  const handleSignOut = () => {
    alert('You have been signed out.');
  };

  return (
    <div
      className="container mx-auto p-6 bg-white shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      {/* Personal Settings */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          الإعدادات الشخصية
        </h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">الاسم الكامل</span>
            <input
              type="text"
              name="fullName"
              value={personal.fullName}
              onChange={handlePersonalChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">البريد الإلكتروني</span>
            <input
              type="email"
              name="email"
              value={personal.email}
              onChange={handlePersonalChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">رقم الهاتف</span>
            <input
              type="tel"
              name="phoneNumber"
              value={personal.phoneNumber}
              onChange={handlePersonalChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">العنوان</span>
            <input
              type="text"
              name="address"
              value={personal.address}
              onChange={handlePersonalChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          إعدادات الأمان
        </h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">كلمة المرور الحالية</span>
            <input
              type="password"
              name="currentPassword"
              value={security.currentPassword}
              onChange={handleSecurityChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">كلمة المرور الجديدة</span>
            <input
              type="password"
              name="newPassword"
              value={security.newPassword}
              onChange={handleSecurityChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">تأكيد كلمة المرور الجديدة</span>
            <input
              type="password"
              name="confirmPassword"
              value={security.confirmPassword}
              onChange={handleSecurityChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>
      </div>

      {/* Preferences */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">التفضيلات</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">اللغة</span>
            <select
              name="language"
              value={prefs.language}
              onChange={handlePreferencesChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="ar">العربية</option>
              <option value="en">الإنجليزية</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">الثيم</span>
            <select
              name="theme"
              value={prefs.theme}
              onChange={handlePreferencesChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="light">واضح</option>
              <option value="dark">داكن</option>
            </select>
          </label>
        </div>
      </div>

      {/* Save and Sign Out Buttons */}
      <div className="mt-10 gap-10 flex flex-row">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          حفظ التعديلات
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Settings;
