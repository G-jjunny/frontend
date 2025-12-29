import { apiClient } from '../../../shared/api/apiClients';

import type { CommunityPostDTO, CreatePostRequestDTO, CreatePostResponseDTO } from './dto';

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

// 게시글 상세
export const getCommunityPostById = (id: number) =>
  apiClient.get<CommunityPostDTO>({
    url: `/api/community/posts/${id}`,
  });

// 게시글 수정
export const updatePost = (id: number, data: Partial<CreatePostRequestDTO>) =>
  apiClient.patch<CommunityPostDTO>({
    url: `/api/community/posts/${id}`,
    data,
  });

// 게시글 삭제
export const deletePost = (id: number) =>
  apiClient.delete<{ success: boolean }>({
    url: `/api/community/posts/${id}`,
  });
