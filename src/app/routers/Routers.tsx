import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../modules/pages/home/Home';
import Register from '../modules/auth/Register';
import ForgotPassword from '../modules/auth/ForgotPassword';
import ResetPassword from '../modules/auth/ResetPassword';
import EmailVerification from '../modules/auth/EmailVerification';

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/email-verification/:token"
          element={<EmailVerification />}
        />
      </Routes>
    </>
  );
};

export default Routers;
