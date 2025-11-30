import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await stackServerApp.getUser();

  if (!user || !(await user.hasPermission('admin'))) {
    redirect('/');
  }

  return (
    <div className="bg-foxdarkbg min-h-screen">
      <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
    </div>
  );
}
