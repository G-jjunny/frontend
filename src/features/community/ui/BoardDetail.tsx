import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import {
  useCommunityPostDetailQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} from '../api/queries';

import CommentSection from './comment/CommentSection';
import CommunityModal from './CommunityModal';

import type { BoardDetailProps } from '../model/boardType';

import { useAuthStore } from '@/shared/model/authStore';

export default function BoardDetail({ icon, title }: BoardDetailProps) {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: post, isLoading, isError } = useCommunityPostDetailQuery(postId);

  const updateMutation = useUpdatePostMutation();
  const deleteMutation = useDeletePostMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>존재하지 않는 게시글입니다.</div>;
  if (!user) return <div>로그인이 필요합니다.</div>;

  const isMine = post.author_id === user.id;
  const formattedDate = dayjs(post.created_at).format('YYYY-MM-DD HH:mm');

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteMutation.mutateAsync(post.id);
      toast.success('삭제되었습니다.');
      void navigate(-1);
    } catch {
      toast.error('삭제가 실패되었습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>{icon}</span>
        <span>{title}</span>
      </div>

      <div className="border-b" />

      <div className="flex items-center justify-between px-2">
        <div>
          <div className="text-lg font-bold">{post.title}</div>
          <div className="text-sm text-gray-500">
            {post.author_name} · {formattedDate}
            {post.updated_at !== post.created_at ? ' · (수정됨)' : ''}
          </div>
        </div>

        {isMine && (
          <div className="flex gap-2 opacity-70">
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              수정
            </button>
            <span> | </span>
            <button
              onClick={() => void handleDelete()}
              className="text-sm text-red-600 hover:underline"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="whitespace-pre-line leading-7 text-sm px-2">{post.content}</div>

      <CommentSection
        postId={post.id}
        currentUserId={user.id}
      />

      {isEditOpen && (
        <CommunityModal
          mode="edit"
          category={post.category}
          initialData={{
            title: post.title,
            content: post.content,
          }}
          onSubmit={async (data) => {
            await updateMutation.mutateAsync({
              id: post.id,
              data,
            });
          }}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
}
