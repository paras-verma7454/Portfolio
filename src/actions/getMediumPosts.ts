"use server";

import type { MediumPost } from "@/lib/medium";

export async function getMediumPosts(mediumUrl: string): Promise<MediumPost[]> {
  try {
    const username = mediumUrl.split("@")[1];
    if (!username) return [];

    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour server-side
    });
    const data = await response.json();

    if (data.status === "ok") {
      return data.items;
    }
    return [];
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}
