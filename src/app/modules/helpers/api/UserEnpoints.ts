import { AxiosResponse, AxiosStatic } from 'axios';
import { handleGetHeaders, handleGetStaticsHeaders } from '../utils';
import { RegisterInterface } from '../../global/interfaces/UserModel';
import axios from './Api';

export function createUser(data: RegisterInterface): Promise<AxiosResponse> {
  return axios.post('/users/', data, {
    headers: handleGetHeaders('application/json'),
  });
}
export function getUser() {
  return axios.get('/users', { headers: handleGetHeaders('application/json') });
}
export function usernameValidate(username: string): Promise<AxiosResponse> {
  return axios.post(
    `/users/validate-username/`,
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
