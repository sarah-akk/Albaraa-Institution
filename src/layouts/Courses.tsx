import React, { useState } from 'react';
import { FaEdit, FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import Table, { TableOperation } from '../components/Table/Table';
import PopUpDelete from '../components/PopUpDelete';
import IT from '../assets/IT.png';

interface Course {
  id: string;
  name: string;
  image: string;
}

const subjects: Course[] = [
  {
    id: '1',
    name: 'رياضيات',
    image: IT,
  },
  {
    id: '2',
    name: 'فيزياء',
    image: IT,
  },
];

const Courses: React.FC = () => {
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
        setModalOpen(true);
      },
    },
  ];

  const [showPopUpDelete, setShowPopUpDelete] = useState<
    [string | number, boolean]
  >(['', false]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseImage, setNewCourseImage] = useState<string | null>(null);

  const handleSaveNewCourse = () => {
    const newCourse: Course = {
      id: '',
      name: newCourseName,
      image: newCourseImage || '',
    };

    console.log('New Course Data:', newCourse);

    subjects.push(newCourse);

    setModalOpen(false);
    setNewCourseName('');
    setNewCourseImage(null);
  };

  return (
    <div
      className="container mx-auto p-6 bg-white shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="المادة"
        />
      )}
      <div className="flex flex-row items-center justify-between w-full p-6 bg-white">
        <h1 className="text-xl font-bold text-gray-800">قائمة المواد</h1>
        <button
          className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
          onClick={() => setModalOpen(true)}
        >
          انشاء مادة +
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999  bg-black">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">إنشاء مادة جديدة</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">اسم المادة</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">صورة المادة</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) =>
                  setNewCourseImage(
                    URL.createObjectURL(e.target.files?.[0] || new Blob())
                  )
                }
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleSaveNewCourse}
              >
                حفظ
              </button>
              <button
                className="bg-gray-500 text-black p-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Courses Table */}
      <Table<Course>
        tableHeads={['اسم المادة', 'الصورة', 'العمليات']}
        tableBody={subjects}
        keys={['name', 'image']}
        operations={operations}
      />
    </div>
  );
};

export default Courses;
