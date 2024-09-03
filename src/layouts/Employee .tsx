// src/components/Employees.tsx
import React, { useState } from 'react';
import Select from 'react-select';
import Table, {
  TableButtonLink,
  TableOperation,
} from '../components/Table/Table';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import PopUpDelete from '../components/PopUpDelete';

interface Employee {
  id: string;
  name: string;
  description: string;
  roles: string[];
}

const rolesOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' },
];

const mockEmployeeData: Employee[] = [
  {
    id: 'e1',
    name: 'محمد عادل',
    description: 'مدير تكنولوجيا المعلومات',
    roles: ['Admin', 'Editor'],
  },
  {
    id: 'e2',
    name: 'سارة أحمد',
    description: 'محاسب',
    roles: ['Editor'],
  },
  {
    id: 'e3',
    name: 'فاطمة عبد الله',
    description: 'مسؤولة الموارد البشرية',
    roles: ['Viewer'],
  },
  {
    id: 'e4',
    name: 'علي حسين',
    description: 'مطور برمجيات',
    roles: ['Admin'],
  },
  {
    id: 'e5',
    name: 'منى خالد',
    description: 'مصمم جرافيك',
    roles: ['Editor', 'Viewer'],
  },
];

const links: TableButtonLink[] = [
  {
    name: 'عرض الرواتب',
    link: 'salary',
    color: '#ec5d98',
  },
];

const Employees: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    description: '',
    roles: [] as string[],
  });
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
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
        setFormVisible(true);
      },
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedOptions: any) => {
    setNewEmployee((prevState) => ({
      ...prevState,
      roles: selectedOptions
        ? selectedOptions.map((option: any) => option.value)
        : [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Employee:', newEmployee);
    setNewEmployee({
      name: '',
      description: '',
      roles: [],
    });
    setFormVisible(false);
  };

  const filteredEmployees = mockEmployeeData.filter((employee) => {
    const matchesRole = selectedRole
      ? employee.roles.includes(selectedRole)
      : true;
    return matchesRole;
  });

  return (
    <div className="container mx-auto p-6">
      {showPopUpDelete[1] && (
        <PopUpDelete
          id={showPopUpDelete[0]}
          setVisible={setShowPopUpDelete}
          name="الموظف"
        />
      )}
      <h1 className="text-xl font-bold text-gray-900 mb-4 flex flex-row-reverse">
        إدارة الموظفين
      </h1>

      <button
        className="bg-amber-500 text-white p-2 font-bold rounded text-sm"
        onClick={() => setFormVisible(true)}
      >
        اضافة موظف +
      </button>

      {/* Modal for new employee */}
      {isFormVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-999 bg-black"
          style={{ direction: 'rtl' }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">إضافة موظف جديد</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex-1">
                <label className="block mb-2 text-gray-600 text-right">
                  اسم الموظف
                </label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-gray-600 text-right">
                  الوصف
                </label>
                <input
                  type="text"
                  name="description"
                  value={newEmployee.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-gray-600 text-right">
                  الصلاحيات
                </label>
                <Select
                  isMulti
                  name="roles"
                  options={rolesOptions}
                  value={rolesOptions.filter((role) =>
                    newEmployee.roles.includes(role.value)
                  )}
                  onChange={handleRoleChange}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="اختر الصلاحيات"
                />
              </div>
              <div className="flex flex-row justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  إضافة موظف
                </button>
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="mt-2 bg-gray-500 text-black border border-spacing-6 p-2 rounded"
                >
                  إغلاق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-600 text-right">
            الصلاحيات
          </label>
          <Select
            value={
              rolesOptions.find((role) => role.value === selectedRole) || null
            }
            onChange={(selectedOption) =>
              setSelectedRole(selectedOption ? selectedOption.value : '')
            }
            options={[{ value: '', label: 'كل الصلاحيات' }, ...rolesOptions]}
            className="basic-single"
            classNamePrefix="select"
            placeholder="اختر الصلاحية"
            styles={{
              container: (provided) => ({
                ...provided,
                direction: 'rtl',
              }),
            }}
          />
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <Table<Employee>
          tableHeads={['الاسم', 'الوصف', 'الصلاحيات', 'العمليات', 'معلومات']}
          tableBody={mockEmployeeData}
          keys={['name', 'description', 'roles']}
          operations={operations}
          links={links}
        />
      </div>
    </div>
  );
};

export default Employees;
