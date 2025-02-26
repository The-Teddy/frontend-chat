import { AxiosResponse } from 'axios';
import { handleGetHeaders } from '../utils/Requests';
import { RegisterInterface } from '../../global/interfaces/UserModel';
import axios from './Api';

export function createUser(data: RegisterInterface): Promise<AxiosResponse> {
  return axios.post('/users/', data, {
    headers: handleGetHeaders('application/json'),
  });
}
export function getUser(token: string) {
  return axios.get('/users', {
    headers: handleGetHeaders('application/json', token),
  });
}
export function usernameValidate(username: string): Promise<AxiosResponse> {
  return axios.post(
    '/users/validate-username/',
    { username },
    {
      headers: handleGetHeaders('application/json'),
    },
  );
}
export function verify_email(token: string): Promise<AxiosResponse> {
  return axios.get(`/users/verify-email/${token}`, {
    headers: handleGetHeaders('application/json'),
  });
}
export function updateName(
  name: string,
  token: string,
): Promise<AxiosResponse> {
  return axios.put(
    '/users/update-name',
    { name },
    { headers: handleGetHeaders('application/json') },
  );
}
