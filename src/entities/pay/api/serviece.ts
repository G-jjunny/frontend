import type { PayResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';

export const payService = {
  getPayOverview: async (): Promise<PayResponseDTO> => {
    const response = await apiClient.get<PayResponseDTO>({
      url: `/api/pay/overview`,
      params: {
        year: new Date().getFullYear(),
      },
    });

    return response;
  },
};
