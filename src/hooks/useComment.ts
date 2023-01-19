import { SystemError } from "interfaces";
import { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { editComment, setInputValues } from "store/commentSlice";
import {
  deleteComment,
  fetchComments,
  postComment,
  putComment,
} from "store/commentSlice/actions";

export const useComment = () => {
  const dispatch = useAppDispatch();
  const inputValues = useAppSelector((state) => state.comment.inputValues);
  const countOfCommentInPage = useAppSelector(
    (state) => state.comment.countOfCommentInPage
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setInputValues({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (inputValues.id === -1)
        await dispatch(postComment(inputValues)).unwrap();
      else await dispatch(putComment(inputValues)).unwrap();
      await dispatch(fetchComments({ currentPage: 1, countOfCommentInPage }));
    } catch (error) {
      const e = error as SystemError;
      alert(`데이터 요청에 실패하였습니다 ${e.message}`);
    }
  };

  const handleEdit = (id: number) => {
    dispatch(editComment(id));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      try {
        await dispatch(deleteComment(id)).unwrap();
        await dispatch(fetchComments({ currentPage: 1, countOfCommentInPage }));
      } catch (error) {
        const e = error as SystemError;
        alert(`삭제요청이 실패하였습니다 ${e.message}`);
      }
    } else {
      return;
    }
  };

  return {
    onEdit: handleEdit,
    onDelete: handleDelete,
    onChange: handleChange,
    onSubmit: handleSubmit,
    inputValues,
  };
};
