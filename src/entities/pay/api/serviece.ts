import type { PayResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';

export const payService = {
  getPayOverview: async (year: number, month: number): Promise<PayResponseDTO> => {
    const response = await apiClient.get<PayResponseDTO>({
      url: `/api/payroll/`,
      params: { year, month },
    });

    return response;
  },
};
