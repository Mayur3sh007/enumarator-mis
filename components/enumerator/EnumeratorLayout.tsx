'use client';

import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

interface EnumeratorLayoutProps {
  children: ReactNode;
}

export function EnumeratorLayout({ children }: EnumeratorLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <main className="pb-20 md:pb-8">{children}</main>
      <BottomNav />
    </div>
  );
}
