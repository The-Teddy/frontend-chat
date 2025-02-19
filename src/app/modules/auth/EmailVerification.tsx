import React, { useEffect, useState } from 'react';
import './Auth.scss';
import { useParams } from 'react-router-dom';
import { verify_email } from '../helpers/api/UserEnpoints';
import { toast } from 'react-toastify';
import { resend_token } from '../helpers/api/EmailEndepoints';
import Load from '../components/spinner/Spinner';

const EmailVerification = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  function handleVerifyEmail(): void {
    if (token) {
      setLoading(true);
      verify_email(token)
        .then((res) => {
          setResponseMessage(res?.data?.message);
          console.log(res);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error?.response?.data?.detail?.errors);
          if (error?.response?.data?.detail?.errors) {
            setResponseMessage(error?.response?.data?.detail?.errors);
          }
          if (error?.response?.data?.detail?.resend) {
            handleResendNewToken();
          }
        });
    }
  }

  function handleResendNewToken() {
    if (token) {
      resend_token(token)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
          setResponseMessage(error?.response?.data.detail.errors);
          toast.error(error?.response?.data.detail.errors);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  useEffect(() => {
    handleVerifyEmail();
  }, [token]);

  console.log(responseMessage);
  return (
    <div className="auth">
      <div className="email-verification">
        <h1 className="auth__title">Verificação de e-mail</h1>
        {loading ? (
          <div className="text-center mt-3">
            <p className="fw-bold fs-5">Verificando e-mail...</p>
            <Load />
          </div>
        ) : (
          <div className="text-center mt-3">
            <p className="fw-bold fs-5">{responseMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
