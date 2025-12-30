'use client';

import Header from '@/components/header';
import QuotesTable from '@/components/quotes-table';
import QuotesTableSkeleton from '@/components/quotes-table-skeleton';
import { useEffect, useState } from 'react';
import { getQuotes, SortOrder } from './actions';
import { useClientToken } from '@/components/client-token-provider';
import { QuoteWithReactions } from '@/types/types';
export const dynamic = 'force-dynamic';

export default function Home() {
  const clientToken = useClientToken() ?? '';

  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState<QuoteWithReactions[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    if (!clientToken) return;

    setIsLoading(true);
    getQuotes(clientToken, sortOrder)
      .then((quotes) => {
        setQuotes(quotes);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [clientToken, sortOrder]);

  const handleReactionAdded = (quoteId: number, emoji: string, count: 1 | -1) => {
    setQuotes((prevQuotes) => {
      // Find the quote and update the reaction count.
      return prevQuotes.map((quote) => {
        let newQuote = quote;

        if (quote.id === quoteId) {
          // check if the reaction is already in the list
          const theReaction = quote.reactions.find((reaction) => reaction.emoji === emoji);

          if (theReaction) {
            newQuote = {
              ...quote,
              reactions: quote.reactions
                .map((reaction) =>
                  reaction.emoji === emoji ? { ...reaction, count: reaction.count + count, clientReacted: count === 1 } : reaction
                )
                .filter((reaction) => reaction.count > 0),
              canReact: count === 1 ? false : true,
            };
          } else {
            newQuote = {
              ...quote,
              reactions: [...quote.reactions, { emoji, count: 1, clientReacted: true }],
              canReact: false,
            };
          }
        }

        return newQuote;
      });
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-foxdarkbg to-foxdarkbg/90 gap-12">
      <Header />

      {/* Sort controls section */}
      <div className="flex items-center gap-3 px-4">
        <span className="text-slate/50 text-sm font-medium">Sort:</span>
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 bg-foxbg/80 text-slate border border-foxlight/40 text-sm px-4 py-2 rounded-full hover:bg-foxbg hover:border-fox/40 transition-all duration-200 shadow-sm hover:shadow"
        >
          {sortOrder === 'desc' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fox" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span className="font-medium">Newest first</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fox" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              <span className="font-medium">Oldest first</span>
            </>
          )}
        </button>
      </div>

      {isLoading ? <QuotesTableSkeleton /> : <QuotesTable quotes={quotes ?? []} onReactionAdded={handleReactionAdded} />}
    </main>
  );
}
