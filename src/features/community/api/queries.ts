import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createPost,
  getCommunityPosts,
  getCommunityPostById,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
} from './service';

import type { CreatePostRequestDTO } from './dto';

// 🔖 게시글
// POST
export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequestDTO) => createPost(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
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

// PUT
export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostRequestDTO> }) =>
      updatePost(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
    },
  });
}

// DELETE
export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
    },
  });
}

// 🔖 댓글
// POST
export function useCreateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, { content }),

    onSuccess: () => {
      // 🔥 핵심
      void queryClient.invalidateQueries({
        queryKey: ['communityPost', postId],
      });
    },
  });
}

// PATCH
export function useUpdateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      updateComment(id, content),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['communityPost', postId],
      });
    },
  });
}

//DELETE
export function useDeleteCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteComment(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['communityPost', postId],
      });
    },
  });
}