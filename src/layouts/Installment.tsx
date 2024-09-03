import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

type Installment = {
  id: number;
  name: string;
  phone: string;
  parentPhone: string;
  installments: Array<{
    amount: number;
    date: string;
    total: number;
    paid: number;
    remaining: number;
  }>;
};

const dummyData: Installment[] = [
  {
    id: 1,
    name: 'Ahmed Ali',
    phone: '123-456-7890',
    parentPhone: '098-765-4321',
    installments: [
      {
        amount: 100,
        date: '2024-08-01',
        total: 500,
        paid: 100,
        remaining: 400,
      },
    ],
  },
  {
    id: 2,
    name: 'sara akkad',
    phone: '123-456-7890',
    parentPhone: '098-765-4321',
    installments: [
      {
        amount: 200,
        date: '2024-08-01',
        total: 1000,
        paid: 200,
        remaining: 400,
      },
    ],
  },
];

const Installment = () => {
  const [students, setStudents] = useState<Installment[]>(dummyData);
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<Installment | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 5;

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleStudentClick = (student: Installment) => {
    setSelectedStudent((prev) =>
      prev && prev.id === student.id ? null : student
    );
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.includes(search) ||
      student.parentPhone.includes(search)
    );
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStudents.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);

  return (
    <div className="p-6 min-h-screen" style={{ direction: 'rtl' }}>
      <h1 className="text-xl font-bold mb-4">قسم الأقساط</h1>

      <div
        className="mb-4 flex flex-col md:flex-row gap-4 w-full"
        style={{ direction: 'rtl' }}
      >
        <SearchBar />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3"
        >
          <option value="">فلتر حسب الحالة</option>
          <option value="paid">مدفوعة</option>
          <option value="unpaid">غير مدفوعة</option>
        </select>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="الصف"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="الشعبة"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gray-200 sticky top-0 ">
            <tr>
              <th className="p-3 text-right">اسم الطالب</th>
              <th className="p-3 text-right">رقم الهاتف</th>
              <th className="p-3 text-right">رقم هاتف الأهل</th>
              <th className="p-3 text-right">عرض التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((student) => (
              <React.Fragment key={student.id}>
                <tr
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStudentClick(student)}
                >
                  <td className="p-3 text-right">{student.name}</td>
                  <td className="p-3">{student.phone}</td>
                  <td className="p-3">{student.parentPhone}</td>
                  <td className="p-3 text-blue-500">عرض</td>
                </tr>
                {selectedStudent && selectedStudent.id === student.id && (
                  <tr>
                    <td colSpan={4} className="bg-gray-50">
                      <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">
                          تفاصيل الأقساط للطالب {selectedStudent.name}
                        </h2>
                        <table className="w-full bg-gray-100 shadow-md rounded-lg border border-gray-200">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="p-3 text-right">القيمة</th>
                              <th className="p-3 text-right">التاريخ</th>
                              <th className="p-3 text-right">القسط الكلي</th>
                              <th className="p-3 text-right">القسط المدفوع</th>
                              <th className="p-3 text-right">القسط المتبقي</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedStudent.installments.map((inst, index) => (
                              <tr key={index}>
                                <td className="p-3">{inst.amount}</td>
                                <td className="p-3">{inst.date}</td>
                                <td className="p-3">{inst.total}</td>
                                <td className="p-3">{inst.paid}</td>
                                <td className="p-3">{inst.remaining}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Installment;
