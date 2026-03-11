import { NextResponse } from "next/server";

export async function GET() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || "local";
  return NextResponse.json(
    { commitSha },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}

