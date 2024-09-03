import React, { useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

type SocialMediaLink = {
  type: 'facebook' | 'instagram' | 'whatsapp' | 'telegram' | 'email' | 'phone';
  value: string;
};

const Contact: React.FC = () => {
  const [links, setLinks] = useState<SocialMediaLink[]>([
    { type: 'facebook', value: '' },
    { type: 'instagram', value: '' },
    { type: 'whatsapp', value: '' },
    { type: 'telegram', value: '' },
    { type: 'email', value: '' },
    { type: 'phone', value: '' },
  ]);

  const handleChange = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index].value = value;
    setLinks(updatedLinks);
  };

  const handleSave = () => {
    console.log('Saved links:', links);
    alert('Changes have been saved!');
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">تواصل معنا</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((link, index) => (
            <div key={link.type} className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center text-blue-600">
                {link.type === 'facebook' && <FaFacebookF size={24} />}
                {link.type === 'instagram' && <FaInstagram size={24} />}
                {link.type === 'whatsapp' && <FaWhatsapp size={24} />}
                {link.type === 'telegram' && <FaTelegramPlane size={24} />}
                {link.type === 'email' && <FaEnvelope size={24} />}
                {link.type === 'phone' && <FaPhone size={24} />}
              </div>
              <div className="ml-4 flex-1">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {link.type}
                </label>
                <input
                  type={link.type === 'email' ? 'email' : 'text'}
                  value={link.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`Enter ${link.type}`}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Edits
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
