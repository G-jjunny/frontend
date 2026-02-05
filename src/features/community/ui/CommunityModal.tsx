import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useCreatePostMutation } from '../api/queries';

import type { PostModalProps } from '../model/modalType';

export default function CommunityModal({
  mode,
  category,
  onClose,
  onSubmit,
  initialData,
}: PostModalProps) {
  const isCreate = mode === 'create';

  const { mutateAsync, isPending } = useCreatePostMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 수정일 경우 초기값 유지
  useEffect(() => {
    if (!isCreate && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [isCreate, initialData]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('제목 및 내용을 모두 입력하세요.');
      return;
    }

    try {
      if (isCreate) {
        await mutateAsync({ title, content, category });
        toast.success('등록이 완료되었습니다!');
      } else {
        await onSubmit({ title, content });
        toast.success('수정이 완료되었습니다!');
      }

      onClose();
    } catch {
      toast.error(isCreate ? '등록에 실패했습니다.' : '수정에 실패했습니다.');
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
        <div className="text-lg font-bold">
          {isCreate
            ? category === '공지'
              ? '공지사항 작성'
              : '자유게시판 글 작성'
            : category === '공지'
              ? '공지사항 수정'
              : '자유게시판 수정'}
        </div>

        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-3 py-2 rounded h-40 resize-none"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            취소
          </button>
          <button
            onClick={() => void handleSubmit()}
            disabled={isPending}
            className="px-4 py-1 bg-mega text-white rounded disabled:opacity-50"
          >
            {isCreate ? '등록' : '수정'}
          </button>
        </div>
      </div>
    </div>
  );
}
