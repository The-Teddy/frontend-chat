import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../modules/auth/AuthContext';
import Load from '../modules/components/spinner/Spinner';
import { Navigate } from 'react-router-dom';
import '../App.scss';

interface Props {
  children: React.ReactNode;
}

const PrivateRouter = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(Context);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="center-child">
        <span className="fw-bold fs-6">Carregando...</span>
        <Load />
      </div>
    );
  }
  return token && user ? <>{children} </> : <Navigate to={'/login'} />;
};

export default PrivateRouter;
