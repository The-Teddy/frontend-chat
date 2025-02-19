import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../modules/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../modules/pages/home/Home';
import Register from '../modules/auth/Register';
import ForgotPassword from '../modules/auth/ForgotPassword';
import ResetPassword from '../modules/auth/ResetPassword';
import EmailVerification from '../modules/auth/EmailVerification';
import PrivateRouter from './PrivateRouter';
import RedirectRouter from './RedirectRouter';
import NotFound from '../modules/components/not-found/NotFound';

const Routers = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectRouter>
              <Login />
            </RedirectRouter>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectRouter>
              <Register />
            </RedirectRouter>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectRouter>
              <ForgotPassword />
            </RedirectRouter>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectRouter>
              <ResetPassword />
            </RedirectRouter>
          }
        />
        <Route
          path="/email-verification/:token"
          element={
            <RedirectRouter>
              <EmailVerification />
            </RedirectRouter>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routers;
