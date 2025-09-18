// src/app/api/sentry-webhook/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
  await fetch('<discord 웹훅 URL>', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: 'Discord 알림 테스트',
      username: 'Alert Bot',
      embeds: [
        {
          title: '알림 제목',
          description: '알림 설명',
          fields: [
            {
              name: '알림 필드 이름',
              value: '알림 필드 값',
              inline: true,
            },
            {
              name: '알림 필드 이름',
              value: '알림 필드 값',
              inline: true,
            },
          ],
          color: 255,
        },
      ],
    }),
  });
  return NextResponse.json({ message: 'Webhook received' });
}
