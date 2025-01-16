import axios from 'axios';
import { handleGetHeaders, handleGetStaticsHeaders } from './utils';

const api = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

export function createUser(data: any) {
  return axios.post(`${api}/user`, data, {
    headers: handleGetHeaders('application/json'),
  });
}
