import React, { useState } from 'react';
import { classSchedules, teacherSchedules } from '../data/mockScheduleData';

interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher?: string;
  class?: string;
  section?: string;
}

interface ScheduleProps {
  data: ScheduleItem[];
  type: 'class' | 'teacher';
}

const groupByDay = (schedule: ScheduleItem[]) => {
  return schedule.reduce((acc: { [key: string]: ScheduleItem[] }, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {});
};

const ScheduleTable: React.FC<ScheduleProps> = ({ data, type }) => {
  const groupedSchedule = groupByDay(data);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">اليوم</th>
          <th className="border border-gray-300 p-2">وقت البداية</th>
          <th className="border border-gray-300 p-2">وقت النهاية</th>
          <th className="border border-gray-300 p-2">المادة</th>
          {type === 'class' ? (
            <th className="border border-gray-300 p-2">الأستاذ</th>
          ) : (
            <>
              <th className="border border-gray-300 p-2">الصف</th>
              <th className="border border-gray-300 p-2">الشعبة</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedSchedule).map(([day, items]) => (
          <React.Fragment key={day}>
            {items.map((item, index) => (
              <tr key={index}>
                {index === 0 && (
                  <td
                    rowSpan={items.length}
                    className="border border-gray-300 p-2"
                  >
                    {day}
                  </td>
                )}
                <td className="border border-gray-300 p-2">{item.startTime}</td>
                <td className="border border-gray-300 p-2">{item.endTime}</td>
                <td className="border border-gray-300 p-2">{item.subject}</td>
                {type === 'class' ? (
                  <td className="border border-gray-300 p-2">{item.teacher}</td>
                ) : (
                  <>
                    <td className="border border-gray-300 p-2">{item.class}</td>
                    <td className="border border-gray-300 p-2">
                      {item.section}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>(
    'students'
  );
  const [selectedClass, setSelectedClass] = useState<string | null>('10');
  const [selectedSection, setSelectedSection] = useState<string | null>('A');
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setSelectedSection(null);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
  };

  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeacher(event.target.value);
  };

  const selectedClassData = classSchedules.find(
    (schedule) =>
      schedule.class === selectedClass && schedule.section === selectedSection
  ) || { schedule: [] };

  const classScheduleData = selectedClassData.schedule;

  const teacherScheduleData =
    teacherSchedules.find((schedule) => schedule.teacher === selectedTeacher)
      ?.schedule || [];

  return (
    <div
      className="container mx-auto p-6 bg-white shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">برنامج الدوام</h1>

      {/* Tabs for navigating between students and teachers */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab('students')}
          className={`py-2 px-4 rounded ${activeTab === 'students' ? 'bg-purple-700 text-white' : 'bg-gray-200'}`}
        >
          برنامج الدوام للشعب
        </button>
        <button
          onClick={() => setActiveTab('teachers')}
          className={`py-2 px-4 rounded ${activeTab === 'teachers' ? 'bg-purple-700 text-white' : 'bg-gray-200'}`}
        >
          برنامج الدوام للأساتذة
        </button>
      </div>

      {/* Conditional rendering based on active tab */}
      {activeTab === 'students' ? (
        <div>
          {/* Class selection */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">الصف</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedClass || ''}
              onChange={handleClassChange}
            >
              <option value="">اختر الصف</option>
              {classSchedules.map((schedule) => (
                <option key={schedule.class} value={schedule.class}>
                  {schedule.class}
                </option>
              ))}
            </select>
          </div>

          {/* Section selection */}
          {selectedClass && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">الشعبة</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedSection || ''}
                onChange={handleSectionChange}
              >
                <option value="">اختر الشعبة</option>
                {classSchedules
                  .filter((schedule) => schedule.class === selectedClass)
                  .map((schedule) => (
                    <option key={schedule.section} value={schedule.section}>
                      {schedule.section}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Display class schedule */}
          {selectedClass && selectedSection && (
            <ScheduleTable data={classScheduleData} type="class" />
          )}
        </div>
      ) : (
        <div>
          {/* Teacher selection */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">الأستاذ</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedTeacher || ''}
              onChange={handleTeacherChange}
            >
              <option value="">اختر الأستاذ</option>
              {teacherSchedules.map((schedule) => (
                <option key={schedule.teacher} value={schedule.teacher}>
                  {schedule.teacher}
                </option>
              ))}
            </select>
          </div>

          {/* Display teacher schedule */}
          {selectedTeacher && (
            <ScheduleTable data={teacherScheduleData} type="teacher" />
          )}
        </div>
      )}
    </div>
  );
};

export default Schedule;
