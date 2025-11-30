import Header from '@/components/header';
import QuotesTable from '@/components/quotes-table';
import QuotesTableSkeleton from '@/components/quotes-table-skeleton';
import { Suspense } from 'react';
import { getQuotes } from './actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const quotes = await getQuotes();

  return (
    <main className="flex min-h-screen flex-col items-center bg-foxdarkbg gap-16">
      <Header />
      <Suspense fallback={<QuotesTableSkeleton />}>
        <QuotesTable quotes={quotes ?? []} />
      </Suspense>
    </main>
  );
}
