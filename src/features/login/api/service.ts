import type { LoginRequestDTO, LoginResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';
import { useAuthStore } from '@/shared/model/authStore';

export const authService = {
  login: async (data: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await apiClient.post<LoginResponseDTO>({
      url: '/api/auth/login',
      data,
    });
    const token = response.access_token;

    if (!token) {
      throw new Error('로그인 실패: 토큰을 받지 못했습니다.');
    }

    // Zustand store 업데이트
    const { setAccessToken, setAuth } = useAuthStore.getState();
    setAccessToken(token);
    setAuth();

    return response;
  },
  logout: () => {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
  },
};
