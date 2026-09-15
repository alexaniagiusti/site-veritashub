import { useMutation } from '@tanstack/react-query';
import client from '../api/client';
import type { UpdateProfileRequest, ChangePasswordRequest, User } from '../types';

export const useUpdateProfile = (onSuccessCallback?: (user: User) => void) => {
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      client.patch<User>('/users/profile/me', data),
    onSuccess: (response) => {
      onSuccessCallback?.(response.data);
      alert('Perfil atualizado com sucesso!');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      client.patch('/users/password/me', data),
    onSuccess: () => {
      alert('Senha alterada com sucesso!');
    },
  });
};
