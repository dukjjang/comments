import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentPage } from "../store/commentSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPageNumber = useSelector(
    (state: RootState) => state.comment.totalPage
  );
  const pageButtons = new Array(totalPageNumber).fill(0);

  return (
    <ul className="flex p-2 text-sm gap-3 justify-center">
      {pageButtons.map((_, idx) => (
        <button
          onClick={() => dispatch(setCurrentPage(idx + 1))}
          key={idx}
          className="btn"
        >
          {idx + 1}
        </button>
      ))}
    </ul>
  );
};

export default Pagination;
