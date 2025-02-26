import moment from 'moment';

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
  handleConvertDate,
  handleConvertDateAndTime,
  handleValidateDate,
  handleReconvertDate,
  handleIsValidDate,
  convertDateToISO,
  handleMessageTime,
  handleModalPosition,
};
