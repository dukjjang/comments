import { useState } from "react";
import { Comment, SystemError } from "interfaces";
import { useComment } from "hooks/useComment";

type Props = {
  comment: Comment;
};

const CommentItem = ({ comment }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id, author, content, profile_url, createdAt } = comment;
  const { onDelete, onEdit } = useComment();

  const handleOnLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  return (
    <li className={`${isLoading && "blur-sm"} w-full py-1 px-5 border-b `}>
      <div className="flex">
        <img
          onLoadStart={() => setIsLoading(true)}
          onLoad={handleOnLoad}
          className="rounded-full mr-3"
          src={profile_url}
          alt="profile"
        />
        <h2 className="flex items-center w-full ">{author}</h2>
        <span className="w-full h-[30%] text-end ">{createdAt}</span>
      </div>
      <p> {content}</p>
      <div className="flex w-full justify-end">
        <button onClick={() => onEdit(id)} type="button" className="btn">
          수정
        </button>
        <button onClick={() => onDelete(id)} type="button" className="btn">
          삭제
        </button>
      </div>
    </li>
  );
};

export default CommentItem;
