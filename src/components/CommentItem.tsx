const CommentItem = () => {
  return (
    <li className=" p-3 px-5 border-b  ">
      <div className="flex">
        <img
          className=" rounded-full mr-3"
          src="https://picsum.photos/id/1/50/50"
          alt="profile"
        />
        <h2 className="flex items-center ">abc_123</h2>
        <span className="w-full h-[30%] text-end ">2023-01-17</span>
      </div>
      <p className=" "> next.js 좀 알려주세요</p>
      <div className="flex w-full justify-end">
        <button className="btn">수정</button>
        <button className="btn">삭제</button>
      </div>
    </li>
  );
};

export default CommentItem;
