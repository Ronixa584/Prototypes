import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { fetchBlogContent } from "../api/github";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/tokyo-night-dark.css"; // GitHub-like code block styling

export function BlogView({ blog }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadContent() {
      if (blog) {
        const data = await fetchBlogContent(blog.download_url);
        setContent(data);
      }
    }
    loadContent();
  }, [blog]);

  if (!blog) return <p>Select a blog to view its content.</p>;

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">
        {blog.name.replace(".md", "")}
      </h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        className="prose-invert"
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
