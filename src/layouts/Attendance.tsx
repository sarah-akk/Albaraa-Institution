import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const AttendanceData = [
  {
    id: 'attendance-1',
    personType: 'student',
    name: 'Ali Ahmed',
    date: '2024-08-01',
    day: 'Thursday',
    lateness: {
      duration: '15 minutes',
      arrivalTime: '08:15 AM',
      reason: 'Traffic jam',
      justified: true,
    },
    absence: {
      reason: null,
      justified: null,
    },
  },
  {
    id: 'attendance-2',
    personType: 'student',
    name: 'Sara Mohammed',
    date: '2024-08-01',
    day: 'Thursday',
    lateness: {
      duration: '30 minutes',
      arrivalTime: '08:30 AM',
      reason: 'Medical appointment',
      justified: true,
    },
    absence: {
      reason: null,
      justified: null,
    },
  },
  {
    id: 'attendance-3',
    personType: 'teacher',
    name: 'Dr. Ahmed El-Sayed',
    date: '2024-08-02',
    day: 'Friday',
    lateness: {
      duration: null,
      arrivalTime: null,
      reason: null,
      justified: null,
    },
    absence: {
      reason: 'Family emergency',
      justified: true,
    },
  },
  {
    id: 'attendance-4',
    personType: 'teacher',
    name: 'Ms. Layla Khaled',
    date: '2024-08-02',
    day: 'Friday',
    lateness: {
      duration: null,
      arrivalTime: null,
      reason: null,
      justified: null,
    },
    absence: {
      reason: null,
      justified: false,
    },
  },
  {
    id: 'attendance-5',
    personType: 'student',
    name: 'Mohamed Youssef',
    date: '2024-08-03',
    day: 'Saturday',
    lateness: {
      duration: '10 minutes',
      arrivalTime: '08:10 AM',
      reason: 'Overslept',
      justified: false,
    },
    absence: {
      reason: null,
      justified: null,
    },
  },
];

const Attendance: React.FC = () => {
  const [selectedPersonType, setSelectedPersonType] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');

  const filteredData = AttendanceData.filter((record) => {
    return (
      (selectedPersonType ? record.personType === selectedPersonType : true) &&
      (selectedReason
        ? (selectedReason === 'lateness' && record.lateness.duration) ||
          (selectedReason === 'absence' && record.absence.reason)
        : true)
    );
  });

  return (
    <div
      className="container mx-auto p-6 bg-white shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      <div className="flex flex-row w-full justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">جدول الحضور</h1>
        <SearchBar />
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-600">نوع الشخص</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedPersonType}
            onChange={(e) => setSelectedPersonType(e.target.value)}
          >
            <option value="student">طلاب</option>
            <option value="teacher">أساتذة</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-2 text-gray-600">السبب</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          >
            <option value="lateness">تأخر</option>
            <option value="absence">غياب</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">التاريخ</th>
            <th className="border border-gray-300 p-2">اليوم</th>
            <th className="border border-gray-300 p-2">الاسم</th>
            {selectedReason === 'lateness' && (
              <>
                <th className="border border-gray-300 p-2">مدة التأخر</th>
                <th className="border border-gray-300 p-2">وقت الوصول</th>
                <th className="border border-gray-300 p-2">سبب التأخر</th>
              </>
            )}
            {selectedReason === 'absence' && (
              <th className="border border-gray-300 p-2">سبب الغياب</th>
            )}
            <th className="border border-gray-300 p-2">مبرر</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((record) => (
            <tr key={record.id}>
              <td className="border border-gray-300 p-2">{record.date}</td>
              <td className="border border-gray-300 p-2">{record.day}</td>
              <td className="border border-gray-300 p-2">{record.name}</td>
              {selectedReason === 'lateness' && (
                <>
                  <td className="border border-gray-300 p-2">
                    {record.lateness?.duration || '-'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {record.lateness?.arrivalTime || '-'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {record.lateness?.reason || '-'}
                  </td>
                </>
              )}
              {selectedReason === 'absence' && (
                <td className="border border-gray-300 p-2">
                  {record.absence?.reason || '-'}
                </td>
              )}
              <td className="border border-gray-300 p-2">
                {record.lateness?.justified || record.absence?.justified
                  ? 'مبرر'
                  : 'غير مبرر'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
