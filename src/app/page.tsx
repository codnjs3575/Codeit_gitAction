// src/app/page.tsx

'use client';
import { Button } from 'devcw-storybook-design-system';

export default function Home() {
  const a = 1;

  return (
    <div>
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          alert('버튼 클릭');
        }}
      >
        안녕
      </Button>
    </div>
  );
}
