import React, { useState } from 'react';
import Table, { TableOperation } from '../components/Table/Table';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

export interface Notification {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  time: string;
  category: string;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'إعلان مهم',
    date: '2024-08-08',
    image: 'https://via.placeholder.com/100',
    description: 'تفاصيل الإعلان المهمة التي يجب على الجميع الاطلاع عليها.',
    time: '10:00 AM',
    category: 'طلاب صف',
  },
  {
    id: '2',
    title: 'إعلان مهم',
    date: '2024-08-08',
    image: 'https://via.placeholder.com/100',
    description: 'تفاصيل الإعلان المهمة التي يجب على الجميع الاطلاع عليها.',
    time: '10:00 AM',
    category: 'طلاب صف',
  },
  {
    id: '3',
    title: 'إعلان مهم',
    date: '2024-08-08',
    image: 'https://via.placeholder.com/100',
    description: 'تفاصيل الإعلان المهمة التي يجب على الجميع الاطلاع عليها.',
    time: '10:00 AM',
    category: 'طلاب صف',
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNotification, setEditingNotification] =
    useState<Notification | null>(null);
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
        const notification = notifications.find((n) => n.id === id);
        if (notification) {
          setEditingNotification(notification);
          setIsModalOpen(true);
        }
      },
    },
  ];

  const handleAdd = () => {
    setEditingNotification({
      id: new Date().toISOString(),
      title: '',
      date: '',
      image: '',
      description: '',
      time: '',
      category: '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (notification: Notification) => {
    if (editingNotification) {
      if (
        notifications.some(
          (existingNotification) => existingNotification.id === notification.id
        )
      ) {
        setNotifications(
          notifications.map((existingNotification) =>
            existingNotification.id === notification.id
              ? notification
              : existingNotification
          )
        );
      } else {
        setNotifications([...notifications, notification]);
      }
    }
    setIsModalOpen(false);
    setEditingNotification(null);
  };

  return (
    <div className="container mx-auto p-6">
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الاشعار"
        />
      )}

      <h1
        className="text-xl font-bold text-gray-800 mb-6"
        style={{ direction: 'rtl' }}
      >
        قسم الاشعارات
      </h1>

      <button
        className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
        onClick={handleAdd}
      >
        إضافة اشعار +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999 bg-black">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            style={{ direction: 'rtl' }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {editingNotification ? 'تعديل اشعار' : 'إضافة اشعار'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingNotification) {
                  handleSave(editingNotification);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">
                  عنوان الاشعار
                </label>
                <input
                  type="text"
                  value={editingNotification?.title || ''}
                  onChange={(e) =>
                    setEditingNotification({
                      ...editingNotification!,
                      title: e.target.value,
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
                  value={editingNotification?.date || ''}
                  onChange={(e) =>
                    setEditingNotification({
                      ...editingNotification!,
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
                  value={editingNotification?.image || ''}
                  onChange={(e) =>
                    setEditingNotification({
                      ...editingNotification!,
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
                  value={editingNotification?.description || ''}
                  onChange={(e) =>
                    setEditingNotification({
                      ...editingNotification!,
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
                  value={editingNotification?.time || ''}
                  onChange={(e) =>
                    setEditingNotification({
                      ...editingNotification!,
                      time: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">الفئة</label>
                <input
                  type="text"
                  value={editingNotification?.category || ''}
                  onChange={(e) =>
                    setEditingNotification({
                      ...editingNotification!,
                      category: e.target.value,
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
        <Table<Notification>
          tableHeads={[
            'العنوان',
            'التاريخ',
            'الوصف',
            'الصورة',
            'الوقت',
            'الفئة',
            'العمليات',
          ]}
          tableBody={notifications}
          keys={['title', 'date', 'description', 'image', 'time', 'category']}
          operations={operations}
        />
      </div>
    </div>
  );
};

export default Notifications;
