import { useState, useEffect } from "react";
import { fetchBlogs } from "../api/github";

export const BlogList = ({ onSelect }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogList() {
      const list = await fetchBlogs();
      setBlogs(list);
    }
    fetchBlogList();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog List</h1>
      {blogs.map((blog) => (
        <button
          key={blog.path}
          className="block text-left py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 my-2"
          onClick={() => onSelect(blog)}
        >
          {blog.name.replace(".md", "")}
        </button>
      ))}
    </div>
  );
};