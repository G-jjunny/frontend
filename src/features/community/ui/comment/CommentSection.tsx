import { useCreateCommentMutation } from '../../api/queries';

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

  const handleCreate = (content: string) => {
    createCommentMutation.mutate(content, {
      onError: () => {
        alert('댓글 작성에 실패했습니다.');
      },
    });
  };

  // 임의 수정 핸들러
  const handleUpdate = (id: number, content: string) => {
    console.log('update comment', id, content);
  };

  // 임의 삭제 핸들러
  const handleDelete = (id: number) => {
    console.log('delete comment', id);
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
