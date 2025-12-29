import { useState } from 'react';

import { useCreatePostMutation } from '../api/queries';

interface PostCreateModalProps {
  onClose: () => void;
  category: '공지' | '자유게시판';
  onSubmit: (data: any) => void;
}

export default function PostCreateModal({ onClose, category }: PostCreateModalProps) {
  const { mutateAsync, isPending } = useCreatePostMutation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목 및 내용을 모두 입력하세요.');
      return;
    }

    try {
      await mutateAsync({
        title,
        content,
        category,
      });

      alert('등록이 완료되었습니다!');
      onClose();
    } catch {
      alert('등록에 실패했습니다.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-[500px] rounded-lg p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-bold text-black">
          {category === '공지' ? '공지사항 작성' : '자유게시판 글 작성'}
        </div>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded placeholder:text-gray-400"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-3 py-2 rounded h-40 resize-none placeholder:text-gray-400"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            취소
          </button>
          <button
            onClick={() => void handleSubmit()} // async 함수 안전하게 호출
            disabled={isPending}
            className="px-4 py-1 bg-mega text-white rounded disabled:opacity-50"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
