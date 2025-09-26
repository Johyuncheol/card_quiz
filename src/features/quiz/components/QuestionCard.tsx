"use client";

import { useState } from "react";
import { QuizData } from "../utils/parser";
import { useProgress } from "../store/useProgress";
import clsx from "clsx";

export function QuestionCard({
  quiz,
  index,
  total,
}: {
  quiz: QuizData;
  index: number;
  total: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const { addResult } = useProgress();

  const onChoose = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    addResult(i === quiz.answer);
  };

  return (
    <article className="toss-card p-6">
      <header className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500">{quiz.subject}</span>
        <span className="text-sm text-slate-500">
          {index} / {total}
        </span>
      </header>

      {quiz.image && (
        <img
          src={quiz.image}
          alt="문제 이미지"
          className="rounded-xl mb-4 border"
        />
      )}

      <h2 className="text-lg font-semibold mb-3">{quiz.question}</h2>

      <ul className="space-y-2">
        {quiz.options.map((opt, i) => {
          const isCorrect = i === quiz.answer;
          const isSelected = selected === i;
          return (
            <li key={i}>
              <button
                onClick={() => onChoose(i)}
                className={clsx(
                  "w-full text-left p-3 rounded-xl border transition",
                  !revealed && "hover:bg-slate-50",
                  revealed && isCorrect && "bg-green-50 border-green-300",
                  revealed &&
                    isSelected &&
                    !isCorrect &&
                    "bg-red-50 border-red-300"
                )}
              >
                {/*  HTML 옵션 지원 */}
                <span dangerouslySetInnerHTML={{ __html: opt.raw }} />
              </button>
            </li>
          );
        })}
      </ul>

      {revealed && (
        <p className="mt-3 text-slate-600">
          해설: {quiz.explanation || "해설이 없습니다."}
        </p>
      )}
    </article>
  );
}
