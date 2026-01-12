import { useState } from 'react';

interface EditPostModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
  category: string;
  initialData: { title: string; content: string };
}

export default function EditPostModal({
  onClose,
  onSubmit,
  category,
  initialData,
}: EditPostModalProps) {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력하세요.');
      return;
    }
    onSubmit({ title, content });
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
          {category === '공지' ? '공지사항 수정' : '자유게시판 수정'}
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
          <button onClick={handleSubmit} className="px-4 py-1 bg-mega text-white rounded">
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
