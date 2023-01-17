import { Fragment } from "react";
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
    </Fragment>
  );
};

export default Comments;
