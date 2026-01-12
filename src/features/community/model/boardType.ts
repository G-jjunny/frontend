import type { ReactNode } from 'react';

// BoardPage
interface BoardItem {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

export interface BoardPageProps {
  title: string;
  icon: string;
  list: BoardItem[];
  canWrite: boolean;
  onSubmit?: (data: { title: string; content: string }) => void;
  ModalComponent?: React.ComponentType<{
    onClose: () => void;
    onSubmit: (data: { title: string; content: string }) => void;
  }>;
}

export interface BaseRow {
  id: number | string;
}

export interface Column<T extends BaseRow> {
  header: string;
  key: keyof T;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

export interface BoardProps<T extends BaseRow> {
  title: string;
  icon?: React.ReactNode;
  list: T[];
  canWrite?: boolean;
  category?: '공지' | '자유게시판';
  ModalComponent?: React.ComponentType<{
    onClose: () => void;
    onSubmit: (data: unknown) => void;
    category: '공지' | '자유게시판';
  }>;
  columns: Column<T>[];
}

// BoardDetail
export interface BoardDetailItem {
  id: number;
  title: string;
  content: string;

  authorId: number;
  authorName: string;

  createdAt: string;
  updatedAt: string;
  category: '공지' | '자유게시판';
}

export interface BoardDetailProps {
  title: string;
  icon: ReactNode;
  list: BoardDetailItem[];
  notFoundMessage?: string;
  children?: ReactNode;
}
