import { RootState, useAppDispatch, useAppSelector } from "store";
import { nextPage, prevPage, setCurrentPage } from "store/comment/commentSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.comment.currentPage);
  const totalPage = useAppSelector((state) => state.comment.totalPage);
  const firstPage = useAppSelector((state) => state.comment.firstPage);
  const lastPage = useAppSelector((state) => state.comment.lastPage);

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
