import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Auth.scss';
import { NavLink } from 'react-router-dom';
import SubmitButton from '../components/buttons/submit/SubmitButton';
import { Context } from './AuthContext';

const Login = () => {
  const { handleLogin } = useContext(Context);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <div className="auth">
      <div className="login">
        <h1 className="auth__title">Entrar</h1>
        <h2 className="auth__subtitle">
          Ainda não tem uma conta? <br />
          <NavLink to={'/register'}>Registre-se</NavLink>
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email, password);
          }}
        >
          <label htmlFor="" className="w-100 mt-3">
            E-mail:
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Exemplo: marcio@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label htmlFor="" className="w-100 mt-3">
            Senha:
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <SubmitButton title="Entrar" />
        </form>
        <p className="text-center mt-3">
          <NavLink to={'/forgot-password'}>Esqueci Senha</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
