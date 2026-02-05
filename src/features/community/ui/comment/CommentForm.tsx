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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 엔터 사용 시 중복 등록 에러 (한글 조합을 확정하기 위한 Enter 이벤트 제거)
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border rounded p-2 text-sm bg-white placeholder:text-gray-400"
        placeholder="댓글을 입력하세요 (Enter: 등록, Shift+Enter: 줄바꿈)"
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
