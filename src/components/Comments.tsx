import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SystemError } from "../interfaces";
import { AppDispatch, RootState } from "../store";
import {
  fetchComments,
  fetchTotalComments,
} from "../store/comment/commentThunks";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "./Pagination";

const Comments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comment.comments);
  const commentsRef = useRef<HTMLUListElement>(null);
  const currentPage = useSelector(
    (state: RootState) => state.comment.currentPage
  );

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchTotalComments()).unwrap();
        await dispatch(fetchComments(currentPage)).unwrap();
      } catch (error) {
        const e = error as SystemError;
        alert(`데이터 요청에 실패하였습니다 ${e.message}`);
      }
    })();
  }, [currentPage]);

  return (
    <section className=" p-1 bg-white flex flex-col justify-between h-full w-full rounded-lg">
      <ul ref={commentsRef} className={`w-full overflow-auto scrollbar-hide`}>
        {comments.map((comment, idx) => (
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
