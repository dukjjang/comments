import { useState } from "react";
import { useDispatch } from "react-redux";
import { Comment, SystemError } from "../interfaces";
import { AppDispatch } from "../store";
import { editComment } from "../store/comment/commentSlice";
import { deleteComment } from "../store/comment/commentThunks";

type Props = {
  comment: Comment;
};

const CommentItem = ({ comment }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id, author, content, profile_url, createdAt } = comment;
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(editComment(id));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(id)).unwrap();
    } catch (error) {
      const e = error as SystemError;
      alert(`삭제요청이 실패하였습니다 ${e.message}`);
    }
  };

  const handleOnLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
        <button onClick={handleClick} type="button" className="btn">
          수정
        </button>
        <button onClick={handleDelete} type="button" className="btn">
          삭제
        </button>
      </div>
    </li>
  );
};

export default CommentItem;
