import axios, { AxiosResponse, AxiosStatic } from 'axios';
import { handleGetHeaders, handleGetStaticsHeaders } from './utils';
import {
  LoginInterface,
  RegisterInterface,
} from '../global/interfaces/UserModel';

const api = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.baseURL = api;
const token = localStorage.getItem('token');

//users
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

//aut
export function login(data: LoginInterface) {
  return axios.post('/login', data, {
    headers: handleGetHeaders('application/json'),
  });
}
