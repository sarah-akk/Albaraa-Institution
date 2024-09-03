/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from '../assets/logo1.png';
import React from 'react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-center bg-cover relative">
      <img src={logo1} className="absolute" alt="Logo" />
    </div>
  );
};

export default Splash;
