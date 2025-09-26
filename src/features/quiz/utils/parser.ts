import matter from "gray-matter";

export type QuizOption = {
  raw: string; // HTML 또는 텍스트 그대로 저장
};

export type QuizData = {
  subject: string;
  question: string;
  options: QuizOption[];
  answer: number; // index
  explanation: string;
  image?: string | null;
};

type Post = { title: string; link: string; content: string };

export function parseQuizPost(htmlContent: string): QuizData | null {
  // 1. YAML 코드블록 먼저 확인
  const codeMatch = htmlContent.match(
    /<pre><code class="language-yaml">([\s\S]*?)<\/code><\/pre>/i
  );

  if (codeMatch) {
    try {
      const yamlBlock = codeMatch[1]
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");

      const { data } = matter(`---\n${yamlBlock}\n---`);
      const options = Array.isArray(data.options)
        ? (data.options as string[]).map((o) => ({ raw: o }))
        : [];

      return {
        subject: data.subject || "기타",
        question: data.question || "",
        options,
        answer: Number(data.answer ?? 0),
        explanation: data.explanation || "",
        image: extractImage(htmlContent),
      };
    } catch (e) {
      console.error("YAML parse error", e);
    }
  }

  // 2. fallback (frontmatter or 일반 HTML 파싱)
  const fmMatch = htmlContent.match(/---[\s\S]*?---/);
  const mdForMatter = fmMatch ? fmMatch[0] + "\n" : "";

  try {
    const { data } = matter(mdForMatter + "\n" + stripHtml(htmlContent));
    const question = (data as any).question || firstParagraphText(htmlContent);
    const options = ((data as any).options || extractListText(htmlContent)).map(
      (o: string) => ({ raw: o })
    );
    const answer = Number((data as any).answer ?? 0);
    const explanation =
      (data as any).explanation || extractExplanation(htmlContent);
    const subject = (data as any).subject || "기타";
    const image = extractImage(htmlContent);

    if (!question || options.length === 0) return null;
    return { subject, question, options, answer, explanation, image };
  } catch {
    return null;
  }
}

export function toQuizzes(posts: Post[], subject?: string): QuizData[] {
  return posts
    .map((p) => parseQuizPost(p.content))
    .filter((q): q is QuizData => !!q)
    .filter((q) => (subject ? q.subject === subject : true));
}

// ===== helpers =====

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "\n");
}

function extractImage(html: string) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function firstParagraphText(html: string) {
  const m = html.match(/<p>(.*?)<\/p>/i);
  return m ? m[1] : "";
}

function extractListText(html: string) {
  const ul = html.match(/<ul>([\s\S]*?)<\/ul>/i);
  if (!ul) return [];
  const items = [...ul[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => m[1]);
  return items
    .map((s) => s.trim()) // HTML 유지 (이미지 태그 포함)
    .filter(Boolean);
}

function extractExplanation(html: string) {
  // "explanation:" 이라는 패턴 잡기
  const m = html.match(/explanation:\s*([^\n<]+)/i);
  if (m) return m[1].trim();
  const idx = html.toLowerCase().indexOf("해설");
  if (idx >= 0) return stripHtml(html.substring(idx)).trim().slice(0, 500);
  return "";
}
