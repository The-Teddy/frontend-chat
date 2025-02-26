import { toast } from 'react-toastify';

function handleGetApi(path: string): string {
  if (path) {
    return `${process.env.REACT_APP_API_ENDPOINT}/${path}`;
  } else {
    return process.env.REACT_APP_API_ENDPOINT + '/';
  }
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

export { handleGetApi, handleGetHeaders, handleError, handleGetStaticsHeaders };
