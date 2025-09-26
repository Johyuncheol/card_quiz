import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          3D 책장 기반 자격증 학습 앱
        </h1>
        <p className="text-slate-600 mt-2">
          Toss 스타일의 미니멀 UI. 책을 클릭하면 카드 문제를 풉니다.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/bookshelf" className="toss-card p-8 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold">📚 3D 책장</h2>
          <p className="text-slate-600 mt-2">Three.js 씬에서 책을 선택해 시작</p>
        </Link>

        <Link href="/quiz" className="toss-card p-8 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold">🧠 카드 문제 바로 시작</h2>
          <p className="text-slate-600 mt-2">Velog에서 불러온 문제로 퀴즈 풀기</p>
        </Link>
      </div>

      <footer className="mt-12 text-slate-500">
        <p>
          Velog 연동 가이드: <code>src/features/quiz/api/fetchVelog.ts</code> 의 사용자명을 바꾸세요.
        </p>
      </footer>
    </main>
  );
}
