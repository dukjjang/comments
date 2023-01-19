import { useEffect, useRef } from "react";

import { SystemError } from "interfaces";
import { useAppDispatch, useAppSelector } from "store";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "./Pagination";
import {
  fetchComments,
  fetchTotalComments,
} from "store/comment/commentActions";

const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comment.comments);
  const commentsRef = useRef<HTMLUListElement>(null);
  const currentPage = useAppSelector((state) => state.comment.currentPage);

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
  }, [currentPage, dispatch]);

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
