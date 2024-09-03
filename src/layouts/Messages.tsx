import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '../components/Table/Table';

type Message = {
  id: string;
  senderName: string;
  phoneNumber: string;
  messageText: string;
  date: string;
  time: string;
};

const messages: Message[] = [
  {
    id: '1',
    senderName: 'أحمد علي',
    phoneNumber: '1234567890',
    messageText: 'لدي اقتراح بخصوص الميزات الجديدة في التطبيق.',
    date: '2024-08-08',
    time: '11:30',
  },
  {
    id: '2',
    senderName: 'سارة خالد',
    phoneNumber: '0987654321',
    messageText: 'أود تقديم شكوى بشأن انقطاع الخدمة الأخير.',
    date: '2024-08-09',
    time: '14:00',
  },
];

const theme = createTheme({
  direction: 'rtl',
});

const ComplaintsSuggestions: React.FC = () => {
  const keys: (keyof Message)[] = [
    'senderName',
    'phoneNumber',
    'messageText',
    'date',
    'time',
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="p-6 min-h-screen">
        <h1 className="text-xl font-bold mb-6 text-right">
          رسائل شكوى و اقتراح
        </h1>

        <div className="flex flex-col space-y-4" style={{ direction: 'rtl' }}>
          <Table<Message>
            tableHeads={[
              'اسم المرسل',
              'رقم الهاتف',
              'النص',
              'التاريخ',
              'الوقت',
            ]}
            tableBody={messages}
            keys={keys}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ComplaintsSuggestions;
