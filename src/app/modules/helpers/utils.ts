import moment from 'moment';
import { toast } from 'react-toastify';

function handleConverterId(binaryId: Buffer | undefined): string {
  const hex = binaryId?.toString('hex');
  const uuid = `${hex?.slice(0, 8)}-${hex?.slice(8, 4)}-${hex?.slice(
    12,
    4,
  )}-${hex?.slice(16, 4)}-${hex?.slice(20)}`;
  return uuid;
}

function handleValidateEmailCode(code: string | null) {
  const codeRegex = /^[0-9]{6}$/;

  if (!code) {
    return { isValid: false, message: 'O código não pode estar vazio.' };
  }

  if (!codeRegex.test(code)) {
    return {
      isValid: false,
      message: 'O código deve ter exatamente 6 dígitos numéricos.',
    };
  }

  return { isValid: true, message: 'Código válido.' };
}
function handleIsNumber(input: string): string {
  return input.replace(/\D/g, '');
}
function handleGetEnvVariable() {
  return process.env.REACT_APP_API_URL + '/';
}
function handleGetHeaders(contentType: string, token?: string | null) {
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': contentType,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}
function handleGetStaticsHeaders(token?: string | null) {
  const headers: any = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

function handleMask(value: string): string {
  // Remove todos os caracteres não numéricos
  value = value.replace(/\D/g, '');

  // Limita o valor a 14 caracteres (tamanho máximo de um CNPJ)
  if (value.length > 14) {
    value = value.substring(0, 14);
  }

  // Aplica a máscara para CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (value.length <= 11) {
    // CPF: 000.000.000-00
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // CNPJ: 00.000.000/0000-00
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  return value;
}

function handleMaskCnpj(v: any) {
  v = v.replace(/\D/g, '');

  v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  v = v.replace(/(\d{4})(\d)/, '$1-$2');

  return v;
}

function handleConvertDateAndTime(date: Date) {
  const convertedDate = moment(date).format('DD/MM/YYYY, h:mm a');
  return convertedDate;
}
function handleConvertDate(date: Date) {
  const convertedDate = moment(date).format('DD/MM/YYYY');
  return convertedDate;
}
function handleReconvertDate(date: string) {
  const convertedDate = `${date.slice(-4)}-${date.slice(3, 5)}-${date.slice(
    0,
    2,
  )}`;
  return convertedDate;
}
function convertDateToISO(date: string): string | null {
  const dateParts = date.split('/');

  // Verifica se temos três partes (dia, mês, ano)
  if (dateParts.length !== 3) return null;

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  // Verifica se os valores de dia, mês e ano são válidos
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year.toString().length !== 4
  ) {
    return null;
  }

  // Retorna no formato ISO 8601
  return `${year.toString().padStart(4, '0')}-${month
    .toString()
    .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function handleValidateDate(date: any) {
  const dateFormatInput = moment(date).format('YYYY-MM-DD');
  const dateFormatToday = moment().format('YYYY-MM-DD');
  const dateInput = dateFormatInput.replace(/[^a-zA-Z0-9]/g, '');
  const dateToday = dateFormatToday.replace(/[^a-zA-Z0-9]/g, '');

  if (dateInput.length === 8) {
    if (dateInput.slice(4, 6) <= dateToday.slice(4, 6)) {
      if (
        dateInput.slice(6, 8) <= '00' ||
        dateInput.slice(6, 8) > '31' ||
        dateInput.slice(6, 8) < dateToday.slice(6, 8)
      ) {
        return 'Invalid date';
      }
    }
    if (
      dateInput.slice(4, 6) <= '00' ||
      dateInput.slice(4, 6) > '12' ||
      dateInput.slice(4, 6) < dateToday.slice(4, 6)
    ) {
      return 'Invalid date';
    }
    if (dateInput.slice(0, 4) < dateToday.slice(0, 4)) {
      return 'Invalid date';
    }
  } else {
    return 'Invalid date';
  }
  return false;
}

function handleDownload(data: any, name: any, extension: any) {
  let filename = `${name.replaceAll(' ', '_')}.${extension}`;
  filename = decodeURI(filename);
  const url = window.URL.createObjectURL(new Blob([data.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}

function handleReponse(type: string, data: any) {
  if (type === 'error') {
    if (data.response.status === 422) {
      if (data.response.data.errors) {
        let errorValue =
          data.response.data.errors[
            Object.keys(data.response.data.errors)[0]
          ][0];
        toast.error(errorValue);
      }
    } else {
      toast.error(data.response.data.message);
    }
  }
}

function handleIsValidDate(dateString: string): boolean {
  // Verifica o formato da data DD/MM/YYYY
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(regex);

  if (!match) return false;

  const day = parseInt(match[1]);
  const month = parseInt(match[2]);
  const year = parseInt(match[3]);

  // Verifica se o mês está entre 1 e 12
  if (month < 1 || month > 12) return false;

  // Dias máximos por mês (considerando fevereiro com 28 dias)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Verifica se é um ano bissexto e ajusta o mês de fevereiro
  if (month === 2 && handleIsLeapYear(year)) {
    daysInMonth[1] = 29;
  }

  // Verifica se o dia está dentro do limite do mês
  return day > 0 && day <= daysInMonth[month - 1];
}

// Função para verificar se é um ano bissexto
function handleIsLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function handleError(error: any): void {
  if (!error.response) {
    toast.error('Erro de conexão. Verifique sua internet.');
    return;
  }

  const { status, data } = error.response;

  // Se a resposta do FastAPI tiver um array de detalhes (erros de validação)
  if (data?.detail.errors && Array.isArray(data.detail.errors)) {
    data.detail.errors.forEach((item: any) => {
      if (item.msg) {
        toast.error(item.msg);
      } else if (typeof item === 'string') {
        toast.error(item);
      }
    });
    return;
  }

  // Se a mensagem de erro for uma string simples
  if (typeof data?.detail.errors === 'string') {
    toast.error(data.detail.errors);
    return;
  }

  // Tratamento baseado no status HTTP
  switch (status) {
    case 400:
      toast.error('Requisição inválida. Verifique os dados enviados.');
      break;
    case 401:
      toast.error('Não autorizado. Faça login novamente.');
      break;
    case 403:
      toast.error('Acesso proibido.');
      break;
    case 404:
      toast.error('Recurso não encontrado.');
      break;
    case 422:
      toast.error('Erro de validação. Verifique os campos preenchidos.');
      break;
    case 500:
      toast.error('Erro interno do servidor. Tente novamente mais tarde.');
      break;
    default:
      toast.error('Ocorreu um erro inesperado.');
  }
}

function handlePhoneMask(value: string): string {
  // Remove tudo que não for número
  const cleanedValue = value.replace(/\D/g, '');

  // Limita o valor a 11 caracteres para móveis e 10 para fixos
  const limitedValue = cleanedValue.substring(0, 11); // Para números móveis (máximo 11 dígitos)

  // Se for um número móvel (com 11 dígitos), aplica a máscara no formato (XX) XXXXX-XXXX
  if (limitedValue.length > 10) {
    return limitedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  // Se for um número fixo (com 10 dígitos), aplica a máscara no formato (XX) XXXX-XXXX
  return limitedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
}
function handlePostalCodeMask(value: string): string {
  const cleanedValue = value.replace(/\D/g, '');

  const limitedValud = cleanedValue.substring(0, 8);

  return limitedValud.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}
async function handleGetDataByPostalCode(postalCode: string) {
  try {
    toast.warning('Buscando CEP...');
    const response = await fetch(
      `https://viacep.com.br/ws/${postalCode}/json/`,
    );

    const data = await response.json();

    if (data.erro) {
      toast.error('CEP inexistente');
    } else {
      toast.success('CEP encontrado');
      return data;
    }
  } catch (error) {
    handleError(error);
  }
}
function handleMessageTime(date: Date): string {
  const sentAtMessage: Date = new Date(date);
  let sentAtMessageHours: string = sentAtMessage.getHours().toString();
  let sentAtMessageMinutes: string = sentAtMessage.getMinutes().toString();

  if (Number(sentAtMessageHours) < 10) {
    sentAtMessageHours += '0' + sentAtMessageHours;
  }
  if (Number(sentAtMessageMinutes) < 10) {
    sentAtMessageMinutes = '0' + sentAtMessageMinutes;
  }

  const messageTime = sentAtMessageHours + ':' + sentAtMessageMinutes;
  return messageTime;
}
function handleModalPosition(
  position: { clientX: number; clientY: number },
  id: string,
): { x: number; y: number } | null {
  const dynamicModalElement = document.querySelector(id);

  if (!dynamicModalElement) return null;

  const dimensions = dynamicModalElement.getBoundingClientRect();

  const modalWith: number = dimensions.width;
  const modalHeight: number = dimensions.height;

  const positionY: number =
    window.innerHeight - position.clientY < modalHeight
      ? position.clientY - modalHeight - 5
      : position.clientY + 15;
  const positionX: number =
    window.innerWidth - position.clientX < modalWith
      ? position.clientX - modalWith
      : position.clientX;

  return { x: positionX, y: positionY };
}

export {
  handleConverterId,
  handleValidateEmailCode,
  handleIsNumber,
  handleGetEnvVariable,
  handleGetHeaders,
  handleMask,
  handleMaskCnpj,
  handleReponse,
  handleDownload,
  handleConvertDate,
  handleConvertDateAndTime,
  handleValidateDate,
  handleReconvertDate,
  handleIsValidDate,
  convertDateToISO,
  handleError,
  handleGetStaticsHeaders,
  handlePhoneMask,
  handlePostalCodeMask,
  handleGetDataByPostalCode,
  handleMessageTime,
  handleModalPosition,
};
