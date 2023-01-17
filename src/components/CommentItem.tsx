import { Comment } from "../interfaces";

type Props = {
  comment: Comment;
};

const CommentItem = ({ comment }: Props) => {
  const { id, author, content, profile_url, createdAt } = comment;

  const handleClick = () => {};
  return (
    <li className="w-full py-1 px-5 border-b  ">
      <div className="flex">
        <img className=" rounded-full mr-3" src={profile_url} alt="profile" />
        <h2 className="flex items-center w-full ">{author}</h2>
        <span className="w-full h-[30%] text-end ">{createdAt}</span>
      </div>
      <p> {content}</p>
      <div className="flex w-full justify-end">
        <button type="button" onClick={handleClick} className="btn">
          수정
        </button>
        <button type="button" className="btn">
          삭제
        </button>
      </div>
    </li>
  );
};

export default CommentItem;
