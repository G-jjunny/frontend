import { useAuthStore } from '../model/authStore';

import type { ErrorResponse } from '../types/apiResponse';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

function appendFormData(formData: FormData, key: string, value: unknown) {
  if (value == null) return;

  // File 또는 Blob
  if (value instanceof File || value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  // 배열이면 key[] 형식으로 append
  if (Array.isArray(value)) {
    value.forEach((v) => appendFormData(formData, `${key}[]`, v));
    return;
  }

  // 객체면 JSON 문자열로 append (서버에서 JSON을 기대하면 이 방식을 사용)
  if (typeof value === 'object') {
    formData.append(key, JSON.stringify(value));
    return;
  }

  // 그 외 기본값은 문자열로 append
  formData.append(key, String(value));
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // [TODOS] 토큰 가져오기
  const { accessToken } = useAuthStore.getState();
  config.headers = config.headers ?? {};

  if (accessToken) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
  }

  // multipart/form-data 처리: content-type 비교는 좀 더 안전하게 검사
  const contentType =
    (config.headers as Record<string, string>)['Content-Type'] ||
    (config.headers as Record<string, string>)['content-type'];

  if (contentType && contentType.includes('multipart/form-data')) {
    const formData = new FormData();

    // config.data가 객체인 경우 안전하게 처리
    const dataObj = (config.data as Record<string, unknown>) || {};
    Object.entries(dataObj).forEach(([key, value]) => {
      appendFormData(formData, key, value);
    });

    config.data = formData;
  }

  return config;
};

// 응답 성공 인터셉터
export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

// 커스텀 에러 클래스
class ApiError extends Error {
  code: string;
  status?: number;
  details?: unknown;

  constructor(message: string, code: string, status?: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

// 응답 에러 인터셉터
export const rejectInterceptor = async (error: AxiosError<ErrorResponse>) => {
  const { clearAuth, accessToken } = useAuthStore.getState();

  // 네트워크 에러
  if (!error.response) {
    return Promise.reject(new ApiError('네트워크 연결을 확인해주세요.', 'NETWORK_ERROR'));
  }

  const status = error.response.status;
  const errorData = error.response.data;

  switch (status) {
    case 401: {
      // 로그인/근태 API는 401이어도 인증 정보를 지우지 않음
      const isAuthRequest = error.config?.url?.includes('/auth/login');
      const isWorkStatusRequest = error.config?.url?.includes('/workstatus/');
      const shouldClearAuth = !!accessToken && !isAuthRequest && !isWorkStatusRequest;

      if (shouldClearAuth) {
        // 실제 토큰 만료 - 토큰 제거
        clearAuth();
      }

      const unauthorizedMessage =
        typeof errorData?.detail === 'string'
          ? errorData.detail
          : shouldClearAuth
            ? '인증이 만료되었습니다. 다시 로그인해주세요.'
            : '아이디 또는 비밀번호가 올바르지 않습니다.';

      return Promise.reject(new ApiError(unauthorizedMessage, 'UNAUTHORIZED', 401));
    }

    case 403:
      return Promise.reject(new ApiError('접근 권한이 없습니다.', 'FORBIDDEN', 403));

    case 404:
      return Promise.reject(new ApiError('요청한 리소스를 찾을 수 없습니다.', 'NOT_FOUND', 404));

    case 422: {
      // Validation 에러 - FastAPI 형식 처리
      let validationMessage = '입력값을 확인해주세요.';

      if (Array.isArray(errorData?.detail)) {
        // 첫 번째 validation 에러 메시지 사용
        const firstError = errorData.detail[0];
        if (firstError?.msg) {
          validationMessage = firstError.msg;
        }
      } else if (typeof errorData?.detail === 'string') {
        validationMessage = errorData.detail;
      }

      return Promise.reject(new ApiError(validationMessage, 'VALIDATION_ERROR', 422, errorData));
    }

    case 500:
      return Promise.reject(
        new ApiError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'SERVER_ERROR', 500),
      );

    default: {
      const defaultMessage =
        typeof errorData?.detail === 'string'
          ? errorData.detail
          : '알 수 없는 오류가 발생했습니다.';

      return Promise.reject(new ApiError(defaultMessage, 'UNKNOWN_ERROR', status));
    }
  }
};
