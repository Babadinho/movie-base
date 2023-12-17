/* eslint-disable @next/next/no-head-element */
import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SearchModal from '@/components/SearchModal';
import '@/styles/main.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Movie Base</title>
        <meta name="description" content="Movie Base movie database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Suspense fallback={<></>}>{<SearchModal />}</Suspense>
        <Header />
        <Suspense>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
