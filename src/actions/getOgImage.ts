"use server";

async function extractOgImage(
  url: string
): Promise<string | null> {
  const response = await fetch(url, {
    next: { revalidate: 86400 }, // Cache for 24 hours
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  });

  if (!response.ok) return null;

  const html = await response.text();

  const getAbsoluteUrl = (imgUrl: string) => {
    try {
      return new URL(imgUrl, url).toString();
    } catch {
      return imgUrl;
    }
  };

  // Match <meta property="og:image" content="..." />
  const matchAfter = html.match(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  if (matchAfter?.[1]) return getAbsoluteUrl(matchAfter[1]);

  // Match <meta content="..." property="og:image" />
  const matchBefore = html.match(
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i
  );
  if (matchBefore?.[1]) return getAbsoluteUrl(matchBefore[1]);

  return null;
}

export async function getOgImage(
  url: string,
  fallbackUrl?: string
): Promise<string | null> {
  if (!url) return null;

  // Try primary URL first
  try {
    const result = await extractOgImage(url);
    if (result) return result;
  } catch (error) {
    console.error("Failed to fetch OG image for:", url, error);
  }

  // Fallback to GitHub URL if provided and different
  if (fallbackUrl && fallbackUrl !== url) {
    try {
      const result = await extractOgImage(fallbackUrl);
      if (result) return result;
    } catch (err) {
      console.error("Failed to fetch OG image from fallback:", fallbackUrl, err);
    }
  }

  return null;
}
