import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
type AuthMode = 'login' | 'register';
import logo1 from '../assets/logo1.png';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div className="bg-black bg-opacity-10 flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        style={{ direction: 'rtl' }}
      >
        <div className="text-center mb-6">
          <img src={logo1} alt="Logo" className="mx-auto mb-4 h-50 w-45" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <label className="block">
              <span className="text-gray-700">الاسم الكامل</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </label>
          )}
          <label className="block">
            <span className="text-gray-700">البريد الإلكتروني</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">كلمة المرور</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </label>
          {mode === 'register' && (
            <label className="block">
              <span className="text-gray-700">تأكيد كلمة المرور</span>
              <input
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </label>
          )}
          <div className="mt-6">
            <button
              type="submit"
              onClick={() => navigate('/home/students')}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-blue-500 hover:underline"
            >
              {mode === 'login'
                ? 'لا تملك حسابًا؟ سجل هنا'
                : 'لديك حساب؟ سجل الدخول هنا'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
