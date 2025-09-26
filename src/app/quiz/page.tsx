import { fetchVelogPosts } from "@/features/quiz/api/fetchVelog";
import { toQuizzes } from "@/features/quiz/utils/parser";
import { QuestionCard } from "@/features/quiz/components/QuestionCard";

export const dynamic = "force-dynamic";

export default async function QuizPage({ searchParams }: { searchParams: { subject?: string } }) {
  const username = process.env.VELOG_USERNAME || "YOUR_VELOG_ID";
  const posts = await fetchVelogPosts(username);
  const quizzes = toQuizzes(posts as any, searchParams.subject);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">🧠 카드 문제</h1>
      {quizzes.length === 0 ? (
        <p className="text-slate-600">가져온 문제가 없습니다. Velog 설정을 확인하세요.</p>
      ) : (
        <div className="space-y-6">
          {quizzes.map((q, i) => (
            <QuestionCard key={i} quiz={q} index={i+1} total={quizzes.length} />
          ))}
        </div>
      )}
    </main>
  );
}
