import React, { useContext, useState } from 'react';
import './Auth.scss';
import { NavLink } from 'react-router-dom';
import SubmitButton from '../components/buttons/submit/SubmitButton';
import { Context } from './AuthContext';

const Register = () => {
  const {handleRegister} = useContext(Context)
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <div className="auth">
      <div className="register">
        <h1 className="auth__title">Criar Conta</h1>
        <h2 className="auth__subtitle">
          Já tem uma conta? <NavLink to={'/login'}>Faça login</NavLink>
        </h2>
       <form onSubmit={(e)=>{e.preventDefault(); handleRegister(email, name, password, confirmPassword)}}>
       <label className="w-100">
          <span className="required">Nome:</span>
          <input
            type="text"
            placeholder="Exemplo: Marcio Santos"
            className="form-control mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="w-100 mt-2">
          <span className="required">E-mail:</span>
          <input
            type="text"
            placeholder="Exemplo: marciosantos@gmail.com"
            className="form-control mt-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="w-100 mt-2">
          <span className="required">Senha:</span>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="form-control mt-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label className="w-100 mt-2">
          <span className="required">Confirmar Senha:</span>
          <input
            type="password"
            placeholder="Repita a senha"
            className="form-control mt-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        <SubmitButton title="Registrar" />
       </form>
      </div>
    </div>
  );
};

export default Register;
