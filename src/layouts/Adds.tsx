import React, { useState } from 'react';
import Table, { TableOperation } from '../components/Table/Table';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

export interface Advertisement {
  id: string;
  name: string;
  date: string;
  image: string;
  description: string;
  time: string;
}

const initialAds: Advertisement[] = [
  {
    id: '1',
    name: 'Ad 1',
    date: '2024-08-08',
    image: 'https://via.placeholder.com/150',
    description: 'This is an advertisement.',
    time: '12:00 PM',
  },
  {
    id: '2',
    name: 'Ad 2',
    date: '2024-08-08',
    image: 'https://via.placeholder.com/150',
    description: 'This is an advertisement.',
    time: '12:00 PM',
  },
  {
    id: '3',
    name: 'Ad 3',
    date: '2024-08-08',
    image: 'https://via.placeholder.com/150',
    description: 'This is an advertisement.',
    time: '12:00 PM',
  },
];

const Adds: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>(initialAds);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [showPopUpDelete, setShowPopUpDelete] = useState<
    [string | number, boolean]
  >(['', false]);

  const operations: TableOperation[] = [
    {
      name: 'delete',
      icon: FaRegTrashAlt,
      link: false,
      color: 'red',
      onClick(id) {
        setShowPopUpDelete([id, true]);
      },
    },
    {
      name: 'edit',
      icon: FaEdit,
      link: false,
      color: 'blue',
      onClick(id) {
        const ad = ads.find((ad) => ad.id === id);
        if (ad) {
          setEditingAd(ad);
          setIsModalOpen(true);
        }
      },
    },
  ];

  const handleAdd = () => {
    setEditingAd({
      id: new Date().toISOString(),
      name: '',
      date: '',
      image: '',
      description: '',
      time: '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (ad: Advertisement) => {
    if (editingAd) {
      if (ads.some((existingAd) => existingAd.id === ad.id)) {
        setAds(
          ads.map((existingAd) => (existingAd.id === ad.id ? ad : existingAd))
        );
      } else {
        setAds([...ads, ad]);
      }
    }
    setIsModalOpen(false);
    setEditingAd(null);
  };

  return (
    <div className="container mx-auto p-6">
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الإعلان"
        />
      )}

      <h1
        className="text-xl font-bold text-gray-800 mb-6"
        style={{ direction: 'rtl' }}
      >
        قسم الإعلانات
      </h1>

      <button
        className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
        onClick={handleAdd}
      >
        إضافة إعلان +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999 bg-black">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            style={{ direction: 'rtl' }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {editingAd ? 'تعديل الإعلان' : 'إضافة إعلان'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingAd) {
                  handleSave(editingAd);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">اسم الإعلان</label>
                <input
                  type="text"
                  value={editingAd?.name || ''}
                  onChange={(e) =>
                    setEditingAd({
                      ...editingAd!,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">التاريخ</label>
                <input
                  type="date"
                  value={editingAd?.date || ''}
                  onChange={(e) =>
                    setEditingAd({
                      ...editingAd!,
                      date: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">الصورة</label>
                <input
                  type="url"
                  value={editingAd?.image || ''}
                  onChange={(e) =>
                    setEditingAd({
                      ...editingAd!,
                      image: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">الوصف</label>
                <textarea
                  value={editingAd?.description || ''}
                  onChange={(e) =>
                    setEditingAd({
                      ...editingAd!,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">الوقت</label>
                <input
                  type="time"
                  value={editingAd?.time || ''}
                  onChange={(e) =>
                    setEditingAd({
                      ...editingAd!,
                      time: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-between gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                >
                  إغلاق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <Table<Advertisement>
          tableHeads={[
            'الاسم',
            'التاريخ',
            'الوصف',
            'الصورة',
            'الوقت',
            'العمليات',
          ]}
          tableBody={ads}
          keys={['name', 'date', 'description', 'image', 'time']}
          operations={operations}
        />
      </div>
    </div>
  );
};

export default Adds;
