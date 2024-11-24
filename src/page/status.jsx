import React from "react";
import { useDataContext } from "../utils/DataContext";
import { Link, useNavigate } from "react-router-dom";

const StatusPage = () => {
  const { formData, deleteFormData } = useDataContext();
  const navigate = useNavigate();

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 flex flex-col items-center justify-center space-y-4">
        <p className="text-4xl font-bold text-gray-800 mb-4">
          Data Not Found!
        </p>
        <Link to="/form">
          <button className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 transition">
            Kembali ke Formulir
          </button>
        </Link>
      </div>
    );
  }  

  const handleDelete = () => {
    deleteFormData();
    navigate("/form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl max-w-4xl w-full p-6 flex flex-col justify-between relative">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-10">
          Status Pengajuan Beasiswa
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium w-32">Nama</span>
              <p className="text-gray-800">: {formData.nama}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Email</span>
              <p className="text-gray-800">: {formData.email}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Nomor HP</span>
              <p className="text-gray-800">: {formData.noHp}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Semester</span>
              <p className="text-gray-800">: {formData.semester}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium w-32">Jenis Beasiswa</span>
              <p className="text-gray-800">: {formData.jenisBeasiswa}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">IPK</span>
              <p className="text-gray-800">: {formData.ipk}</p>
            </div>
            <div>
              <span className="font-medium">Berkas :</span>
              {formData.berkas?.preview ? (
                <div className="mt-2">
                  {formData.berkas.name.endsWith(".pdf") ? (
                    <a
                      href={formData.berkas.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 underline"
                    >
                      Lihat {formData.berkas.name}
                    </a>
                  ) : (
                    <img
                      src={formData.berkas.preview}
                      alt={formData.berkas.name}
                      className="w-48 h-auto rounded-md shadow-sm mt-2"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-800">Tidak ada berkas</p>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
            >
              Hapus Data
            </button>
            <Link to="/form">
              <button className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 transition">
                Kembali ke Formulir
              </button>
            </Link>
          </div>
          <div className="text-right">
            <span className="font-medium text-xl">Status :</span>
            <p className="text-gray-800 text-xl">{formData.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;