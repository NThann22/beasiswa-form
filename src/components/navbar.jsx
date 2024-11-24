import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-500 text-white shadow-xl">
      <div className="font-bold text-lg">PENDAFTARAN BEASISWA</div>
      <div className="space-x-4">
        <Link to="/" className="hover:bg-indigo-700 px-3 py-2 rounded font-semibold">
          Home
        </Link>
        <Link to="/form" className="hover:bg-indigo-700 px-3 py-2 rounded font-semibold">
          Daftar Beasiswa
        </Link>
        <Link to="hasil-pengajuan" className="hover:bg-indigo-700 px-3 py-2 rounded font-semibold">
          Status Pengajuan
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;