import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../img/student.jpg';

const Home = () => {
  return (
    <div className="h-screen relative flex flex-col justify-center items-center bg-black">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center backdrop-blur-3xl"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.3,
        }}
      ></div>
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-white font-bold mb-12">
          SELAMAT DATANG DI PENDAFTARAN BEASISWA
        </h1>
        <Link to="/form">
          <button className="bg-indigo-500 text-white text-xl py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            DAFTAR BEASISWA
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;