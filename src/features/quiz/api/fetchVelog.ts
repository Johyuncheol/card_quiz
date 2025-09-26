import Parser from "rss-parser";

type QuizPost = {
  title: string;
  link: string;
  content: string; // HTML (content:encoded)
};

export async function fetchVelogPosts(username: string): Promise<QuizPost[]> {
  const parser = new Parser({
    customFields: { item: [["content:encoded", "content"]] },
  });
  const feed = await parser.parseURL(`https://v2.velog.io/rss/${username}`);
  return (feed.items || []).map((item: any) => ({
    title: item.title || "",
    link: item.link || "",
    content: item.content || item["content:encoded"] || "",
  }));
}
