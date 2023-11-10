import Card from "@/components/card";
import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleGetAllList = async () => {
    try {
      const list = await axios.get("/api/article");
      setList(list.data.articles);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateList = async (e) => {
    e.preventDefault();
    const data = { title, content, author };

    try {
      await axios.post("/api/article", data);
      setTitle("");
      setAuthor("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await axios.delete(`/api/article/${id}`);
      alert("delete success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllList();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form
        onSubmit={handleUpdateList}
        className="px-7 w-10/12 py-6 border-2 shadow-lg rounded"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            <label className="text-md font-medium">Title</label>
            <input
              className="py-2 px-2 rounded outline-none"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-md font-medium">Autor</label>
            <input
              className="py-2 px-2 rounded outline-none"
              placeholder="Enter your title"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-md font-medium">Content</label>
            <input
              className="py-2 px-2 rounded outline-none"
              placeholder="Enter your title"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-2 font-medium shadow-md bg-green-600 text-white rounded  text-md  "
            type="submit"
          >
            Add Article +
          </button>
        </div>
      </form>
      <br />
      <br />
      <div className="w-1/2 flex flex-col gap-4">
        {list?.map((item, index) => (
          <Card key={index} {...item} handleDeleteList={handleDeleteList} />
        ))}
      </div>
    </main>
  );
}
