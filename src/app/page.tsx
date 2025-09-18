// src/app/page.tsx

'use client';

import * as Sentry from '@sentry/nextjs';

export default function Home() {
  return (
    <div>
      <h1>Sentry 알림 테스트</h1>
      <button
        onClick={() => {
          Sentry.captureException(new Error('Route Handler 에러'));
        }}
      >
        에러 발생
      </button>
    </div>
  );
}
