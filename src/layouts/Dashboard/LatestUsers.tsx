import React from "react";

export interface Request {
  id: number;
  name: string;
  description: string;
  price: number;
  date: string;
  requestMethod: string;
  image: string;
}

const requestData: Request[] = [
  {
    id: 1,
    name: "محمد علي",
    description: "الباقة الذهبية",
    price: 199.99,
    date: "2024-08-01",
    requestMethod: "بطاقة ائتمان",
    image: "https://example.com/qr-code-1.png",
  },
  {
    id: 2,
    name: "سارة أحمد",
    description: "الباقة الفضية",
    price: 149.99,
    date: "2024-08-02",
    requestMethod: "باي بال",
    image: "https://example.com/qr-code-2.png",
  },
  {
    id: 3,
    name: "علي حسن",
    description: "الباقة البلاتينية",
    price: 299.99,
    date: "2024-08-03",
    requestMethod: "تحويل بنكي",
    image: "https://example.com/qr-code-3.png",
  },
  {
    id: 4,
    name: "فاطمة محمد",
    description: "الباقة البرونزية",
    price: 99.99,
    date: "2024-08-04",
    requestMethod: "بطاقة ائتمان",
    image: "https://example.com/qr-code-4.png",
  },
  {
    id: 5,
    name: "عبدالله يوسف",
    description: "الباقة الذهبية",
    price: 199.99,
    date: "2024-08-05",
    requestMethod: "باي بال",
    image: "https://example.com/qr-code-5.png",
  },
];

const LatestSalonRequests = () => {
  return (
    <div
      className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-lg sm:px-7.5 xl:pb-1"
      style={{ direction: "rtl" }}
    >
      <h4 className="mb-6 text-xl font-semibold text-black">آخر الحجوزات</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              الاسم
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              الوصف
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              السعر
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              طريقة الدفع
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              التاريخ
            </h5>
          </div>
        </div>

        {requestData.map((request, key) => (
          <div className="grid grid-cols-3 sm:grid-cols-5" key={key}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-cyan-800 font-bold">{request.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5 text-black">
              <p className="text-black">{request.description}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${request.price.toFixed(2)}</p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5 text-black">
              <p className="text-black">{request.requestMethod}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{request.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSalonRequests;
