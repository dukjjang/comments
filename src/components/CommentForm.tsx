import { INPUTS } from "constants/index";
import { useComment } from "hooks/useComment";

const CommentForm = () => {
  const { onChange, onSubmit, inputValues } = useComment();
  return (
    <form onSubmit={onSubmit} className="flex flex-col p-1 pb-4 gap-2">
      {INPUTS.map((input) => {
        return input.name === "content" ? (
          <textarea
            onChange={onChange}
            key={input.name}
            value={inputValues[input.name]}
            className="input"
            {...input}
          />
        ) : (
          <input
            onChange={onChange}
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
