import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost, getCommunityPosts, getCommunityPostById } from './service';

import type { CreatePostRequestDTO } from './dto';

// POST
export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequestDTO) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
    },
  });
}

// LIST
export function useCommunityPostsQuery() {
  return useQuery({
    queryKey: ['communityPosts'],
    queryFn: getCommunityPosts,
  });
}

// DETAIL
export function useCommunityPostDetailQuery(id: number) {
  return useQuery({
    queryKey: ['communityPost', id],
    queryFn: () => getCommunityPostById(id),
    enabled: !!id,
  });
}
