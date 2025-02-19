import React, { useContext, memo } from 'react';
import { Context } from '../modules/auth/AuthContext';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}
const RedirectRouter = ({ children }: Props) => {
  const { user, token } = useContext(Context);
  return user && token ? <Navigate to={'/'} replace /> : <>{children}</>;
};

export default memo(RedirectRouter);
