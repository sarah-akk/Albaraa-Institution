import React from "react";

interface InputProps {
  type?: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  title?: string;
  hideTitle?: boolean;
  className?: string;
  error?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  title,
  hideTitle = false,
  className,
  error,
  id,
}) => {
  return (
    <div className="!py-3">
      <h1 className={`${hideTitle ? "hidden" : ""} font-bold text-start mx-1`}>
        {title}
      </h1>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-Secondary bg-[#F6F8F9] lg:!mt-3 mt-2 m-1  py-4 px-4 pl-12  rounded-2xl focus:outline-none focus:ring-0 ${className}`}
        id={id}
      />
      {error && <div className="text-red-500 font-semibold">{error}</div>}
    </div>
  );
};

export default Input;
