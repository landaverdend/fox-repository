'use client';

import Header from '@/components/header';
import QuotesTable from '@/components/quotes-table';
import QuotesTableSkeleton from '@/components/quotes-table-skeleton';
import { useEffect, useState } from 'react';
import { getQuotes } from './actions';
import { useClientToken } from '@/components/client-token-provider';
import { QuoteWithReactions } from '@/types/types';
export const dynamic = 'force-dynamic';

export default function Home() {
  const clientToken = useClientToken() ?? '';

  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState<QuoteWithReactions[]>([]);

  useEffect(() => {
    if (!clientToken) return;

    setIsLoading(true);
    getQuotes(clientToken)
      .then((quotes) => {
        setQuotes(quotes);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [clientToken]);

  const handleReactionAdded = (quoteId: number, emoji: string, count: 1 | -1) => {
    setQuotes((prevQuotes) => {
      // Find the quote and update the reaction count.
      return prevQuotes.map((quote) => {
        if (quote.id === quoteId) {
          const theReaction = quote.reactions.find((reaction) => reaction.emoji === emoji);

          if (theReaction) {
            return {
              ...quote,
              reactions: quote.reactions.map((reaction) =>
                reaction.emoji === emoji ? { ...reaction, count: reaction.count + count } : reaction
              ),
              canReact: count === 1 ? false : true,
            };
          } else {
            return {
              ...quote,
              reactions: [...quote.reactions, { emoji, count: 1 }],
              canReact: false,
            };
          }
        }
        return quote;
      });
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-foxdarkbg gap-16">
      <Header />
      {isLoading ? <QuotesTableSkeleton /> : <QuotesTable quotes={quotes ?? []} onReactionAdded={handleReactionAdded} />}
    </main>
  );
}
