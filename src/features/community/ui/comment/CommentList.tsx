import type { CommentDTO } from '../../api/dto';

interface CommentListProps {
  comments: CommentDTO[];
  currentUserId: number;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export default function CommentList({
  comments,
  currentUserId,
  onUpdate,
  onDelete,
}: CommentListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => {
        const isMine = comment.author_id === currentUserId;

        return (
          <li key={comment.id} className="border-b pb-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold">{comment.author_name}</div>

              {isMine && (
                <div className="flex gap-2 text-xs opacity-70">
                  <button
                    onClick={() => onUpdate(comment.id, comment.content)}
                    className="hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="hover:underline text-red-500"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>

            <div className="text-sm mt-1 whitespace-pre-line">{comment.content}</div>
          </li>
        );
      })}
    </ul>
  );
}
