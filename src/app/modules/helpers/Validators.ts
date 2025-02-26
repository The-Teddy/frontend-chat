import { toast } from 'react-toastify';
import { ConversationInterface } from '../global/interfaces/ConversationInterface';

const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

function handleValidateCover(imageCover: any) {
  if (!imageCover) {
    return toast.warning('Escolha uma imagem para sua capa');
  }
  if (!supportedFormats.includes(imageCover.type)) {
    return toast.warning('Tipo de arquivo não suportado!');
  }
  if (imageCover.size > 5000000) {
    return toast.warning('A imagem não pode exceder 5mb');
  }
}
function handleValidatePhoto(imageLogo: any) {
  if (!imageLogo) {
    return toast.warning('Escolha uma imagem para sua logo');
  }

  if (!supportedFormats.includes(imageLogo.type)) {
    return toast.warning('Tipo de arquivo não suportado');
  }
  if (imageLogo.size > 2000000) {
    return toast.warning('A imagem não pode exceder 2mb');
  }
}

function handleValidatePhoneNumber(phoneNumber: string) {
  const phoneNumberRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

  return phoneNumberRegex.test(phoneNumber);
}

function handleIsConversationValid(
  conversation: ConversationInterface,
): boolean {
  return (
    !!conversation &&
    !!conversation.name &&
    !!conversation.date &&
    conversation.messages.length > 0
  );
}

export {
  handleValidateCover,
  handleValidatePhoto,
  handleValidatePhoneNumber,
  handleIsConversationValid,
};
