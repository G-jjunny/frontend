import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../api/queries';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

import type { CommentDTO } from '../../api/dto';

interface CommentSectionProps {
  postId: number;
  currentUserId: number;
  comments: CommentDTO[];
}

export default function CommentSection({ postId, currentUserId, comments }: CommentSectionProps) {
  const createCommentMutation = useCreateCommentMutation(postId);
  const updateCommentMutation = useUpdateCommentMutation(postId);
  const deleteCommentMutation = useDeleteCommentMutation(postId);

  const handleCreate = (content: string) => {
    createCommentMutation.mutate(content, {
      onError: () => {
        alert('댓글 작성에 실패했습니다.');
      },
    });
  };

  const handleUpdate = (id: number, content: string) => {
    updateCommentMutation.mutate({ id, content });
  };

  const handleDelete = (id: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;
    deleteCommentMutation.mutate(id);
  };

  return (
    <div className="mt-8 border-t pt-6 flex flex-col gap-4">
      <h3 className="font-bold">댓글 {comments.length}</h3>

      <CommentList
        comments={comments}
        currentUserId={currentUserId}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <CommentForm onSubmit={handleCreate} isLoading={createCommentMutation.isPending} />
    </div>
  );
}
