import { INPUTS } from "../constants/index";

const CommentForm = () => {
  return (
    <form className="flex flex-col p-5 gap-2 bg-white">
      {INPUTS.map((input) => {
        if (input.name === "content")
          return <textarea key={input.name} className="input" {...input} />;
        else return <input key={input.name} className="input" {...input} />;
      })}
      <button className="btn w-14 text-sm" type="submit">
        등록
      </button>
    </form>
  );
};

export default CommentForm;
