import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/auth/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../modules/pages/home/Home';
import Register from '../modules/auth/register/Register';
import ForgotPassword from '../modules/auth/forgot-password/ForgotPassword';
import ResetPassword from '../modules/auth/reset-password/ResetPassword';

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default Routers;
