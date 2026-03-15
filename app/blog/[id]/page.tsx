import Image from "next/image";
import { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error(
    "NEXT_PUBLIC_CONVEX_URL is not defined. Add it to your .env file and restart the server."
  );
}

// -----------------------------
// 2️⃣ Create server-side Convex client
// -----------------------------
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// -----------------------------
// 3️⃣ Fetch blog from Convex
// -----------------------------
async function getBlog(id: string) {
  const blog = await convex.query(api.blogs.getBlog, {
    id: id as unknown as Id<"blogs">,
  });

  if (!blog) return null;

  return blog;
}

// -----------------------------
// 4️⃣ Metadata for SEO / social
// -----------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {

  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) return { title: "Blog not found" };

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.imageUrl
        ? [
          {
            url: blog.imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ]
        : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.imageUrl ? [blog.imageUrl] : [],
    },
  };
}

// -----------------------------
// 5️⃣ Blog page component
// -----------------------------
export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const { id } = await params;

  const blog = await getBlog(id);

  if (!blog) {
    return <div className="text-center py-20">Blog not found</div>;
  }



  return (
    <div className="max-w-4xl mx-auto px-6 py-16 my-20">
      <span className="text-sm font-medium text-primary">
        {blog.category}
      </span>

      <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
        {blog.title}
      </h1>

      <p className="text-gray-400 text-sm mt-3">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {blog.imageUrl && (
        <div className="relative w-full h-[400px] mt-10 rounded-2xl overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none mt-10 text-white">
        <p>{blog.description}</p>
      </div>
    </div>
  );
}