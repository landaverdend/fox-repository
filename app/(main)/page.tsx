import Header from '@/components/header';
import QuotesTable from '@/components/quotes-table';
import QuotesTableSkeleton from '@/components/quotes-table-skeleton';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-foxdarkbg gap-16">
      <Header />
      <Suspense fallback={<QuotesTableSkeleton />}>
        <QuotesTable />
      </Suspense>
    </main>
  );
}
