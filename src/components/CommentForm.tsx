import { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INPUTS } from "../constants/index";
import { AppDispatch, RootState } from "../store";
import { postComment, putComment, setInputValues } from "../store/commentSlice";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValues.id === -1) dispatch(postComment(inputValues));
    else dispatch(putComment(inputValues));
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
