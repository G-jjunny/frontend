import type { MeResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';
import { useAuthStore } from '@/shared/model/authStore';

export const userService = {
  me: async (): Promise<MeResponseDTO> => {
    const response = await apiClient.get<MeResponseDTO>({
      url: '/api/auth/me',
    });

    const { setUser } = useAuthStore.getState();
    setUser(response);

    return response;
  },
};
