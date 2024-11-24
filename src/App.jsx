import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PAGE_URL } from './utils/constants';
import React from "react"
import Navbar from './components/navbar';
import Home from './page/home';
import BeasiswaForm from "./page/beasiswaform"
import StatusPage from "./page/status"

const App = () => {
  return ( 
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path={PAGE_URL.HOME} element={<Home/>} />
          <Route path={PAGE_URL.FORM} element={<BeasiswaForm />} />
          <Route path={PAGE_URL.RESULT} element={<StatusPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App