import { authService } from './service';

export const authQueries = {
  login: {
    mutationFn: authService.login,
  },
};
