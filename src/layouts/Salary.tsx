import React from 'react';
import Table from '../components/Table/Table';

type Salary = {
  id: string;
  name: string;
  amount: number;
  date: string;
};

const salaryData: Salary[] = [
  {
    id: '1',
    name: 'John Doe',
    amount: 3000,
    date: '2024-08-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    amount: 3200,
    date: '2024-08-01',
  },
  {
    id: '3',
    name: 'Emily Johnson',
    amount: 2900,
    date: '2024-08-01',
  },
];

const SalaryManagement: React.FC = () => {
  const tableHeads = ['الاسم', 'المبلغ', 'التاريخ', ''];
  const keys: (keyof Salary)[] = ['name', 'amount', 'date'];
  const tableBody = salaryData;

  return (
    <div className="p-6 bg-gray-100 min-h-screen" style={{ direction: 'rtl' }}>
      <h1 className="text-xl font-bold mb-6 "> الرواتب</h1>

      <Table tableHeads={tableHeads} tableBody={tableBody} keys={keys} />
    </div>
  );
};

export default SalaryManagement;
