import { NextResponse } from "next/server";
import { fetchMediumPosts } from "@/lib/medium";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediumUrl = searchParams.get("url");

  if (!mediumUrl) {
    return NextResponse.json({ posts: [] }, { status: 200 });
  }

  const posts = await fetchMediumPosts(mediumUrl);
  return NextResponse.json({ posts }, { status: 200 });
}

