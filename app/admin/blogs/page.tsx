"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function BlogsPage() {
  const blogs = useQuery(api.blogs.getBlogs);
  const deleteBlog = useMutation(api.blogs.deleteBlog);

  if (!blogs) return (<div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 w-full h-screen absolute z-50">
    {/* Spinner Animation */}
    <div className="w-12 h-12 border-4 border-blue-200 border-t-primary-600 rounded-full animate-spin"></div>

    <p className="text-primary font-medium animate-pulse">
      Site is loading...
    </p>
  </div>);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border p-4 mb-4 flex justify-between"
        >
          <div>
            <h2 className="font-bold">{blog.title}</h2>
            <p>{blog.description}</p>
          </div>

          <button
            onClick={() => deleteBlog({ id: blog._id })}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}