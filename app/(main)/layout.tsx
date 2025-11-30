import Navbar from '@/components/navbar';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { stackClientApp } from '../../stack/client';
import ClientTokenProvider from '@/components/client-token-provider';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        <ClientTokenProvider>
          <Navbar />
          {children}
        </ClientTokenProvider>
      </StackTheme>
    </StackProvider>
  );
}
