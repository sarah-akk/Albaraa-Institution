import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaRocket,
  FaStar,
  FaShieldAlt,
} from 'react-icons/fa';

type Feature = {
  icon: JSX.Element;
  text: string;
};

type GeneralInfo = {
  sliderImages: string[];
  whyUs: {
    text: string;
    image: string;
  };
  goals: string[];
  features: Feature[];
};

const initialData: GeneralInfo = {
  sliderImages: [
    'https://via.placeholder.com/1200x500?text=Image+1',
    'https://via.placeholder.com/1200x500?text=Image+2',
    'https://via.placeholder.com/1200x500?text=Image+3',
  ],
  whyUs: {
    text: 'We are committed to providing the best service with high quality and customer satisfaction.',
    image: 'https://via.placeholder.com/600x400?text=Why+Us+Image',
  },
  goals: [
    'Deliver top-notch products and services',
    'Ensure customer satisfaction',
    'Innovate and improve continuously',
  ],
  features: [
    { icon: <FaRocket />, text: 'Fast and Reliable' },
    { icon: <FaStar />, text: 'Excellent Quality' },
    { icon: <FaShieldAlt />, text: 'Secure and Safe' },
  ],
};

const GeneralInformationDashboard: React.FC = () => {
  const [data, setData] = useState<GeneralInfo>(initialData);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [whyUsImagePreview, setWhyUsImagePreview] = useState<string | null>(
    null
  );

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.sliderImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + data.sliderImages.length) % data.sliderImages.length
    );
  };

  const handleSliderImageChange = (index: number, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...data.sliderImages];
        updatedImages[index] = reader.result as string;
        setData({ ...data, sliderImages: updatedImages });
        const updatedPreviews = [...imagePreviews];
        updatedPreviews[index] = reader.result as string;
        setImagePreviews(updatedPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWhyUsImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWhyUsImagePreview(reader.result as string);
        setData({
          ...data,
          whyUs: { ...data.whyUs, image: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoalChange = (index: number, text: string) => {
    const updatedGoals = [...data.goals];
    updatedGoals[index] = text;
    setData({ ...data, goals: updatedGoals });
  };

  const handleFeatureChange = (index: number, text: string) => {
    const updatedFeatures = [...data.features];
    updatedFeatures[index] = { ...updatedFeatures[index], text };
    setData({ ...data, features: updatedFeatures });
  };

  return (
    <div className="p-6  min-h-screen" style={{ direction: 'rtl' }}>
      <h1 className="text-xl font-bold mb-6">قسم معلومات عامة</h1>

      {/* Image Slider */}
      <div className="relative mb-12">
        <img
          src={data.sliderImages[currentSlide]}
          alt="Slider"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <button
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full shadow-lg"
        >
          <FaArrowLeft size={24} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full shadow-lg"
        >
          <FaArrowRight size={24} />
        </button>
      </div>

      {/* Slider Image Inputs */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">تعديل الصور</h2>
        {data.sliderImages.map((image, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2">
              صورة {index + 1}:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleSliderImageChange(
                  index,
                  e.target.files ? e.target.files[0] : null
                )
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
      </section>

      {/* Why Us Section */}
      <section className="mb-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={whyUsImagePreview || data.whyUs.image}
            alt="Why Us"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <label className="block text-gray-700 mt-4">تغيير الصورة:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleWhyUsImageChange(e.target.files ? e.target.files[0] : null)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="md:w-1/2 md:pr-6">
          <h2 className="text-xl font-semibold mb-4">لماذا نحن</h2>
          <p className="text-gray-700">{data.whyUs.text}</p>
          <label className="block text-gray-700 mt-4">تغيير النص:</label>
          <textarea
            value={data.whyUs.text}
            onChange={(e) =>
              setData({
                ...data,
                whyUs: { ...data.whyUs, text: e.target.value },
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
      </section>

      {/* Our Goals Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">اهدافنا</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {data.goals.map((goal, index) => (
            <li key={index}>
              <input
                type="text"
                value={goal}
                onChange={(e) => handleGoalChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Our Features Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">ميزاتنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div className="text-3xl text-blue-500 mr-4">{feature.icon}</div>
              <div className="w-full">
                <p className="text-gray-700 mb-2">{feature.text}</p>
                <input
                  type="text"
                  value={feature.text}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GeneralInformationDashboard;
