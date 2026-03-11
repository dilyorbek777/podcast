import { episodes } from "../data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const blog = episodes.find((b) => b.id === id);

  if (!blog) {
    return Response.json({ message: "Episode not found" }, { status: 404 });
  }

  return Response.json(blog);
}