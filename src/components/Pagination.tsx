import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentPage, setPageSection } from "../store/comment/commentSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPage = useSelector((state: RootState) => state.comment.totalPage);
  const lastPage = useSelector((state: RootState) => state.comment.lastPage);
  const firstPage = useSelector((state: RootState) => state.comment.firstPage);

  const pageButtons = [...Array(totalPage + 1)].map((_, i) => i);

  return (
    <ul className="flex p-2 text-sm gap-3 justify-center">
      <button
        onClick={() => dispatch(setPageSection("prev"))}
        className="btn"
      >{`<`}</button>
      {pageButtons.slice(firstPage, lastPage + 1).map((pageNumber, idx) => (
        <button
          onClick={() => dispatch(setCurrentPage(pageNumber))}
          key={idx}
          className="btn"
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => dispatch(setPageSection("next"))}
        className="btn"
      >{`>`}</button>
    </ul>
  );
};

export default Pagination;
