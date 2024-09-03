import React from 'react';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

interface PasswordInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name: string;
  error?: string;
  className?: string;
  hideTitle?: boolean;
  top?: string;
  placeholder?: string;
  title?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  value,
  name,
  error,
  className,
  hideTitle,
  top,
  placeholder,
  title,
}) => {
  const [biShow, setBiShow] = useState(false);

  return (
    <div className="w-full">
      <h1 className={`${hideTitle ? 'hidden' : ''} font-bold text-start mx-1`}>
        {title}
      </h1>
      <div className="relative border border-Secondary  bg-[#F6F8F9]  rounded-2xl">
        <input
          type={!biShow ? 'password' : 'text'}
          onChange={onChange}
          value={value}
          name={name}
          autoComplete="new-password"
          placeholder={placeholder}
          className={`bg-[#F6F8F9] py-4 px-4 pl-12 rounded-2xl focus:outline-none focus:ring-0${className}`}
        />
        {biShow ? (
          <BiShow
            onClick={() => setBiShow(false)}
            size={22}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${top}`}
          />
        ) : (
          <BiHide
            onClick={() => setBiShow(true)}
            size={22}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${top}`}
          />
        )}
      </div>
      {error && <div className="text-red-500 font-semibold">{error}</div>}
    </div>
  );
};

export default PasswordInput;
