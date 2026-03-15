"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import ImageUploader from "@/components/ImageUploader";

export default function NewBlogPage() {
    const createBlog = useMutation(api.blogs.createBlog);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async () => {
        try {
          await createBlog({
            title,
            description,
            imageUrl,
            category,
          });
          alert("Done successfully!"); // ✅ show success message
          location.assign("/blogs/")

          // Optional: reset form
          setTitle("");
          setDescription("");
          setImageUrl("");
          setCategory("");
        } catch (error) {
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      };

    return (
        <div className="p-10 flex items-center justify-center flex-col h-screen w-full">
            <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

            <input
                className="border  mb-4 block w-2xs rounded-sd py-4 px-5"
                placeholder="Title" required
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="border  mb-4 block w-2xs rounded-sd py-4 px-5"
                placeholder="Category" required
                onChange={(e) => setCategory(e.target.value)}
            />

            <textarea
                className="border  mb-4 block w-2xs rounded-sd py-4 px-5"
                placeholder="Description" required
                onChange={(e) => setDescription(e.target.value)}
            />

            <ImageUploader onUpload={setImageUrl} />

            <button
                onClick={handleSubmit}
                className="bg-black border-primary border text-white px-4 py-2 mt-4 w-2xs hover:bg-amber-600  rounded-sd  transition-all"
            >
                Create Blog
            </button>
        </div>
    );
}