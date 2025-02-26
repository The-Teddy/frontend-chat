import { toast } from 'react-toastify';

function handleValidateProfilePhoto(file: File): boolean {
  if (
    file.type !== 'image/png' &&
    file.type !== 'image/jpeg' &&
    file.type !== 'image/jpg' &&
    file.type !== 'image/webp'
  ) {
    toast.warning('Tipo de arquivo não suportado !!');

    return false;
  } else if (file.size > 500000) {
    toast.warning('A imagem não pode exceder 500kb !!');
    return false;
  }

  return true;
}

export { handleValidateProfilePhoto };
