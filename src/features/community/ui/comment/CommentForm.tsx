import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isLoading?: boolean;
}

export default function CommentForm({ onSubmit, isLoading }: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border rounded p-2 text-sm bg-white"
        placeholder="댓글을 입력하세요"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-4 bg-mega text-white rounded"
      >
        등록
      </button>
    </div>
  );
}
