import React, { useState } from 'react';
import { FaEdit, FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import PopUpDelete from '../components/PopUpDelete';

interface Section {
  id: string;
  name: string;
  gender: 'ذكور' | 'اناث';
  numberofstudents: number;
}

const sections: Section[] = [
  {
    id: '1',
    name: 'Section A',
    gender: 'ذكور',
    numberofstudents: 50,
  },
  {
    id: '2',

    name: 'Section B',
    gender: 'اناث',
    numberofstudents: 50,
  },
  {
    id: '3',

    name: 'Section C',
    gender: 'ذكور',
    numberofstudents: 50,
  },
];

const Sections: React.FC = () => {
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
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionGender, setNewSectionGender] = useState<'ذكور' | 'اناث'>(
    'ذكور'
  );
  const [newNumberOfStudents, setNewNumberOfStudents] = useState<number>(0);

  const handleSaveNewSection = () => {
    const newSection: Section = {
      id: '',
      name: newSectionName,
      gender: newSectionGender,
      numberofstudents: newNumberOfStudents,
    };

    console.log('New Section Data:', newSection);

    setModalOpen(false);
    setNewSectionName('');
    setNewSectionGender('ذكور');
    setNewNumberOfStudents(0);
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
          name="الشعبة"
        />
      )}
      <div className="flex flex-row items-center justify-between w-full p-6 bg-white">
        <h1 className="text-2xl font-bold text-gray-800">قائمة الشعب</h1>
        <button
          className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
          onClick={() => setModalOpen(true)}
        >
          انشاء شعبة +
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999  bg-black">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">إنشاء شعبة جديدة</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">اسم الشعبة</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">نوع الشعبة</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={newSectionGender}
                onChange={(e) =>
                  setNewSectionGender(e.target.value as 'ذكور' | 'اناث')
                }
              >
                <option value="Male">ذكور</option>
                <option value="Female">اناث</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">عدد الطلاب</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={newNumberOfStudents}
                onChange={(e) => setNewNumberOfStudents(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleSaveNewSection}
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
      {/* Sections Table */}
      <Table<Section>
        tableHeads={['اسم الشعبة', 'نوع الجنس', 'عدد الطلاب', 'العمليات']}
        tableBody={sections}
        keys={['name', 'gender', 'numberofstudents']}
        operations={operations}
      />
    </div>
  );
};

export default Sections;
