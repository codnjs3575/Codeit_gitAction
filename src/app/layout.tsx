// src/app/layout.tsx

import QueryProvider from '@/providers/QueryProvider';
import './globals.css';
import { initMocks } from '@/mocks';
import { MSWComponent } from '@/providers/MSWComponent';
import { SpeedInsights } from '@vercel/speed-insights/next';

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MSWComponent>
          <QueryProvider>{children}</QueryProvider>
        </MSWComponent>
        <SpeedInsights />
      </body>
    </html>
  );
}
