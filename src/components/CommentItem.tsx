import { Comment } from "../interfaces";

type Props = {
  comment: Comment;
};

const CommentItem = ({ comment }: Props) => {
  const { author, content, profile_url, createdAt } = comment;
  return (
    <li className="w-full py-1 px-5 border-b  ">
      <div className="flex">
        <img className=" rounded-full mr-3" src={profile_url} alt="profile" />
        <h2 className="flex items-center ">{author}</h2>
        <span className="w-full h-[30%] text-end ">{createdAt}</span>
      </div>
      <p className=" "> {content}</p>
      <div className="flex w-full justify-end">
        <button className="btn">수정</button>
        <button className="btn">삭제</button>
      </div>
    </li>
  );
};

export default CommentItem;
