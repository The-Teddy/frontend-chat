import { AxiosResponse } from 'axios';
import { handleGetHeaders } from '../utils/Requests';
import { LoginInterface } from '../../global/interfaces/UserModel';
import axios from './Api';

export function login(data: LoginInterface): Promise<AxiosResponse> {
  return axios.post('/auth/login', data, {
    headers: handleGetHeaders('application/json'),
  });
}
