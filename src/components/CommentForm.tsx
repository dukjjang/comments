import { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INPUTS } from "../constants/index";
import { SystemError } from "../interfaces";
import { AppDispatch, RootState } from "../store";
import { setInputValues } from "../store/comment/commentSlice";
import { postComment, putComment } from "../store/comment/commentThunks";

const CommentForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputValues = useSelector(
    (state: RootState) => state.comment.inputValues
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
    } catch (error) {
      const e = error as SystemError;
      alert(`데이터 요청에 실패하였습니다 ${e.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-1 pb-4 gap-2">
      {INPUTS.map((input) => {
        return input.name === "content" ? (
          <textarea
            onChange={handleChange}
            key={input.name}
            value={inputValues[input.name]}
            className="input"
            {...input}
          />
        ) : (
          <input
            onChange={handleChange}
            value={inputValues[input.name]}
            key={input.name}
            className="input"
            {...input}
          />
        );
      })}
      <button className="btn w-14 text-sm" type="submit">
        등록
      </button>
    </form>
  );
};

export default CommentForm;
