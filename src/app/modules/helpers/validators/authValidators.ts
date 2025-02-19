import { toast } from 'react-toastify';
import { RegisterInterface } from '../../global/interfaces/UserModel';

function handleValidatePassword(password: string): boolean {
  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*()=;?]){8,30}/;

  const match: boolean = passwordRegex.test(password);

  if (!match) {
    toast.warning(
      'A senha deve ter entre 8 e 30 caracteres e incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    );

    return match;
  }
  return match;
}
function handleValidateEmail(email: string): boolean {
  const emailRegex: RegExp =
    /^[a-zA-Z0-9._-]{1,70}@[a-zA-Z0-9.-]{1,50}\.[a-zA-Z]{2,30}$/;

  const match: boolean = emailRegex.test(email);

  if (!match) {
    toast.warning(
      'O e-mail inserido é inválido. Certifique-se de que ele está no formato correto (exemplo: usuario@dominio.com) e não contém espaços ou caracteres especiais não permitidos.',
    );
    return match;
  }

  return match;
}
function handleValidateName(name: string): boolean {
  const nameRegex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,100}$/;

  const match: boolean = nameRegex.test(name.trim());
  if (!match) {
    toast.warning(
      'O nome deve ter entre 3 e 100 caracteres e conter apenas letras (incluindo acentuadas) e espaços',
    );
    return match;
  }

  return match;
}
function handleValidateUsername(username: string): boolean {
  const usernameRegex: RegExp = /^[A-Za-z0-9._]{3,50}$/;

  const match: boolean = usernameRegex.test(username.trim());
  if (!match) {
    toast.warning(
      'O nome de usuário deve ter entre 3 e 50 caracteres, sem espaços, contendo apenas letras de A a Z e números.',
    );
    return match;
  }

  return match;
}

function handleValidateRegister(data: RegisterInterface): boolean {
  if (!handleValidateName(data.name)) {
    return false;
  }
  if (!handleValidateUsername(data.username)) {
    return false;
  }
  if (!handleValidateEmail(data.email)) {
    return false;
  }
  if (!handleValidatePassword(data.password)) {
    return false;
  }

  return true;
}

export {
  handleValidatePassword,
  handleValidateEmail,
  handleValidateName,
  handleValidateUsername,
  handleValidateRegister,
};
