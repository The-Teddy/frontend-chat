import axios from 'axios';

const api = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.baseURL = api;

export default axios;
