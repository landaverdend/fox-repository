'use client';

import Header from '@/components/header';
import QuotesTable from '@/components/quotes-table';
import QuotesTableSkeleton from '@/components/quotes-table-skeleton';
import { Suspense, useEffect, useState } from 'react';
import { getQuotes } from './actions';
import { Quote } from '@/types/types';
import { useClientToken } from '@/components/client-token-provider';
export const dynamic = 'force-dynamic';

export default function Home() {
  const clientToken = useClientToken() ?? '';

  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (!clientToken) return;

    setIsLoading(true);
    console.log('client token', clientToken);
    getQuotes(clientToken)
      .then((quotes) => {
        setQuotes(quotes);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [clientToken]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-foxdarkbg gap-16">
      <Header />
      {isLoading ? <QuotesTableSkeleton /> : <QuotesTable quotes={quotes ?? []} />}
    </main>
  );
}
