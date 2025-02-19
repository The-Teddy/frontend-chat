import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();
  const [regressiveCount, setRegressiveCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegressiveCount((prevCount) => prevCount - 1);
    }, 1000);
    const timeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="not-found">
      <h2>Página não encontrada</h2>
      <p>Você será redirecionado para a home em {regressiveCount} segundos</p>
    </div>
  );
};

export default NotFound;
