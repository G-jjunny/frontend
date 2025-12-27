import { useParams } from 'react-router';
import { useAuthStore } from '@/shared/model/authStore'; // 예시

import type { BoardDetailProps } from '../model/boardType';

export default function BoardDetail({
  title,
  icon,
  list,
  currentUserId,
  notFoundMessage = '존재하지 않는 게시글입니다.',
  children,
}: BoardDetailProps) {
  const { id } = useParams();
  const { user } = useAuthStore(); // 로그인 유저

  const item = list.find((item) => item.id === Number(id));

  if (!item) {
    return <div>{notFoundMessage}</div>;
  }


if (!user) return <div>로딩 중...</div>;

const isMine = item.authorId === user.id;

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
            {item.authorName} · {item.createdAt}
          </div>
        </div>

        {isMine && (
          <div className="flex gap-2 opacity-70">
            <button className="text-sm text-blue-600 hover:underline">수정</button>
            <span> | </span>
            <button className="text-sm text-red-600 hover:underline">삭제</button>
          </div>
        )}
      </div>

      <div className="whitespace-pre-line leading-7 text-sm px-2">
        {item.content}
      </div>

      {/* 댓글 */}
      <div className="pt-20">{children}</div>
    </div>
  );
}
