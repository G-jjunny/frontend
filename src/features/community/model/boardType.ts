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

// BoardDetail
interface BoardDetailItem {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
}

export interface BoardDetailProps {
  title: string;
  icon: ReactNode;
  list: BoardDetailItem[];
  notFoundMessage?: string;
  children?: ReactNode;
}
