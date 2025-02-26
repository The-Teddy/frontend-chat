import { AxiosResponse } from 'axios';
import { handleGetHeaders } from '../utils/Requests';
import axios from './Api';

export function resend_token(token: string): Promise<AxiosResponse> {
  return axios.post(
    '/emails/resend-token',
    { token },
    {
      headers: handleGetHeaders('application/json'),
    },
  );
}
