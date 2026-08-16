export type PrDetails = {
  title: string;
  status: "open" | "closed" | "merged";
};

export async function getPrDetails(
  prUrl: string
): Promise<PrDetails | null> {
  try {
    const urlObj = new URL(prUrl);
    const parts = urlObj.pathname.split("/");
    const owner = parts[1];
    const repoName = parts[2];
    const number = parts[4];

    if (!owner || !repoName || !number) return null;

    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/pulls/${number}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 86400 },
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-Site/1.0",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();

    const title = data?.title;
    if (!title) return null;

    const status: PrDetails["status"] = data.merged_at
      ? "merged"
      : data.state === "open"
        ? "open"
        : "closed";

    return { title, status };
  } catch {
    return null;
  }
}
