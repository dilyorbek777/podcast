import { episodes } from "./data";

export async function GET() {
  return Response.json(episodes);
}
