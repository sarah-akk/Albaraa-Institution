/* eslint-disable @typescript-eslint/no-unused-vars */
// LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/index';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { usePOST } from '../API';
import PasswordInput from '../components/Inputs/Passwordinput';

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const notify = (message: string) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };
  const { mutation, handleChangeInput, handleSubmit, setFormData, formData } =
    usePOST(
      {
        _method: 'PUT',
        old_password: '',
        password: '',
        password_confirmation: '',
      },
      () => navigate('/'),
      () => notify('الرجاء ادخال المعلومات بشكل صحيح ')
    );

  return (
    <div
      className="flex-col items-center justify-center mt-2 "
      style={{ direction: 'rtl' }}
    >
      <ToastContainer />
      {mutation.isLoading ? <Loader /> : ''}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[55%] max-md:w-[97%]  mx-auto">
        <div className="mb-4">
          <PasswordInput
            name="old_password"
            onChange={handleChangeInput}
            title="كلمة المرور القديمة"
            placeholder="أدخل كلمة المرور القديمة"
          />
        </div>
        <div className="mb-4">
          <PasswordInput
            name="password"
            onChange={handleChangeInput}
            title="كلمة المرور "
            placeholder="أدخل كلمة المرور "
          />
        </div>
        <div className="mb-4">
          <PasswordInput
            name="password_confirmation"
            onChange={handleChangeInput}
            title="تأكيد كلمة المرور"
            placeholder="تأكيد كلمة المرور"
          />
        </div>
        <div>
          <button
            className="w-[30%]  bg-primary rounded-xl text-white font-bold p-2 "
            onClick={() => handleSubmit('admin/change-password')}
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
