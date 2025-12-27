import type { CommunityPostDTO } from '../api/dto';
import type { BoardDetailItem } from './boardType';

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

export function mapBoardDetail(res: any): BoardDetailItem {
  return {
    id: res.id,
    title: res.title,
    content: res.content,

    authorId: res.author_id,
    authorName: res.author_name,

    createdAt: res.created_at,
    updatedAt: res.updated_at,
  };
}