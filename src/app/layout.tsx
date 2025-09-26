import "./../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Bookshelf Quiz | Toss-style",
  description: "Three.js 기반 3D 책장 자격증 학습 앱 (Velog 연동)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
