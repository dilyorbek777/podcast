"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import PosterUploader from "@/components/PosterUploader";
import VideoUploader from "@/components/VideoUploader";

export default function NewEpisodePage() {
    const createEpisode = useMutation(api.episode.createEpisode);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [posterUrl, setPosterUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async () => {
        try {
            await createEpisode({
                title,
                description,
                posterUrl,
                videoUrl,
                category,
            });
            alert("Done successfully!"); // ✅ success message
            // Optional: reset form fields
            location.assign("/episodes/")
            setTitle("");
            setDescription("");
            setPosterUrl("");
            setVideoUrl("");
            setCategory("");
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="p-10 flex flex-col items-center justify-center h-screen w-full">

            <h1 className="text-3xl font-bold mb-6">
                Create Episode
            </h1>

            <input
                className="border p-2 mb-4 block px-5 py-3 border-primary rounded-sd w-[300px]"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="border p-2 mb-4 block px-5 py-3 border-primary rounded-sd w-[300px]"
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                className="border p-2 mb-4 block px-5 py-3 border-primary rounded-sd w-[300px]"
                placeholder="Category"
                required
                onChange={(e) => setCategory(e.target.value)}
            />

            <PosterUploader onUpload={setPosterUrl} />

            <VideoUploader onUpload={setVideoUrl} />

            <button
                onClick={handleSubmit}
                className="bg-black text-white  transition-all hover:bg-primary py-2 mt-6 px-5 border  border-primary rounded-sd w-[300px]"
            >
                Create Episode
            </button>

        </div>
    );
}