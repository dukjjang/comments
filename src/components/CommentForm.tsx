import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { INPUTS } from "../constants/index";
import { InputValues } from "../interfaces";
import { AppDispatch } from "../store";
import { postComment } from "../store/commentSlice";

const CommentForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValues, setInputValues] = useState<InputValues>({
    profile_url: "",
    author: "",
    content: "",
    createdAt: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(postComment(inputValues));
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
