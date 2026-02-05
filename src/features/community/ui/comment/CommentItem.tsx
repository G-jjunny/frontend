import dayjs from 'dayjs';
import { useState } from 'react';

import type { CommentDTO } from '../../api/dto';

interface CommentItemProps {
  comment: CommentDTO;
  currentUserId: number;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export default function CommentItem({
  comment,
  currentUserId,
  onUpdate,
  onDelete,
}: CommentItemProps) {
  const isMine = comment.author_id === currentUserId;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(comment.content);
  const formattedDate = dayjs(comment.created_at).format('YYYY-MM-DD HH:mm');

  const handleSave = () => {
    if (!value.trim()) return;
    onUpdate(comment.id, value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(comment.content);
    setIsEditing(false);
  };

  return (
    <li className="border rounded-md p-3">
      <div className="flex justify-between">
        <div className="text-sm font-bold">{comment.author_name}</div>
        <div className="text-[12px] text-gray-500">
          {formattedDate}
          {comment.updated_at !== comment.created_at ? ' · 수정됨' : ''}
        </div>
      </div>

      {!isEditing ? (
        <p className="mt-2 text-sm whitespace-pre-line">{comment.content}</p>
      ) : (
        <textarea
          className="mt-2 w-full border rounded-md p-2 text-sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      {isMine && (
        <div className="mt-2 flex gap-2 text-xs text-gray-500">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={() => onDelete(comment.id)}>삭제</button>
            </>
          ) : (
            <>
              <button onClick={handleSave} className="text-blue-600">
                저장
              </button>
              <button onClick={handleCancel}>취소</button>
            </>
          )}
        </div>
      )}
    </li>
  );
}
