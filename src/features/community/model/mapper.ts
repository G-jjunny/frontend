import type { CommunityPostDTO } from '../api/dto';

export interface BoardItem {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export function mapCommunityPostToBoardItem(
  dto: CommunityPostDTO,
): BoardItem {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    author: dto.author_name,
    createdAt: dto.created_at,
  };
}