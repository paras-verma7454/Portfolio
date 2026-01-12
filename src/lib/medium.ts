export interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: any;
  categories: string[];
}

export const fetchMediumPosts = async (mediumUrl: string): Promise<MediumPost[]> => {
  try {
    const username = mediumUrl.split("@")[1];
    if (!username) return [];
    
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status === "ok") {
      return data.items;
    }
    return [];
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
};
