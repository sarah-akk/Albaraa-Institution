import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table/Table';

interface Homework {
  id: string;
  name: string;
  dueDate: string;
  submitted: string;
  grade?: string;
}

// Mock data for homeworks
const mockHomeworks: Homework[] = [
  {
    id: '1',
    name: 'Student A',
    dueDate: '2024-08-20',
    submitted: 'تم التقديم',
    grade: '90',
  },
  {
    id: '2',
    name: 'Student B',
    dueDate: '2024-08-25',
    submitted: 'لم يتم التقديم',
    grade: undefined,
  },
  {
    id: '3',
    name: 'Student C',
    dueDate: '2024-09-01',
    submitted: 'تم التقديم',
    grade: '85',
  },
  {
    id: '4',
    name: 'Student A',
    dueDate: '2024-09-01',
    submitted: 'تم التقديم',
    grade: '75',
  },
];

const StudentsHomeWorks: React.FC = () => {
  const [filteredHomeworks, setFilteredHomeworks] =
    useState<Homework[]>(mockHomeworks);

  return (
    <div
      className="container mx-auto p-6 shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      <div className="flex flex-row w-full justify-between items-center p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          الواجبات المقدمة من الطلاب
        </h1>
        <SearchBar />
      </div>

      {/* Homeworks Table */}
      <Table<Homework>
        tableHeads={[
          'اسم الطالب',
          'تاريخ التسليم',
          'تم التقديم',
          'العلامة',
          '',
        ]}
        tableBody={filteredHomeworks}
        keys={['name', 'dueDate', 'submitted', 'grade']}
      />
    </div>
  );
};

export default StudentsHomeWorks;
