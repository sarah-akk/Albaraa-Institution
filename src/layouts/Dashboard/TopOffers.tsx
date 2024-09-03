import "react-datepicker/dist/react-datepicker.css";
import salonLogo from "../../assets/institution.png";

export type SalonProfits = {
  logo: string;
  softwareName: string;
  visitors: number;
  profits: string;
  sales: number;
  conversionRate: number;
  date: Date;
};

const salonData: SalonProfits[] = [
  {
    logo: salonLogo,
    softwareName: "برنامج صالون",
    visitors: 3.5,
    profits: "5,768",
    sales: 590,
    conversionRate: 4.8,
    date: new Date("2024-01-01"),
  },
  {
    logo: salonLogo,
    softwareName: "إدارة الصالونات",
    visitors: 2.2,
    profits: "4,635",
    sales: 467,
    conversionRate: 4.3,
    date: new Date("2024-02-15"),
  },
  {
    logo: salonLogo,
    softwareName: "صالون برو",
    visitors: 2.1,
    profits: "4,290",
    sales: 420,
    conversionRate: 3.7,
    date: new Date("2024-03-10"),
  },
  {
    logo: salonLogo,
    softwareName: "صالون ماستر",
    visitors: 1.5,
    profits: "3,580",
    sales: 389,
    conversionRate: 2.5,
    date: new Date("2024-04-20"),
  },
  {
    logo: salonLogo,
    softwareName: "مدير الصالون",
    visitors: 3.5,
    profits: "6,768",
    sales: 390,
    conversionRate: 4.2,
    date: new Date("2024-05-05"),
  },
];

const SalonProfitTable = () => {
  return (
    <div
      className="rounded-sm w-full border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-lg sm:px-7.5 xl:pb-1"
      style={{ direction: "rtl" }}
    >
      <h4 className="mb-6 text-xl font-semibold text-black">الأرباح الأخيرة</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              الشعار
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              اسم مقدم الخدمة
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              الأرباح
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              المبيعات
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              معدل التحويل
            </h5>
          </div>
        </div>

        {salonData.map((salon, key) => (
          <div className={`grid grid-cols-3 sm:grid-cols-5 `} key={key}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="rounded-full w-20">
                <img src={salon.logo} alt="Salon Logo" />
              </div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5 text-black">
              <p className="text-black">{salon.softwareName}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${salon.profits}</p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5 text-black">
              <p className="text-black">{salon.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{salon.conversionRate}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalonProfitTable;
