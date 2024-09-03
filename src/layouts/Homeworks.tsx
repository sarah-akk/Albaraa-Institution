import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import PopUpDelete from '../components/PopUpDelete';

interface Homework {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  dueDate: string;
}

const mockHomeworks: Homework[] = [
  {
    id: '1',
    title: 'الواجب الأول',
    subject: 'الرياضيات',
    teacher: 'أستاذ أحمد',
    dueDate: '2024-08-20',
  },
  {
    id: '2',
    title: 'الواجب الثاني',
    subject: 'اللغة العربية',
    teacher: 'أستاذة فاطمة',
    dueDate: '2024-08-25',
  },
  {
    id: '3',
    title: 'الواجب الثالث',
    subject: 'العلوم',
    teacher: 'أستاذة نورة',
    dueDate: '2024-09-01',
  },
];

const Homeworks: React.FC = () => {
  const [homeworks, setHomeworks] = useState<Homework[]>(mockHomeworks);
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
  ];

  const links: TableButtonLink[] = [
    {
      name: 'الطلاب',
      link: 'studentsHomeworks',
      color: '#ec5d98',
    },
  ];

  return (
    <div
      className="container mx-auto  shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الوظيفة"
        />
      )}
      <div className="flex flex-row w-full justify-between items-center p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">واجبات الطلاب</h1>
        <SearchBar />
      </div>

      {/* Homeworks Table */}
      <Table<Homework>
        tableHeads={[
          'عنوان الواجب',
          'المادة',
          'الأستاذ',
          'تاريخ التسليم',
          'العمليات',
          'الطلاب',
        ]}
        tableBody={homeworks}
        keys={['title', 'subject', 'teacher', 'dueDate']}
        operations={operations}
        links={links}
      />
    </div>
  );
};

export default Homeworks;
