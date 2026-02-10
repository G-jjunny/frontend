import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createPost,
  getCommunityPosts,
  getCommunityPostById,
  updatePost,
  deletePost,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getCategoryCounts,
} from './service';

import type {
  GetCommunityPostsParams,
  CreatePostRequestDTO,
  CommunityPostDTO,
  CommentsResponseDTO,
  CategoryCountsResponse,
} from './dto';

// 🔖 게시글
// POST
export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequestDTO) => createPost(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
      void queryClient.invalidateQueries({
        queryKey: ['community', 'category-counts'],
      });
    },
  });
}

// LIST
export const useCommunityPostsQuery = (params: GetCommunityPostsParams) => {
  return useQuery({
    queryKey: ['communityPosts', params],
    queryFn: () => getCommunityPosts(params),
  });
};

// DETAIL
export function useCommunityPostDetailQuery(id: number | null) {
  return useQuery({
    queryKey: ['communityPost', id],
    queryFn: () => getCommunityPostById(id!),
    enabled: !!id,
  });
}

// PUT
export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation<CommunityPostDTO, Error, { id: number; data: Partial<CreatePostRequestDTO> }>({
    mutationFn: ({ id, data }) => updatePost(id, data),

    onSuccess: (variables) => {
      void queryClient.invalidateQueries({
        queryKey: ['communityPost', variables.id],
      });

      void queryClient.invalidateQueries({
        queryKey: ['communityPosts'],
      });
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
      void queryClient.invalidateQueries({
        queryKey: ['community', 'category-counts'],
      });
    },
  });
}

// 카테고리별 글 갯수
export const useCategoryCountsQuery = () => {
  return useQuery<CategoryCountsResponse>({
    queryKey: ['community', 'category-counts'],
    queryFn: () => getCategoryCounts(),
    staleTime: 1000 * 60,
  });
};

// 🔖 댓글
// GET
export const useCommentsQuery = (postId: number, page: number) =>
  useQuery<CommentsResponseDTO>({
    queryKey: ['comments', postId, page],
    queryFn: () => getComments(postId, page),
    placeholderData: (prev) => prev,
  });

// POST
export const useCreateCommentMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, { content }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      });
    },
  });
};

// PATCH
export function useUpdateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => updateComment(id, content),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['comments', postId],
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
        queryKey: ['comments', postId],
      });
    },
  });
}
