import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';

interface Student {
  id: string;
  name: string;
  submitted: string;
  grade?: string;
}

const studentData = {
  '1': [
    { name: 'Student A', submitted: 'تم التقديم', grade: '50' },
    { name: 'Student B', submitted: 'لم يتم التقديم' },
    { name: 'Student C', submitted: 'تم التقديم', grade: '100' },
  ],
};

const StudentsTests: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string>('1');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(
    studentData[selectedTest]
  );
  const [showPopUpDelete, setShowPopUpDelete] = useState<
    [string | number, boolean]
  >(['', false]);

  const handleTestChange = (testId: string) => {
    setSelectedTest(testId);
    setFilteredStudents(studentData[testId]);
  };

  return (
    <div
      className="container mx-auto p-6 shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      <div className="flex flex-row w-full justify-between items-center p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          الطلاب الذين قاموا بالاختبار
        </h1>
        <SearchBar />
      </div>

      {/* Students Table */}
      <Table<Student>
        tableHeads={['اسم الطالب', 'قام بالتقديم', 'العلامة', '']}
        tableBody={filteredStudents}
        keys={['name', 'submitted', 'grade']}
      />
    </div>
  );
};

export default StudentsTests;
