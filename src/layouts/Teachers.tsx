import React, { useState } from 'react';
import Select from 'react-select';
0;
import teacher from '../assets/teacher.jpg';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

const teachers = [
  {
    id: '1',
    name: 'أحمد علي',
    subjects: ['رياضيات', 'فيزياء'],
    description:
      'أستاذ ذو خبرة طويلة في تدريس الرياضيات والفيزياء. يعمل على تحسين مستوى الطلاب من خلال طرق تدريس مبتكرة.',
    image: teacher,
    classes: ['10', '11'],
    sections: ['A', 'B'],
  },
  {
    id: '2',
    name: 'سارة محمد',
    subjects: ['كيمياء', 'أحياء'],
    description:
      'أستاذة متخصصة في الكيمياء والأحياء، تسعى لتحقيق التفوق الأكاديمي لطلابها من خلال دروس عملية.',
    image: teacher,
    classes: ['12'],
    sections: ['A'],
  },
  {
    id: '3',
    name: 'محمود عبد الله',
    subjects: ['تاريخ', 'جغرافيا'],
    description:
      'مدرس متخصص في التاريخ والجغرافيا، لديه قدرة على توصيل المعلومات بطريقة شيقة.',
    image: teacher,
    classes: ['11', '12'],
    sections: ['B', 'C'],
  },
  {
    id: '4',
    name: 'ليلى سالم',
    subjects: ['لغة عربية', 'أدب'],
    description:
      'أستاذة لغة عربية وأدب، تسعى لنقل حب اللغة العربية لطلابها من خلال دروس مليئة بالتحفيز.',
    image: teacher,
    classes: ['10'],
    sections: ['A'],
  },
  {
    id: '5',
    name: 'يوسف حسين',
    subjects: ['فيزياء', 'رياضيات'],
    description:
      'أستاذ فيزياء ورياضيات ذو مهارات تدريس متميزة، يعمل على تطوير مهارات الطلاب من خلال مشروعات وأنشطة.',
    image: teacher,
    classes: ['12'],
    sections: ['C'],
  },
];

interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  description: string;
  image: string;
  classes: string[];
  sections: string[];
}

const filterOptions = {
  classes: ['10', '11', '12'],
  sections: ['A', 'B', 'C'],
  genders: ['ذكور', 'اناث'],
};

const Teachers: React.FC = () => {
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
        setModalVisible(true);
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

  const [selectedClass, setSelectedClass] = useState<any>([]);
  const [selectedSection, setSelectedSection] = useState<any>([]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subjects: '',
    image: '',
    classes: [] as string[],
    sections: [] as string[],
  });
  const [showPopUpDelete, setShowPopUpDelete] = useState<
    [string | number, boolean]
  >(['', false]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Teacher:', newTeacher);
    setNewTeacher({
      name: '',
      subjects: '',
      image: '',
      classes: [],
      sections: [],
    });
    setModalVisible(false);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesClass = selectedClass.length
      ? selectedClass.some((cls) => teacher.classes.includes(cls.value))
      : true;
    const matchesSection = selectedSection.length
      ? selectedSection.some((sec) => teacher.sections.includes(sec.value))
      : true;

    return matchesClass && matchesSection;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTeacher((prevState) => ({
          ...prevState,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (selectedOptions: any, field: string) => {
    setNewTeacher((prevState) => ({
      ...prevState,
      [field]: selectedOptions.map((option: any) => option.value),
    }));
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
    <div className="container mx-auto p-4">
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الاستاذ"
        />
      )}
      <h1 className="text-xl font-bold text-gray-900 mb-3 flex flex-row-reverse">
        جدول المعلمين
      </h1>

      <button
        className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
        onClick={() => setModalVisible(true)}
      >
        انشاء حساب +
      </button>

      {/* Modal */}
      {isModalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-999 bg-black"
          style={{ direction: 'rtl' }}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-3">إضافة أستاذ جديد</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-gray-600 text-sm text-right">
                  اسم الأستاذ
                </label>
                <input
                  type="text"
                  name="name"
                  value={newTeacher.name}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-sm text-right">
                  المادة
                </label>
                <input
                  type="text"
                  name="subjects"
                  value={newTeacher.subjects}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-sm text-right">
                  الصورة
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  accept="image/*"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-sm text-right">
                  الصفوف
                </label>
                <Select
                  isMulti
                  options={classOptions}
                  value={classOptions.filter((option) =>
                    newTeacher.classes.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    handleSelectChange(selectedOptions, 'classes')
                  }
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600 text-sm text-right">
                  الشعب
                </label>
                <Select
                  isMulti
                  options={sectionOptions}
                  value={sectionOptions.filter((option) =>
                    newTeacher.sections.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    handleSelectChange(selectedOptions, 'sections')
                  }
                  className="w-full text-sm"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded text-sm"
                >
                  إضافة أستاذ
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-black p-1 rounded text-sm"
                  onClick={() => setModalVisible(false)}
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
            isMulti
            options={classOptions}
            value={selectedClass}
            onChange={(selectedOptions) => setSelectedClass(selectedOptions)}
            className="w-full text-sm"
            placeholder="حدد الصفوف"
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
            isMulti
            options={sectionOptions}
            value={selectedSection}
            onChange={(selectedOptions) => setSelectedSection(selectedOptions)}
            className="w-full text-sm"
            placeholder="حدد الشعب"
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

      {/* Teacher Table */}
      <Table<Teacher>
        tableHeads={[
          'اسم الاستاذ',
          'الصورة',
          'المادة',
          ' الصفوف',
          ' الشعب',
          'العمليات',
          'معلومات',
        ]}
        tableBody={teachers}
        keys={['name', 'image', 'subjects', 'classes', 'sections']}
        operations={operations}
        links={links}
      />
    </div>
  );
};

export default Teachers;
