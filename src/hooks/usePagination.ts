import { useAppDispatch, useAppSelector } from "store";
import { nextPage, prevPage } from "store/commentSlice";

export const usePagination = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.comment.currentPage);
  const totalPage = useAppSelector((state) => state.comment.totalPage);
  const firstPage = useAppSelector((state) => state.comment.firstPage);
  const lastPage = useAppSelector((state) => state.comment.lastPage);

  const buttons = [...Array(totalPage + 1)]
    .map((_, i) => i)
    .slice(firstPage, lastPage + 1);

  const movePrevPage = () => {
    dispatch(prevPage());
  };

  const moveNextPage = () => {
    dispatch(nextPage());
  };

  const isButtonDisabled = (direction: string): boolean | undefined => {
    if (direction === "next") return currentPage === totalPage;
    if (direction === "prev") return currentPage < 2;

    return true;
  };

  const selected = (page: number) => {
    return currentPage === page && "bg-slate-300";
  };

  return { movePrevPage, moveNextPage, buttons, selected, isButtonDisabled };
};
