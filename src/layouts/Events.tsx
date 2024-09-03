import React, { useState } from 'react';
import Table, { TableOperation } from '../components/Table/Table';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

export interface Event {
  id: string;
  name: string;
  date: string;
  image: string;
  description: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'الفعالية الأولى',
    date: '2024-09-15',
    image: 'https://via.placeholder.com/150',
    description: 'وصف للفعالية الأولى.',
  },
  {
    id: '2',
    name: 'الفعالية الثانية',
    date: '2024-10-01',
    image: 'https://via.placeholder.com/150',
    description: 'وصف للفعالية الثانية.',
  },
  {
    id: '3',
    name: 'الفعالية الثالثة',
    date: '2024-11-10',
    image: 'https://via.placeholder.com/150',
    description: 'وصف للفعالية الثالثة.',
  },
  {
    id: '4',
    name: 'الفعالية الرابعة',
    date: '2024-12-05',
    image: 'https://via.placeholder.com/150',
    description: 'وصف للفعالية الرابعة.',
  },
  {
    id: '5',
    name: 'الفعالية الخامسة',
    date: '2025-01-20',
    image: 'https://via.placeholder.com/150',
    description: 'وصف للفعالية الخامسة.',
  },
];

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
        setIsModalOpen(true);
      },
    },
  ];

  const handleAdd = () => {
    setIsModalOpen(true);
    setEditingEvent({
      id: new Date().toISOString(),
      name: '',
      date: '',
      image: '',
      description: '',
    });
    setImagePreview(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setImagePreview(event.image);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleSave = (event: Event) => {
    if (editingEvent) {
      if (events.some((ev) => ev.id === event.id)) {
        setEvents(events.map((ev) => (ev.id === event.id ? event : ev)));
      } else {
        setEvents([...events, event]);
      }
    }
    setIsModalOpen(false);
    setEditingEvent(null);
    setImagePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        if (editingEvent) {
          setEditingEvent({ ...editingEvent, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6 ">
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الفعالية"
        />
      )}
      <h1
        className="text-xl font-bold text-gray-800 mb-6"
        style={{ direction: 'rtl' }}
      >
        قسم الفعاليات
      </h1>

      <button
        className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
        onClick={handleAdd}
      >
        إضافة فعالية +
      </button>

      {isModalOpen && (
        <div
          className="fixed bg-black inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-999"
          style={{ direction: 'rtl' }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {editingEvent ? 'تعديل فعالية' : 'إضافة فعالية'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingEvent) {
                  handleSave(editingEvent);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">اسم الفعالية</label>
                <input
                  type="text"
                  value={editingEvent?.name || ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent!, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">
                  تاريخ الفعالية
                </label>
                <input
                  type="date"
                  value={editingEvent?.date || ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent!, date: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">
                  صورة الفعالية
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-full h-40 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">وصف الفعالية</label>
                <textarea
                  value={editingEvent?.description || ''}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent!,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-between gap-2 ">
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
        <Table<Event>
          tableHeads={['الاسم', 'الوصف', 'الصورة', 'التاريخ', 'العمليات']}
          tableBody={mockEvents}
          keys={['name', 'description', 'image', 'date']}
          operations={operations}
        />
      </div>
    </div>
  );
};

export default Events;
