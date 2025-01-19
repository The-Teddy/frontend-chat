import React, { useState } from 'react';
import '../Auth.scss';
import SubmitButton from '../../components/buttons/submit/SubmitButton';
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');

  return (
    <div className="auth">
      <div className="forgot-password">
        <h1 className="auth__title">Esqueceu a Senha?</h1>
        <h2 className="auth__subtitle">
          Digite seu e-mail e enviaremos as instruções
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

        <SubmitButton title="Enviar Instruções" submit={() => {}} />
        <p className="text-center mt-3">
          Lembrou sua senha? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
