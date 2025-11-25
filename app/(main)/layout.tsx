import Navbar from '@/components/navbar';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { stackClientApp } from '../../stack/client';
import { Suspense } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StackProvider app={stackClientApp}>
        <StackTheme>
          <Navbar />
          {children}
        </StackTheme>
      </StackProvider>
    </Suspense>
 
  );
}
