import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import type { User, PaginatedResponse, CreateUserRequest } from '../types';

export const useUsers = (page = 1, limit = 10) => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      const { data } = await client.get(`/users?page=${page}&limit=${limit}`);
      return data;
    },
  });
};

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await client.get(`/users/${id}`);
      return data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserRequest) => client.post('/users', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateUserRequest> }) =>
      client.patch(`/users/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      window.location.hash = '#admin-authors';
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => client.delete(`/users/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousQueries = queryClient.getQueriesData<PaginatedResponse<User>>({
        queryKey: ['users'],
      });

      queryClient.setQueriesData<PaginatedResponse<User>>(
        { queryKey: ['users'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((user) => String(user.id) !== String(id)),
            total: old.total - 1,
          };
        }
      );

      return { previousQueries };
    },
    onError: (_error, _id, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
