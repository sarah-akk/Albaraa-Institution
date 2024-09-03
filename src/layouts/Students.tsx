import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import { FaEye, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

interface Student {
  id: number;
  studentName: string;
  class: string;
  section: string;
  phoneNumber: string;
  parentPhoneNumber: string;
}

const students: Student[] = [
  {
    id: 1,
    studentName: 'John Doe',
    class: '10',
    section: 'A',
    phoneNumber: '555-1234',
    parentPhoneNumber: '555-5678',
  },
  {
    id: 2,
    studentName: 'Emily Smith',
    class: '8',
    section: 'B',
    phoneNumber: '555-9876',
    parentPhoneNumber: '555-5432',
  },
  {
    id: 3,
    studentName: 'Michael Johnson',
    class: '12',
    section: 'C',
    phoneNumber: '555-2468',
    parentPhoneNumber: '555-1357',
  },
  {
    id: 4,
    studentName: 'Sarah Lee',
    class: '9',
    section: 'A',
    phoneNumber: '555-3456',
    parentPhoneNumber: '555-7890',
  },
  {
    id: 5,
    studentName: 'David Brown',
    class: '11',
    section: 'B',
    phoneNumber: '555-6789',
    parentPhoneNumber: '555-4321',
  },
];

// Define possible filter options
const filterOptions = {
  classes: ['10', '11', '12'],
  sections: ['A', 'B', 'C'],
  genders: ['ذكور', 'اناث'],
};

const StudentList: React.FC = () => {
  const [showPopUpDelete, setShowPopUpDelete] = useState<
    [string | number, boolean]
  >(['', false]);

  const operations: TableOperation[] = [
    {
      name: 'delete',
      icon: FaRegTrashAlt,
      color: 'red',
      link: false,
      onClick(id) {
        setShowPopUpDelete([id, true]);
      },
    },
  ];

  const links: TableButtonLink[] = [
    {
      name: 'الاختبارات',
      link: 'tests',
      color: '#ec5d98',
    },
    {
      name: 'الحضور',
      link: 'attendance',
      color: '#ec985d',
    },
    {
      name: ' البرنامج',
      link: 'schedule',
      color: '#f3d355',
    },
    {
      name: 'الملاحظات',
      link: 'notes',
      color: '#54d079',
    },
    {
      name: 'الاشعارات',
      link: 'notifications',
      color: '#54b1d0',
    },
    {
      name: 'وظائف',
      link: 'homeworks',
      color: '#547fd0',
    },
    {
      name: 'تغيير كلمة سر',
      link: 'changePassowrd',
      color: '#9054d0',
    },
    {
      name: 'الدفعات',
      link: 'payments',
      color: '#df586c',
    },
  ];

  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [newStudent, setNewStudent] = useState({
    studentName: '',
    class: '',
    section: '',
    phoneNumber: '',
    parentPhoneNumber: '',
  });

  const filteredStudents = students.filter((student) => {
    return (
      (selectedClass ? student.class === selectedClass : true) &&
      (selectedSection ? student.section === selectedSection : true)
    );
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Student:', newStudent);
    setNewStudent({
      studentName: '',
      class: '',
      section: '',
      phoneNumber: '',
      parentPhoneNumber: '',
    });
    setFormVisible(false);
  };

  const classOptions = filterOptions.classes.map((cls) => ({
    value: cls,
    label: cls,
  }));
  const sectionOptions = filterOptions.sections.map((sec) => ({
    value: sec,
    label: sec,
  }));
  const genderOptions = filterOptions.genders.map((gender) => ({
    value: gender,
    label: gender,
  }));

  return (
    <div className="p-4">
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الطالب"
        />
      )}
      <h1 className="text-xl font-bold text-gray-900 mb-3 flex flex-row-reverse">
        جدول الطلاب
      </h1>

      <button
        className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
        onClick={() => setFormVisible(true)}
      >
        انشاء حساب +
      </button>

      {/* Modal for Adding New Student */}
      {isFormVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999 bg-black"
          style={{ direction: 'rtl' }}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-3">إضافة طالب جديد</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-gray-600 text-right text-sm">
                  اسم الطالب
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={newStudent.studentName}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-right text-sm">
                  الصف
                </label>
                <select
                  name="class"
                  value={newStudent.class}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                >
                  <option value="">اختر الصف</option>
                  {filterOptions.classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-right text-sm">
                  الشعبة
                </label>
                <select
                  name="section"
                  value={newStudent.section}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                >
                  <option value="">اختر الشعبة</option>
                  {filterOptions.sections.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-right text-sm">
                  الهاتف
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={newStudent.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-right text-sm">
                  هاتف الاهل
                </label>
                <input
                  type="text"
                  name="parentPhoneNumber"
                  value={newStudent.parentPhoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded text-sm"
                >
                  إضافة طالب
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-black p-1 rounded text-sm"
                  onClick={() => setFormVisible(false)}
                >
                  إغلاق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label className="block mb-1 text-gray-600 text-sm text-right">
            الصف
          </label>
          <Select
            styles={{
              container: (provided) => ({
                ...provided,
                direction: 'rtl',
              }),
            }}
            options={classOptions}
            value={classOptions.find(
              (option) => option.value === selectedClass
            )}
            onChange={(selectedOption) =>
              setSelectedClass(selectedOption?.value || '')
            }
            className="w-full text-sm"
            placeholder="حدد الصف"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-gray-600 text-sm text-right">
            الشعبة
          </label>
          <Select
            styles={{
              container: (provided) => ({
                ...provided,
                direction: 'rtl',
              }),
            }}
            options={sectionOptions}
            value={sectionOptions.find(
              (option) => option.value === selectedSection
            )}
            onChange={(selectedOption) =>
              setSelectedSection(selectedOption?.value || '')
            }
            className="w-full text-sm"
            placeholder="حدد الشعبة"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-gray-600 text-sm text-right">
            النوع
          </label>
          <Select
            styles={{
              container: (provided) => ({
                ...provided,
                direction: 'rtl',
              }),
            }}
            options={genderOptions}
            value={genderOptions.find(
              (option) => option.value === selectedGender
            )}
            onChange={(selectedOption) =>
              setSelectedGender(selectedOption?.value || '')
            }
            className="w-full text-sm"
            placeholder="حدد النوع"
          />
        </div>
      </div>

      {/* Student Table */}
      <Table<Student>
        tableHeads={[
          'اسم الطالب',
          'الصف',
          'الشعبة',
          'رقم الهاتف',
          'رقم هاتف الاهل',
          'العمليات',
          'معلومات',
        ]}
        tableBody={students}
        keys={[
          'studentName',
          'class',
          'section',
          'phoneNumber',
          'parentPhoneNumber',
        ]}
        operations={operations}
        links={links}
      />
    </div>
  );
};

export default StudentList;
