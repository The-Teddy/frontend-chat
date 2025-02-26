import React, { useEffect, useState } from 'react';
import './Auth.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import SubmitButton from '../components/buttons/submit/SubmitButton';
import { toast } from 'react-toastify';
import {
  handleValidateRegister,
  handleValidateUsername,
} from '../helpers/validators/AuthValidators';
import { RegisterInterface } from '../global/interfaces/UserModel';
import { createUser, usernameValidate } from '../helpers/api/UserEnpoints';
import { handleError } from '../helpers/utils/Requests';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUsername, setLoadingUsername] = useState<boolean>(false);
  const [responseUsernameValidate, setResponseUsernameValidate] =
    useState<string>();
  const [hasUsername, setHasUsername] = useState<
    'pending' | 'disponible' | 'indisponible'
  >('pending');

  const navigate = useNavigate();

  function handleRegister(event: React.FormEvent): void {
    event.preventDefault();

    if (hasUsername === 'indisponible') {
      toast.warning('Nome de usuário não disponível');
      return;
    }
    const data: RegisterInterface = {
      email: email,
      name,
      username,
      password,
    };

    if (!handleValidateRegister(data)) return;

    if (password !== confirmPassword) {
      toast.warning('Senha e Confirmar Senha precisam ser iguais');
      return;
    }
    setLoading(true);
    createUser(data)
      .then(() => {
        toast.success('Usuário criado com sucesso');
        navigate('/login');
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCheckUsername() {
    if (!handleValidateUsername(username)) return;

    setLoadingUsername(true);
    usernameValidate(username)
      .then((response) => {
        if (response?.data?.indisponible_username) {
          setResponseUsernameValidate(response?.data?.indisponible_username);
          setHasUsername('indisponible');
        }
        if (response?.data?.disponible_username) {
          setResponseUsernameValidate(response.data.disponible_username);
          setHasUsername('disponible');
        }
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoadingUsername(false);
      });
  }

  useEffect(() => {
    const timeOutValidateUsername = setTimeout(() => {
      if (username.length >= 3) {
        handleCheckUsername();
      }
    }, 500);
    return () => clearTimeout(timeOutValidateUsername);
  }, [username]);

  return (
    <div className="auth">
      <div className="register">
        <h1 className="auth__title">Criar Conta</h1>
        <h2 className="auth__subtitle">
          Já tem uma conta? <NavLink to={'/login'}>Faça login</NavLink>
        </h2>
        <form
          onSubmit={(event) => {
            handleRegister(event);
          }}
        >
          <label className="w-100">
            <span className="required">Nome:</span>
            <input
              type="text"
              placeholder="Exemplo: Marcio Santos"
              className="form-control mt-1"
              value={name}
              disabled={loadingUsername}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="w-100 mt-1">
            <span className="required">Nome de usuário:</span>
            <input
              type="text"
              placeholder="Exemplo: marciosantos123"
              className="form-control mt-1"
              value={username}
              disabled={loadingUsername}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <span
              style={{
                display:
                  hasUsername === 'disponible' || 'indisponible '
                    ? 'block'
                    : 'none',
                margin: '5px 0',
              }}
            >
              {loadingUsername ? (
                <span className="indicator-progress d-flex w-100 ml-2">
                  checando...
                  <span className="spinner-border spinner-border-sm text-gray mx-auto "></span>
                </span>
              ) : (
                <small
                  style={{
                    color: hasUsername === 'disponible' ? 'green' : 'red',
                  }}
                >
                  {responseUsernameValidate}
                </small>
              )}
            </span>
          </label>

          <label className="w-100 mt-2">
            <span className="required">E-mail:</span>
            <input
              type="text"
              placeholder="Exemplo: marciosantos@gmail.com"
              className="form-control mt-1"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loadingUsername}
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
              disabled={loadingUsername}
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
              disabled={loadingUsername}
            />
          </label>
          <SubmitButton
            title="Registrar"
            disable={loading || hasUsername === 'indisponible'}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
