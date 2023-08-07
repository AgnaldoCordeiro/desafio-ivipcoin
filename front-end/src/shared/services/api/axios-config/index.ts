import axios from 'axios'

import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  /* headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '')}`
  } */
});

const Cep = axios.create({
  baseURL: Environment.URL_BASE_CEP,
  /* headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '')}`
  } */
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
)
Cep.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
)


export { Api, Cep };

