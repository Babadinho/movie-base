/* eslint-disable @next/next/no-head-element */
import '@/styles/main.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Movie Base</title>
        <meta name="description" content="Welcome to Axbridge Partners" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
