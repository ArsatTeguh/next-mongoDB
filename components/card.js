import axios from "axios";
import React, { useState } from "react";

const Card = (props) => {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const { _id, title, author, content, comment, handleDeleteList } = props;

  const handleAddComment = async (id) => {
    const data = { user, text };

    try {
      await axios.post(`/api/comment/${id}`, data);
      setUser("");
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-3 px-4 py-4  relative shadow-md rounded border">
      <div className="flex flex-col gap-0">
        <p className="font-medium ">{title}</p>
        <p className="font-medium text-sm"> @{author} </p>
      </div>
      <p className=""> {content} </p>

      <div>
        <ul className="flex flex-col gap-1 h-36 overflow-y-auto p-2 bg-zinc-200">
          {comment.length === 0 && (
            <h3 className="text-center">Comment empty</h3>
          )}
          {comment?.map((item, index) => (
            <li
              key={index}
              className="flex   flex-col gap-0 border-2 p-2 bg-zinc-100"
            >
              <span className="font-medium"> {item.user} </span>
              <span> {item.text} </span>
            </li>
          ))}
        </ul>
        <div className="flex  w-full mt-2  justify-between">
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Your name"
            className="px-2 outline-none border rounde-md w-1/4"
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your Comment"
            className="px-2 outline-none border rounde-md w-1/2 "
          />

          <button
            onClick={() => handleAddComment(_id)}
            className=" px-2 py-2 text-sm rounded-md text-white font-medium bg-orange-600 "
          >
            add comment +
          </button>
        </div>
      </div>

      <button
        className="h-8 w-8 absolute top-1 right-1 bg-red-500 text-white text-center rounded-full"
        onClick={() => handleDeleteList(_id)}
      >
        X
      </button>
    </div>
  );
};

export default Card;
