import { useState } from 'react';
import logo from '../../assets/logo1.png';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import '../../styles/output.css';

import {
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardCheck,
  FaCalendarAlt,
  FaFileAlt,
  FaBriefcase,
  FaAward,
  FaFlag,
  FaBullhorn,
  FaBell,
  FaMoneyBillWave,
  FaInfoCircle,
  FaStickyNote,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaDollarSign,
  FaCog,
} from 'react-icons/fa';
import React from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-30 p-2 text-white bg-pink-900 rounded-md"
      >
        {isOpen ? <IoClose size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-20 w-64 bg-blue-950 p-2 flex flex-col items-center transition-transform duration-300 ease-in-out rounded-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-1/6 overflow-auto rounded m-2 custom-gradient h-screen `}
      >
        <img src={logo} className="w-32 rounded-full m-10" alt="Logo" />

        <nav
          className="flex flex-col w-full mt-5 items-center gap-4 text-white font-bold text-sm"
          style={{ direction: 'rtl' }}
        >
          <NavLink
            to="dashboard"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaTachometerAlt />
            لوحة التحكم
          </NavLink>
          <NavLink
            to="/Home/Students"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaUsers />
            الطلاب
          </NavLink>
          <NavLink
            to="/Home/teachers"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaChalkboardTeacher />
            الاساتذة
          </NavLink>
          <NavLink
            to="/Home/Classes"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaBuilding />
            الصفوف
          </NavLink>
          <NavLink
            to="/home/courses"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaBook />
            المواد
          </NavLink>
          <NavLink
            to="/Home/attendance"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaClipboardCheck />
            الحضور
          </NavLink>
          <NavLink
            to="/Home/schedule"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaCalendarAlt />
            برنامج الدوام
          </NavLink>
          <NavLink
            to="/home/tests"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaFileAlt />
            الاختبارات
          </NavLink>
          <NavLink
            to="/home/homeworks"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaBriefcase />
            الوظائف
          </NavLink>
          <NavLink
            to="/home/outstanding"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaAward />
            المتفوقين
          </NavLink>
          <NavLink
            to="/home/events"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaFlag />
            الفعاليات
          </NavLink>
          <NavLink
            to="/home/adds"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaBullhorn />
            الاعلانات
          </NavLink>
          <NavLink
            to="/home/notifications"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaBell />
            الاشعارات
          </NavLink>
          <NavLink
            to="/home/installment"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaMoneyBillWave />
            الاقساط
          </NavLink>
          <NavLink
            to="/home/generalInformation"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaInfoCircle />
            معلومات عامة
          </NavLink>
          <NavLink
            to="/home/notes"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaStickyNote />
            ملاحظات الأساتذة
          </NavLink>
          <NavLink
            to="/home/contact"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaPhone />
            تواصل معنا
          </NavLink>
          <NavLink
            to="/home/messages"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaEnvelope />
            رسائل شكوى و اقتراح
          </NavLink>
          <NavLink
            to="/home/employees"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaBuilding />
            الموظفين
          </NavLink>
          <NavLink
            to="/home/salary"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaDollarSign />
            الرواتب
          </NavLink>
          <NavLink
            to="/home/settings"
            className="sidebar-item flex items-center gap-2 py-2 px-4 rounded transition-colors duration-200 w-5/6 hover:bg-slate-300 hover:bg-opacity-30"
            onClick={toggleSidebar}
          >
            <FaCog />
            الاعدادات
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
