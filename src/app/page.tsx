// src/app/page.tsx

'use client';

export default function Home() {
  return (
    <div>
      <h1>게시글 목록</h1>
      <div>{process.env.NEXT_PUBLIC_API}</div>
    </div>
  );
}
