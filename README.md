# 3D Bookshelf Quiz (Toss-style)

Next.js + TypeScript + Three.js + Velog RSS 로 만드는 **자격증 학습 앱** MVP.

## ✨ 특징
- 3D 책장에서 과목 선택 (Three.js)
- Velog 글을 RSS로 가져와 카드 퀴즈로 변환
- Toss 스타일의 미니멀 UI (Tailwind)
- 진행률 간단 추적 (Zustand)

## 🚀 시작하기
```bash
npm install
cp .env.example .env   # VELOG_USERNAME 설정
npm run dev
```
- `http://localhost:3000/bookshelf` : 3D 책장
- `http://localhost:3000/quiz` : 카드 문제

## 📝 Velog 작성 포맷 (예시)
Velog 글의 본문에 아래 **Frontmatter** + 내용(이미지 포함)을 넣으면 파서가 인식합니다.

```markdown
---
subject: SQLD
question: 아래 중 정규화의 목적은?
options:
  - 데이터 무결성 향상
  - 중복 허용
  - 성능 저하
  - 데이터 분산
answer: 0
explanation: 정규화는 중복을 제거하고 이상현상을 방지하여 무결성을 높입니다.
---

![문제 이미지](https://images.velog.io/your-image.png)
```

## 📁 폴더 구조
- `src/app/bookshelf/page.tsx` : Three.js 씬 (책 클릭 → 퀴즈로 이동)
- `src/app/quiz/page.tsx` : Velog → 카드를 렌더
- `src/features/quiz/api/fetchVelog.ts` : RSS 가져오기
- `src/features/quiz/utils/parser.ts` : 글 → 퀴즈 데이터 변환
- `src/features/quiz/components/QuestionCard.tsx` : 카드 UI
- `src/features/quiz/store/useProgress.ts` : 진행률 상태

## 🧩 확장 아이디어
- 관리자 페이지로 직접 문제 등록/수정
- 사용자별 진행률/랭킹 서버 저장 (Prisma/SQLite)
- CMS(WordPress/Sanity)로 전환해 구조화 강화
# card_quiz
# card_quiz
