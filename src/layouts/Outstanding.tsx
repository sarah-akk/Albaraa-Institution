import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  year: string;
  grade: number;
  rank: number;
}

const mockOutstanding: Student[] = [
  {
    id: '1',
    name: 'Ahmed',
    class: 'Class 1',
    section: 'Section A',
    year: '2024',
    grade: 95,
    rank: 1,
  },
  {
    id: '2',
    name: 'Sara',
    class: 'Class 2',
    section: 'Section B',
    year: '2024',
    grade: 92,
    rank: 2,
  },
];

const Outstanding: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockOutstanding);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
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
    setEditingStudent({
      id: new Date().toISOString(),
      name: '',
      class: '',
      section: '',
      year: '',
      grade: 0,
      rank: 0,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleSave = (student: Student) => {
    if (editingStudent) {
      if (students.some((stu) => stu.id === student.id)) {
        // Update existing student
        setStudents(
          students.map((stu) => (stu.id === student.id ? student : stu))
        );
      } else {
        // Add new student
        setStudents([...students, student]);
      }
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="container mx-auto p-6 ">
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الطالب"
        />
      )}
      <h1
        className="text-xl font-bold text-gray-800 mb-6"
        style={{ direction: 'rtl' }}
      >
        قسم المتفوقين
      </h1>

      <button
        className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
        onClick={() => setIsModalOpen(true)}
      >
        اضافة متفوق +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999 bg-black">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            style={{ direction: 'rtl' }}
          >
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ direction: 'rtl' }}
            >
              {editingStudent ? 'تعديل المتفوق' : 'إضافة متفوق'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingStudent) {
                  handleSave(editingStudent);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">اسم الطالب</label>
                <input
                  type="text"
                  value={editingStudent?.name || ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent!,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">الصف</label>
                <input
                  type="text"
                  value={editingStudent?.class || ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent!,
                      class: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">الشعبة</label>
                <input
                  type="text"
                  value={editingStudent?.section || ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent!,
                      section: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">السنة</label>
                <input
                  type="text"
                  value={editingStudent?.year || ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent!,
                      year: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">العلامة</label>
                <input
                  type="number"
                  value={editingStudent?.grade || ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent!,
                      grade: +e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">الترتيب</label>
                <input
                  type="number"
                  value={editingStudent?.rank || ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent!,
                      rank: +e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-between gap-2">
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
        <Table<Student>
          tableHeads={[
            'الاسم',
            'الصف',
            'الشعبة',
            'السنة',
            'العلامة',
            'الترتيب',
            'العمليات',
          ]}
          tableBody={students}
          keys={['name', 'class', 'section', 'year', 'grade', 'rank']}
          operations={operations}
        />
      </div>
    </div>
  );
};

export default Outstanding;
