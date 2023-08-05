import { Suspense } from 'react';
import Loading from './loading';

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
