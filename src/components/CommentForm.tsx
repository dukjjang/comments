import { INPUTS } from "../constants/index";

const CommentForm = () => {
  return (
    <form className="flex flex-col px-5 gap-2 bg-white">
      {INPUTS.map((input) => {
        if (input.name === "content")
          return <textarea className="input" {...input} />;
        else return <input className="input" {...input} />;
      })}
      <button className="btn" type="submit">
        등록
      </button>
    </form>
  );
};

export default CommentForm;
