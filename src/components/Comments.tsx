import { Fragment } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "./Pagination";

const Comments = () => {
  return (
    <Fragment>
      <ul className="bg-white">
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </ul>
      <Pagination />
      <CommentForm />
    </Fragment>
  );
};

export default Comments;
