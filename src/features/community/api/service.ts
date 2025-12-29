import { apiClient } from '../../../shared/api/apiClients';

import type {
  CommentDTO,
  CommunityPostDTO,
  CreateCommentRequestDTO,
  CreatePostRequestDTO,
  CreatePostResponseDTO,
} from './dto';

// 🔖 게시글
// POST
export const createPost = (data: CreatePostRequestDTO) =>
  apiClient.post<CreatePostResponseDTO>({
    url: '/api/community/posts',
    data,
  });

// GET
export const getCommunityPosts = () =>
  apiClient.get<CommunityPostDTO[]>({
    url: '/api/community/posts',
  });

// Detail GET
export const getCommunityPostById = (id: number) =>
  apiClient.get<CommunityPostDTO>({
    url: `/api/community/posts/${id}`,
  });

// PATCH
export const updatePost = (id: number, data: Partial<CreatePostRequestDTO>) =>
  apiClient.patch<CommunityPostDTO>({
    url: `/api/community/posts/${id}`,
    data,
  });

// DELETE
export const deletePost = (id: number) =>
  apiClient.delete<{ success: boolean }>({
    url: `/api/community/posts/${id}`,
  });

// 🔖 댓글
// POST
export const createComment = (postId: number, data: CreateCommentRequestDTO) =>
  apiClient.post<CommentDTO>({
    url: `/api/community/posts/${postId}/comments`,
    data,
  });

// PATCH
export const updateComment = (comment_id: number, content: string) =>
  apiClient.patch<CommentDTO>({
    url: `/api/community/comments/${comment_id}`,
    data: { content },
  });

// DELETE
export const deleteComment = (comment_id: number) =>
  apiClient.delete<{ success: boolean }>({
    url: `/api/community/comments/${comment_id}`,
  });
