// src/app/page.tsx
'use client';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80">
        <button
          onClick={() => {
            throw new Error('에러 버튼 클릭 sentry 테스트');
          }}
        >
          에러 발생시키
        </button>
      </div>
    </div>
  );
}
