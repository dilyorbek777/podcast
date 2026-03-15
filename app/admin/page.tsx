import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-10 w-full h-screen flex items-center flex-col justify-center">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex flex-col gap-5">
        <p className="mt-4">
          Manage blogs and podcast episodes here.
        </p>
        <Link className="bg-primary px-5 rounded-sd py-4" href="admin/episodes/new">New episode</Link>
        <Link className="bg-primary px-5 rounded-sd py-4" href="admin/blogs/new">New Blog</Link>
      </div>
    </div>
  );
}