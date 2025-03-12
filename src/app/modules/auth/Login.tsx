import React, { useContext, useState } from 'react';
import './Auth.scss';
import { NavLink } from 'react-router-dom';
import SubmitButton from '../components/buttons/submit/SubmitButton';
import { Context } from './AuthContext';
import {
  handleValidateEmail,
  handleValidatePassword,
} from '../helpers/validators/UserValidators';
import { LoginInterface } from '../global/interfaces/UserModel';
import { handleSanitizeInput } from '../helpers/utils/Utils';

const Login = () => {
  const { handleLogin, loading } = useContext(Context);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleValidateLogin(event: React.FormEvent) {
    event.preventDefault();
    if (!handleValidateEmail(email)) return;
    if (!handleValidatePassword(password)) return;
    const data: LoginInterface = {
      email,
      password,
    };
    handleLogin(data);
  }

  return (
    <div className="auth">
      <div className="login">
        <h1 className="auth__title">Entrar</h1>
        <h2 className="auth__subtitle">
          Ainda não tem uma conta? <br />
          <NavLink to={'/register'}>Registre-se</NavLink>
        </h2>
        <form
          onSubmit={(event) => {
            handleValidateLogin(event);
          }}
        >
          <label htmlFor="" className="w-100 mt-3">
            E-mail:
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Exemplo: marcio@gmail.com"
              onChange={(e) => setEmail(handleSanitizeInput(e.target.value))}
              value={email}
            />
          </label>
          <label htmlFor="" className="w-100 mt-3">
            Senha:
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(handleSanitizeInput(e.target.value))}
              value={password}
            />
          </label>

          <SubmitButton title="Entrar" disable={loading} loading={loading} />
        </form>
        <p className="text-center mt-3">
          <NavLink to={'/forgot-password'}>Esqueci Senha</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
