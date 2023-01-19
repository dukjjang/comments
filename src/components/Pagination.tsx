import { usePagination } from "hooks/usePagination";
import { RootState, useAppDispatch, useAppSelector } from "store";
import { nextPage, prevPage, setCurrentPage } from "store/commentSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();

  const { buttons, moveNextPage, movePrevPage, selected, isButtonDisabled } =
    usePagination();

  return (
    <ul className="flex p-2 text-sm gap-3 justify-center">
      <button
        type="button"
        name="prev"
        disabled={isButtonDisabled("prev")}
        onClick={movePrevPage}
        className="btn bg-gray-300 disabled:text-gray-300"
      >{`<`}</button>
      {buttons.map((page, idx) => (
        <button
          onClick={() => dispatch(setCurrentPage(page))}
          key={idx}
          className={`${selected(page)} btn `}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        name="next"
        disabled={isButtonDisabled("next")}
        onClick={moveNextPage}
        className="btn bg-gray-300 disabled:text-gray-300"
      >{`>`}</button>
    </ul>
  );
};

export default Pagination;
