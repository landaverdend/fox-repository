import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await stackServerApp.getUser();

  if (!user || !(await user.hasPermission('admin'))) {
    redirect('/');
  }

  return (
    <div className="bg-foxdarkbg">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-foxdarkbg">Loading</div>}>{children}</Suspense>
    </div>
  );
}
