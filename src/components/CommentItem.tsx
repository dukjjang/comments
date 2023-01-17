import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "../interfaces";
import { AppDispatch, RootState } from "../store";
import { deleteComment, editComment } from "../store/commentSlice";

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

  const handleDelete = () => {
    dispatch(deleteComment(id));
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
