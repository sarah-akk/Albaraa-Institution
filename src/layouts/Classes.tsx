import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

interface Class {
  id: string;
  name: string;
  numberOfSections: number;
}

const classes = [
  {
    id: 'class-1',
    name: 'Class 10',
    numberOfSections: 3,
  },
  {
    id: 'class-2',
    name: 'Class 11',
    numberOfSections: 2,
  },
  {
    id: 'class-3',
    name: 'Class 12',
    numberOfSections: 4,
  },
  {
    id: 'class-4',
    name: 'Class 9',
    numberOfSections: 2,
  },
  {
    id: 'class-5',
    name: 'Class 8',
    numberOfSections: 3,
  },
];

const Classes: React.FC = () => {
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

  const links: TableButtonLink[] = [
    {
      name: 'عرض الشعب',
      link: 'sections',
      color: '#ec5d98',
    },
  ];
  const [showPopUpDelete, setShowPopUpDelete] = useState<
    [string | number, boolean]
  >(['', false]);
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newNumberOfSections, setNewNumberOfSections] = useState(0);
  const [newSections, setNewSections] = useState<
    { name: string; gender: string }[]
  >([]);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionGender, setNewSectionGender] = useState<'Male' | 'Female'>(
    'Male'
  );

  const toggleSections = (id: string) => {
    setExpandedClassId(expandedClassId === id ? null : id);
  };

  const handleSaveNewClass = () => {
    const newClass: Class = {
      id: `${Date.now()}`,
      name: newClassName,
      numberOfSections: newNumberOfSections,
    };

    console.log('New Class Data:', newClass);

    setModalOpen(false);
    setNewClassName('');
    setNewNumberOfSections(0);
    setNewSections([]);
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
          name="الصف"
        />
      )}
      <div className="flex flex-row items-center justify-between w-full p-6 bg-white">
        <h1 className="text-xl font-bold text-gray-800">قائمة الصفوف</h1>
        <button
          className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
          onClick={() => setModalOpen(true)}
        >
          انشاء صف +
        </button>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999  bg-black"
          style={{ direction: 'rtl' }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">إنشاء صف جديد</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">اسم الصف</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">عدد الشعب</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={newNumberOfSections}
                onChange={(e) => setNewNumberOfSections(Number(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">إضافة شعبة</h3>
              <div className="flex mb-2">
                <input
                  type="text"
                  className="w-3/4 p-2 border border-gray-300 rounded-l"
                  placeholder="اسم الشعبة"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                />
                <select
                  className="w-1/4 p-2 border border-gray-300 rounded-r"
                  value={newSectionGender}
                  onChange={(e) =>
                    setNewSectionGender(e.target.value as 'Male' | 'Female')
                  }
                >
                  <option value="Male">ذكر</option>
                  <option value="Female">أنثى</option>
                </select>
              </div>
              <button
                className="bg-blue-500 text-white p-1 rounded"
                onClick={() => {
                  setNewSections([
                    ...newSections,
                    { name: newSectionName, gender: newSectionGender },
                  ]);
                  setNewSectionName('');
                }}
              >
                إضافة شعبة
              </button>
            </div>
            <div className="mb-4">
              {newSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded mb-2 flex justify-between"
                >
                  <span>{section.name}</span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${section.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}
                  >
                    {section.gender}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between  mt-10">
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleSaveNewClass}
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
      {/* classes Table */}
      <Table<Class>
        tableHeads={['اسم الصف', 'عدد الشعب', ' العمليات', ' الشعب']}
        tableBody={classes}
        keys={['name', 'numberOfSections']}
        operations={operations}
        links={links}
      />
    </div>
  );
};

export default Classes;
