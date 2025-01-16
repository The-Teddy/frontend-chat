import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/auth/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../modules/pages/home/Home';

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default Routers;
