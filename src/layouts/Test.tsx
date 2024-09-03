import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchBar from '../components/SearchBar';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import { FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

interface Test {
  id: string;
  date: string;
  title: string;
  description: TestDescription;
  grade: number;
  class: string;
  section: string;
  teacher: string;
  notes: string;
}

const tests: Test[] = [
  {
    id: '1',
    date: '2024-08-01',
    title: 'امتحان في الرياضيات',
    description: 'امتحان نصفي',
    grade: 90,
    class: 'Class 1',
    section: 'Section A',
    teacher: 'Teacher 1',
    notes: 'أداء ممتاز',
  },
  {
    id: '2',
    date: '2024-08-05',
    title: 'اختبار في العلوم',
    description: 'امتحان أخير',
    grade: 85,
    class: 'Class 2',
    section: 'Section B',
    teacher: 'Teacher 2',
    notes: 'جيد جداً',
  },
  {
    id: '3',
    date: '2024-08-10',
    title: 'اختبار في اللغة العربية',
    description: 'شفهي',
    grade: 75,
    class: 'Class 3',
    section: 'Section C',
    teacher: 'Teacher 3',
    notes: 'يمكن تحسين القواعد',
  },
  {
    id: '4',
    date: '2024-08-15',
    title: 'امتحان في التاريخ',
    description: 'كتابي',
    grade: 80,
    class: 'Class 1',
    section: 'Section A',
    teacher: 'Teacher 1',
    notes: 'أداء جيد',
  },
  {
    id: '5',
    date: '2024-08-20',
    title: 'اختبار في الفيزياء',
    description: 'امتحان نصفي',
    grade: 88,
    class: 'Class 2',
    section: 'Section B',
    teacher: 'Teacher 2',
    notes: 'تحتاج إلى مراجعة المفاهيم الأساسية',
  },
];

type TestDescription = 'شفهي' | 'كتابي' | 'امتحان نصفي' | 'امتحان أخير';

const FilterOptions = {
  classes: ['Class 1', 'Class 2', 'Class 3'],
  sections: ['Section A', 'Section B', 'Section C'],
  genders: ['ذكور', 'إناث'],
  teachers: ['Teacher 1', 'Teacher 2', 'Teacher 3'],
  dateOptions: ['يوم', 'شهر', 'أسبوع', 'تاريخ محدد', 'من – إلى'],
};

const TestComponent: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedDateOption, setSelectedDateOption] = useState<string | null>(
    null
  );
  const [dateInput, setDateInput] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredTests, setFilteredTests] = useState<Test[]>(tests as Test[]);
  const navigate = useNavigate();
  const [showPopUpDelete, setShowPopUpDelete] = useState<
    [string | number, boolean]
  >(['', false]);

  const getStartAndEndDates = (date: Date) => {
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    endOfWeek.setDate(date.getDate() + (6 - date.getDay()));

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return {
      weekStart: startOfWeek,
      weekEnd: endOfWeek,
      monthStart: startOfMonth,
      monthEnd: endOfMonth,
    };
  };

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
      link: 'studentsTests',
      color: '#ec5d98',
    },
  ];

  return (
    <div
      className="container mx-auto p-1 shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الاختبار"
        />
      )}
      <div className="flex flex-row w-full justify-between items-center p-4">
        <h1
          className="text-xl font-bold text-gray-800 mb-4"
          style={{ direction: 'rtl' }}
        >
          اختبارات
        </h1>
        <SearchBar />
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            className="block mb-2 text-gray-700"
            style={{ direction: 'rtl' }}
          >
            الصف
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            style={{ direction: 'rtl' }}
            value={selectedClass || ''}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">اختر الصف</option>
            {FilterOptions.classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            className="block mb-2 text-gray-700"
            style={{ direction: 'rtl' }}
          >
            الشعبة
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            style={{ direction: 'rtl' }}
            value={selectedSection || ''}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">اختر الشعبة</option>
            {FilterOptions.sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            className="block mb-2 text-gray-700"
            style={{ direction: 'rtl' }}
          >
            الجنس
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            style={{ direction: 'rtl' }}
            value={selectedGender || ''}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">اختر الجنس</option>
            {FilterOptions.genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            className="block mb-2 text-gray-700"
            style={{ direction: 'rtl' }}
          >
            الأستاذ
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            style={{ direction: 'rtl' }}
            value={selectedTeacher || ''}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">اختر الأستاذ</option>
            {FilterOptions.teachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            className="block mb-2 text-gray-700"
            style={{ direction: 'rtl' }}
          >
            التاريخ
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            style={{ direction: 'rtl' }}
            value={selectedDateOption || ''}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedDateOption(value);
              if (value === 'من – إلى') {
                setDateInput(null);
              } else {
                setStartDate(null);
                setEndDate(null);
                setDateInput(new Date());
              }
            }}
          >
            <option value="">اختر التاريخ</option>
            {FilterOptions.dateOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {(selectedDateOption === 'تاريخ محدد' ||
          selectedDateOption === 'يوم') && (
          <div className="flex-1 mt-4">
            <label
              className="block mb-2 text-gray-700"
              style={{ direction: 'rtl' }}
            >
              اختر التاريخ
            </label>
            <DatePicker
              selected={dateInput}
              onChange={(date) => setDateInput(date as Date)}
              dateFormat="yyyy/MM/dd"
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {selectedDateOption === 'أسبوع' && (
          <div className="flex flex-row gap-4 mt-4">
            <div className="flex-1">
              <label
                className="block mb-2 text-gray-700"
                style={{ direction: 'rtl' }}
              >
                اختر تاريخ
              </label>
              <DatePicker
                selected={dateInput}
                onChange={(date) => setDateInput(date as Date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {selectedDateOption === 'شهر' && (
          <div className="flex flex-row gap-4 mt-4">
            <div className="flex-1">
              <label
                className="block mb-2 text-gray-700"
                style={{ direction: 'rtl' }}
              >
                اختر تاريخ
              </label>
              <DatePicker
                selected={dateInput}
                onChange={(date) => setDateInput(date as Date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {selectedDateOption === 'من – إلى' && (
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <label
                className="block mb-2 text-gray-700"
                style={{ direction: 'rtl' }}
              >
                من
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label
                className="block mb-2 text-gray-700"
                style={{ direction: 'rtl' }}
              >
                إلى
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Test Schedule Table */}
      <Table<Test>
        tableHeads={[
          'اسم الاختبار',
          'وصف',
          'الصف',
          ' الشعبة',
          ' التاريخ',
          'العلامة',
          'الاستاذ',
          'ملاحظات',
          'العمليات',
          'معلومات',
        ]}
        tableBody={tests}
        keys={[
          'title',
          'description',
          'class',
          'section',
          'date',
          'grade',
          'teacher',
          'notes',
        ]}
        operations={operations}
        links={links}
      />
    </div>
  );
};

export default TestComponent;
