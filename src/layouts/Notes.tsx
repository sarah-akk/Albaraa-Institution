import React, { useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table/Table'; // Ensure Table component is correctly implemented

type StudentNote = {
  id: string;
  teacherName: string;
  name: string;
  title: string;
  date: string;
  time: string;
  text: string;
};

type Teacher = {
  id: string;
  name: string;
};

const teachers: Teacher[] = [
  { id: '1', name: 'Teacher A' },
  { id: '2', name: 'Teacher B' },
];

const notesByTeacher: { [key: string]: StudentNote[] } = {
  '1': [
    {
      id: '1',
      name: 'Student 1',
      teacherName: 'teacherName 1',
      title: 'Good Progress',
      date: '2024-08-01',
      time: '10:30',
      text: 'Student is showing good progress.',
    },
    {
      id: '2',
      name: 'Student 2',
      teacherName: 'teacherName 1',
      title: 'Needs Improvement',
      date: '2024-08-05',
      time: '14:00',
      text: 'Student needs to improve in math.',
    },
  ],
  '2': [
    {
      id: '3',
      name: 'Student 3',
      teacherName: 'teacherName 1',
      title: 'Excellent Work',
      date: '2024-08-10',
      time: '09:00',
      text: 'Student has done excellent work in the last assignment.',
    },
  ],
};

const TeacherNotes: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState<string>('');
  const [sectionFilter, setSectionFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const studentNotes = selectedTeacher
    ? notesByTeacher[selectedTeacher]
    : notesByTeacher['1'];
  const filteredNotes = studentNotes.filter((note) =>
    note.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeads = [
    'اسم الاستاذ',
    'اسم الطالب',
    'العنوان',
    'التاريخ',
    'الوقت',
    'الملاحظة',
  ];
  const tableBody = filteredNotes;
  const keys: (keyof StudentNote)[] = [
    'teacherName',
    'name',
    'title',
    'date',
    'time',
    'text',
  ];

  return (
    <div
      style={{
        padding: '24px',
        minHeight: '100vh',
        direction: 'rtl',
      }}
    >
      <h1
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '24px',
          textAlign: 'right',
        }}
      >
        ملاحظات الأساتذة
      </h1>

      {/* Teacher Selection */}
      <div className="flex flex-row justify-between items-center mb-10">
        <div className="flex flex-col flex-1 mr-4">
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              textAlign: 'right',
            }}
          >
            اختر أستاذ
          </label>
          <select
            value={selectedTeacher || ''}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              textAlign: 'right',
              border: '2px solid #ccc',
            }}
          >
            <option value="">اختار أستاذ</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 mr-4">
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              textAlign: 'right',
            }}
          >
            الصف
          </label>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              textAlign: 'right',
              border: '2px solid #ccc',
            }}
          >
            <option value="">الكل</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
          </select>
        </div>

        <div className="flex flex-col flex-1">
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              textAlign: 'right',
            }}
          >
            الشعبة
          </label>
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              textAlign: 'right',
              border: '2px solid #ccc',
            }}
          >
            <option value="">الكل</option>
            <option value="sectionA">Section A</option>
            <option value="sectionB">Section B</option>
          </select>
        </div>
      </div>

      {/* Student and Notes Display */}

      <Table tableHeads={tableHeads} tableBody={tableBody} keys={keys} />
    </div>
  );
};

export default TeacherNotes;
