import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import type { Post, PaginatedResponse, CreatePostRequest } from '../types';

export const usePosts = (page = 1, limit = 10) => {
  return useQuery<PaginatedResponse<Post>>({
    queryKey: ['posts', page, limit],
    queryFn: async () => {
      const { data } = await client.get(`/posts?page=${page}&limit=${limit}`);
      return data;
    },
  });
};

export const usePost = (id: string) => {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data } = await client.get(`/posts/${id}`);
      return data;
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: CreatePostRequest) => client.post('/posts', post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      window.location.hash = '#admin-blog';
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePostRequest> }) =>
      client.patch(`/posts/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      window.location.hash = '#admin-blog';
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => client.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
