// notice DTO
export interface CreatePostRequestDTO {
  title: string;
  content: string;
  category: '공지';
}

export interface CreatePostResponseDTO {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

// 댓글 DTO
export interface CommentDTO {
  id: number;
  post_id: number;
  author_id: number;
  author_name: string;
  author_position: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// 게시글 DTO
export interface CommunityPostDTO {
  id: number;
  category: string;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  author_position: string;
  system_generated: boolean;
  created_at: string;
  updated_at: string;
  comments: CommentDTO[];
}