import React, { useState } from 'react';
import './Auth.scss';
import SubmitButton from '../components/buttons/submit/SubmitButton';
import { NavLink } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <div className="auth">
      <div className="reset-password">
        <h1 className="auth__title">Redefina sua Senha</h1>
        <h2 className="auth__subtitle">
          Insira seu e-mail e escolha uma nova senha para acessar sua conta.
        </h2>

        <label className="w-100">
          E-mail:
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Exemplo: marciosantos@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="w-100 mt-2">
          Senha:
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Digite sua Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label className="w-100 mt-2">
          Confirmar Senha:
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Repita sua Senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>

        <SubmitButton title="Resetar Senha" submit={() => {}} />

        <p className="text-center mt-3">
          Lembrou sua senha? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
