import axios from './Api';
import { AxiosResponse } from 'axios';
import { handleGetStaticsHeaders } from '../utils/Requests';

export function uploadProfilePhoto(
  formData: FormData,
  token: string,
): Promise<AxiosResponse> {
  return axios.post('upload/profile-photo', formData, {
    headers: handleGetStaticsHeaders(token),
  });
}
