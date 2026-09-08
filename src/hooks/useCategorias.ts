import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import type { Categoria, PaginatedResponse, CreateCategoriaRequest } from '../types';

export const useCategorias = (page = 1, limit = 10) => {
  return useQuery<PaginatedResponse<Categoria>>({
    queryKey: ['categorias', page, limit],
    queryFn: async () => {
      const { data } = await client.get(`/categorias?page=${page}&limit=${limit}`);
      return data;
    },
  });
};

export const useCategoria = (id: string) => {
  return useQuery<Categoria>({
    queryKey: ['categoria', id],
    queryFn: async () => {
      const { data } = await client.get(`/categorias/${id}`);
      return data;
    },
  });
};

export const useCreateCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoria: CreateCategoriaRequest) => client.post('/categorias', categoria),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });
};

export const useUpdateCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCategoriaRequest> }) =>
      client.patch(`/categorias/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
      queryClient.invalidateQueries({ queryKey: ['categoria', id] });
      window.location.hash = '#admin-categories';
    },
  });
};

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => client.delete(`/categorias/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['categorias'] });

      const previousQueries = queryClient.getQueriesData<PaginatedResponse<Categoria>>({
        queryKey: ['categorias'],
      });

      queryClient.setQueriesData<PaginatedResponse<Categoria>>(
        { queryKey: ['categorias'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((categoria) => String(categoria.id) !== String(id)),
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
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });
};
