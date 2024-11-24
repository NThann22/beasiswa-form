import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "../utils/DataContext";

const BeasiswaForm = () => {
  const generateRandomIPK = () => {
    return parseFloat((Math.random() * 4).toFixed(2));
  };

  const { setFormData } = useDataContext();
  const navigate = useNavigate();

  const [formData, setFormDataLocal] = useState({
    nama: "",
    email: "",
    noHp: "",
    semester: "",
    jenisBeasiswa: "",
    ipk: "",
    berkas: null,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setFormDataLocal((prev) => ({
      ...prev,
      ipk: generateRandomIPK(),
    }));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Buat URL lokal
      setFormDataLocal({ ...formData, berkas: { file, preview: fileURL } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.ipk < 3) {
      setError("IPK Anda tidak memenuhi syarat beasiswa.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid");
      return;
    }
  
    if (!/^\d+$/.test(formData.noHp)) {
      setError("Nomor HP hanya boleh berupa angka");
      return;
    }
  
    if (!formData.semester || !(+formData.semester >= 1 && +formData.semester <= 8)) {
      setError("Semester harus antara 1 dan 8");
      return;
    }
  
    setFormData({
      ...formData,
      status: "Diproses",
      berkas: {
        name: formData.berkas.file.name,
        preview: formData.berkas.preview,
      },
    });
  
    navigate("/hasil-pengajuan");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-sky-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-xl font-semibold text-center mb-6">Form Pendaftaran Beasiswa</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={(e) => setFormDataLocal({ ...formData, nama: e.target.value })}
              required
              className="w-full border-b border-gray-300 outline-none focus:outline-none focus-visible:ring-0 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormDataLocal({ ...formData, email: e.target.value })}
              required
              className="w-full border-b border-gray-300 outline-none focus:outline-none focus-visible:ring-0 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nomor HP</label>
            <input
              type="text"
              name="noHp"
              value={formData.noHp}
              onChange={(e) => setFormDataLocal({ ...formData, noHp: e.target.value })}
              required
              className="w-full border-b border-gray-300 outline-none focus:outline-none focus-visible:ring-0 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={(e) => setFormDataLocal({ ...formData, semester: e.target.value })}
                required
                className="w-full border-b border-gray-300 outline-none focus:outline-none focus-visible:ring-0 focus:border-indigo-500"
              >
                <option value="">Pilih Semester</option>
                {[...Array(8).keys()].map((sem) => (
                  <option key={sem + 1} value={sem + 1}>
                    {sem + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">IPK:</label>
              <input
                type="text"
                value={formData.ipk}
                disabled
                className="w-full border-b border-gray-300 bg-gray-100 focus:ring-0 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jenis Beasiswa</label>
            <select
              name="jenisBeasiswa"
              value={formData.jenisBeasiswa}
              onChange={(e) => setFormDataLocal({ ...formData, jenisBeasiswa: e.target.value })}
              disabled={formData.ipk < 3}
              required
              className={`w-full border-b border-gray-300 outline-none focus:ring-0 focus:border-indigo-500 ${
                formData.ipk < 3 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Pilih Beasiswa</option>
              <option value="Akademik">Akademik</option>
              <option value="Non-Akademik">Non-Akademik</option>
            </select>
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Upload Berkas Persyaratan</label>
            <input
              type="file"
              accept=".pdf,.jpg,.zip"
              onChange={handleFileChange}
              disabled={formData.ipk < 3}
              required
              className={`w-full border-b border-gray-300 outline-none ${
                formData.ipk < 3 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              className={`flex-1 bg-indigo-500 text-white font-semibold py-2 rounded hover:bg-indigo-600 ${
                formData.ipk < 3 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={formData.ipk < 3}
            >
              Daftar
            </button>
            <div className="flex-1">
              <Link to="/">
                <button className="w-full bg-slate-200 text-black font-semibold py-2 rounded hover:bg-slate-300">
                  Batal
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeasiswaForm;