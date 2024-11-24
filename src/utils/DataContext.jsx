import React, { createContext, useState, useContext, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      localStorage.removeItem("formData");
    }
  }, [formData]);

  const deleteFormData = () => {
    setFormData(null);
    localStorage.removeItem("formData");
  };

  return (
    <DataContext.Provider value={{ formData, setFormData, deleteFormData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
