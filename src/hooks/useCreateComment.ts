import { SystemError } from "interfaces";
import { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { setInputValues } from "store/commentSlice";
import { postComment, putComment } from "store/commentSlice/actions";

export const useCreateComment = () => {
  const dispatch = useAppDispatch();
  const inputValues = useAppSelector((state) => state.comment.inputValues);

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
    } catch (error) {
      const e = error as SystemError;
      alert(`데이터 요청에 실패하였습니다 ${e.message}`);
    }
  };

  return { onChange: handleChange, onSubmit: handleSubmit, inputValues };
};
