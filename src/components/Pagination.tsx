import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentPage, setPageSection } from "../store/comment/commentSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPage = useSelector((state: RootState) => state.comment.totalPage);
  const lastPage = useSelector((state: RootState) => state.comment.lastPage);
  const firstPage = useSelector((state: RootState) => state.comment.firstPage);
  const currentSection = useSelector(
    (state: RootState) => state.comment.currentSection
  );
  const totalSection = useSelector(
    (state: RootState) => state.comment.totalSection
  );

  const pageButtons = [...Array(totalPage + 1)].map((_, i) => i);

  return (
    <ul className="flex p-2 text-sm gap-3 justify-center">
      <button
        disabled={currentSection === 1 ? true : false}
        onClick={() => dispatch(setPageSection("prev"))}
        className="btn bg-gray-300 disabled:text-gray-300"
      >{`<`}</button>
      {pageButtons.slice(firstPage, lastPage + 1).map((pageNumber, idx) => (
        <button
          onClick={() => dispatch(setCurrentPage(pageNumber))}
          key={idx}
          className="btn "
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentSection < totalSection ? false : true}
        onClick={() => dispatch(setPageSection("next"))}
        className="btn bg-gray-300 disabled:text-gray-300"
      >{`>`}</button>
    </ul>
  );
};

export default Pagination;
