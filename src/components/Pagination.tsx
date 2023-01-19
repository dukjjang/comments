import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store";
import { nextPage, prevPage, setCurrentPage } from "store/comment/commentSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.comment.currentPage
  );
  const totalPage = useSelector((state: RootState) => state.comment.totalPage);
  const firstPage = useSelector((state: RootState) => state.comment.firstPage);
  const lastPage = useSelector((state: RootState) => state.comment.lastPage);

  const pageButtons = [...Array(totalPage + 1)].map((_, i) => i);

  const handlePageButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.name === "prev") dispatch(prevPage());
    if (target.name === "next") dispatch(nextPage());
  };

  return (
    <ul className="flex p-2 text-sm gap-3 justify-center">
      <button
        type="button"
        name="prev"
        disabled={currentPage < 2}
        onClick={handlePageButtons}
        className="btn bg-gray-300 disabled:text-gray-300"
      >{`<`}</button>
      {pageButtons.slice(firstPage, lastPage + 1).map((pageNumber, idx) => (
        <button
          onClick={() => dispatch(setCurrentPage(pageNumber))}
          key={idx}
          className={`${currentPage === pageNumber && "bg-slate-300"} btn `}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        name="next"
        disabled={currentPage === totalPage}
        onClick={handlePageButtons}
        className="btn bg-gray-300 disabled:text-gray-300"
      >{`>`}</button>
    </ul>
  );
};

export default Pagination;
