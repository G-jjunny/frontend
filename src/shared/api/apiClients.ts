import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { rejectInterceptor, requestInterceptor, responseInterceptor } from './interceptors';

const BASE_URL = (import.meta.env.VITE_BASE_URL as string) || 'http://localhost:8000';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// [TODO]: 인터셉터 추가
axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, rejectInterceptor);

export const apiClient = {
  get: <T>(config: AxiosRequestConfig) =>
    axiosInstance.get<T>(config.url!, config).then((response) => response.data),

  post: <T>(config: AxiosRequestConfig) =>
    axiosInstance.post<T>(config.url!, config.data, config).then((response) => response.data),
  patch: <T>(config: AxiosRequestConfig) =>
    axiosInstance.patch<T>(config.url!, config.data, config).then((response) => response.data),
  delete: <T>(config: AxiosRequestConfig) =>
    axiosInstance.delete<T>(config.url!, config).then((response) => response.data),
} as const;
