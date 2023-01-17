import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchComments } from "../store/commentSlice";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "./Pagination";

const Comments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comment.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return (
    <section className=" p-1 bg-white flex flex-col justify-between h-full w-full rounded-lg">
      <ul className=" w-full overflow-auto scrollbar-hide">
        {comments.slice(0, 8).map((comment, idx) => (
          <CommentItem key={idx} comment={comment} />
        ))}
      </ul>
      <div className="bg-neutral-100 h-fit ">
        <Pagination />
        <CommentForm />
      </div>
    </section>
  );
};

export default Comments;
