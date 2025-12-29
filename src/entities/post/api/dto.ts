export interface PostResponseDTO {
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
  comments: Comment[];
}

export interface Comment {
  id: number;
  post_id: number;
  author_id: number;
  author_name: string;
  author_position: string;
  content: string;
  created_at: string;
  updated_at: string;
}
