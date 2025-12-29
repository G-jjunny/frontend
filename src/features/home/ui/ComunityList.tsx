import type { PostResponseDTO } from '@/entities/post/api/dto';
interface ComunityListProps {
  post: PostResponseDTO;
}

const ComunityList = ({ post }: ComunityListProps) => {
  return (
    <div className=" flex">
      <div className="">
        {/* 게시글 타이틀 및 카테고리 */}
        <p>{post.title}</p>
      </div>
      <div className="">{/* 게시글 날짜 */}</div>
    </div>
  );
};

export default ComunityList;
