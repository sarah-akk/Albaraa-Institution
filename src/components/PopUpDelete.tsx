/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dispatch, SetStateAction } from 'react';

interface PopUpAddOfferProps {
  id: string | number;
  setVisible: Dispatch<SetStateAction<[string | number, boolean]>>;
  name: string;
}

const PopUpDelete = ({ setVisible, name }: PopUpAddOfferProps) => {
  return (
    <div
      className="flex justify-center items-center h-full w-full fixed top-0 left-0 z-50"
      style={{ direction: 'rtl' }}
    >
      <div
        onClick={() => setVisible(['', false])}
        className="fixed w-full h-full bg-black/30 z-[1]"
      />
      <div className="bg-[#fff] flex flex-col gap-5 rounded-xl p-5 z-[2] w-1/3 min-h-1/3">
        <h1 className="text-lg font-bold">حذف {name}</h1>
        <p className="text-sm font-semibold">
          هل انت متاكد من حذف هذا العنصر ؟
        </p>
        <div className="flex justify-between gap-3">
          <button
            onClick={() => setVisible(['', false])}
            className="rounded-lg bg-pink-500 hover:opacity-80 text-white text-sm font-semibold px-6 py-2 text-center"
          >
            حذف
          </button>
          <button
            onClick={() => setVisible(['', false])}
            className="rounded-lg bg-gray-500 hover:opacity-80 text-white bg-slate-500 text-sm font-semibold px-6 py-2 text-center"
          >
            الغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpDelete;
