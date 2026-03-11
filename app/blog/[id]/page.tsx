import Image from "next/image";
import { Metadata } from "next";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  created_at: string;
  category: string;
}

async function getBlog(id: string): Promise<Blog> {
  const res = await fetch(`${process.env.API_URL}/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {

  const { id } = await params;
  const blog = await getBlog(id);

  return {
    title: blog.title,
    description: blog.description,

    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await getBlog(id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 my-20">

      {/* Category */}
      <span className="text-sm font-medium text-primary">
        {blog.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
        {blog.title}
      </h1>

      {/* Date */}
      <p className="text-gray-400 text-sm mt-3">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      {/* Image */}
      <div className="relative w-full h-[400px] mt-10 rounded-2xl overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mt-10 text-white">
        <p>{blog.description}</p>
      </div>

    </div>
  );
}