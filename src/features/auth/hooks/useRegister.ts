import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { PATHS } from '@/routes/paths';
import type { PasientRegisterDto } from '../api/auth.types';

interface RegisterParams {
  dto: PasientRegisterDto;
  rawPassword?: string;
}

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ dto }: RegisterParams) => {
      return await authApi.register(dto);
    },
    onSuccess: (_, variables) => {
      // Navigate directly to OTP page, passing email & password to automatically sign-in after verification
      navigate(PATHS.VERIFY_OTP, {
        state: {
          email: variables.dto.email,
          password: variables.rawPassword,
          isRegistrationFlow: true,
        },
      });
    },
  });
};
