'use client';

import { EnumeratorProvider } from '@/contexts/EnumeratorContext';

export default function EnumeratorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EnumeratorProvider>{children}</EnumeratorProvider>;
}
