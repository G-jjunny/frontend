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
  icon: React.ReactNode;
  title: string;
}
