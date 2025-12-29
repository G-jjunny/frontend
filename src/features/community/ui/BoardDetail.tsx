import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { useDeletePostMutation, useUpdatePostMutation } from '../api/queries';

import EditPostModal from './EditModal';

import type { BoardDetailProps } from '../model/boardType';

import { useAuthStore } from '@/shared/model/authStore';

export default function BoardDetail({
  title,
  icon,
  list,
  notFoundMessage = '존재하지 않는 게시글입니다.',
  children,
}: BoardDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const item = list.find((item) => item.id === Number(id));
  const isMine = item?.authorId === user?.id;

  const [isEditOpen, setIsEditOpen] = useState(false);

  const updateMutation = useUpdatePostMutation();
  const deleteMutation = useDeletePostMutation();
  const queryClient = useQueryClient();

  if (!item) return <div>{notFoundMessage}</div>;
  if (!user) return <div>로딩 중...</div>;

  // 수정 핸들러
  const handleUpdate = async (data: { title: string; content: string }) => {
    try {
      await updateMutation.mutateAsync({ id: item.id, data });

      queryClient.setQueryData(['communityPost', item.id], (prev: typeof item | undefined) => {
        if (!prev) return { ...item, ...data };
        return { ...prev, ...data };
      });

      void queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
      setIsEditOpen(false);

      toast.success('수정되었습니다!');
    } catch {
      toast.error('수정이 실패되었습니다.');
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteMutation.mutateAsync(item.id);
      toast.success('삭제되었습니다.');
      void navigate(-1);
    } catch {
      toast.error('삭제가 실패되었습니다.');
    }
  };

  const formattedDate = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>{icon}</span>
        <span>{title}</span>
      </div>

      <div className="border-b" />

      <div className="flex items-center justify-between px-2">
        <div>
          <div className="text-lg font-bold">{item.title}</div>
          <div className="text-sm text-gray-500">
            {item.authorName} · {formattedDate}
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
        {isEditOpen && (
          <EditPostModal
            onClose={() => setIsEditOpen(false)}
            onSubmit={(data) => void handleUpdate(data)}
            category={item.category}
            initialData={{ title: item.title, content: item.content }}
          />
        )}
      </div>

      <div className="whitespace-pre-line leading-7 text-sm px-2">{item.content}</div>

      {/* 댓글 */}
      <div className="pt-20">{children}</div>
    </div>
  );
}
