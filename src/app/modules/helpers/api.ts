import axios from 'axios';
import { handleGetHeaders, handleGetStaticsHeaders } from './utils';
import { LoginInterface, RegisterInterface } from '../global/interfaces/UserModel';

const api = process.env.REACT_APP_API_ENDPOINT + '/v1';
axios.defaults.baseURL = api;
const token = localStorage.getItem('token');

//users
export function createUser(data: RegisterInterface) {
  return axios.post('/users/', data, {headers: handleGetHeaders('application/json')});
}
export function getUser() {
  return axios.get('/users', {headers: handleGetHeaders('application/json')})
}

//aut
export function login(data: LoginInterface) {
  return axios.post('/login', data, {
    headers: handleGetHeaders('application/json'),
  });
}
