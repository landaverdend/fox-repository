'use client';

import Header from '@/components/header';
import QuotesTable from '@/components/quotes-table';
import QuotesTableSkeleton from '@/components/quotes-table-skeleton';
import { useEffect, useState } from 'react';
import { getQuotes, SortOrder, SortBy } from './actions';
import { useClientToken } from '@/components/client-token-provider';
import { QuoteWithReactions } from '@/types/types';
export const dynamic = 'force-dynamic';

export default function Home() {
  const clientToken = useClientToken() ?? '';

  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState<QuoteWithReactions[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sortBy, setSortBy] = useState<SortBy>('date');

  useEffect(() => {
    if (!clientToken) return;

    setIsLoading(true);
    getQuotes(clientToken, sortOrder, sortBy)
      .then((quotes) => {
        setQuotes(quotes);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [clientToken, sortOrder, sortBy]);

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
      <div className={`flex flex-wrap items-center justify-center gap-3 px-4 transition-opacity duration-200 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
        <span className="text-slate/50 text-sm font-medium">Sort by:</span>

        {/* Sort field toggle */}
        <div className="flex rounded-full bg-foxbg/60 border border-foxlight/40 p-0.5 shadow-sm">
          <button
            onClick={() => setSortBy('date')}
            disabled={isLoading}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full transition-all duration-200 ${
              sortBy === 'date'
                ? 'bg-foxdark text-white shadow-sm'
                : 'text-slate/70 hover:text-slate'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Date</span>
          </button>
          <button
            onClick={() => setSortBy('reactions')}
            disabled={isLoading}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full transition-all duration-200 ${
              sortBy === 'reactions'
                ? 'bg-foxdark text-white shadow-sm'
                : 'text-slate/70 hover:text-slate'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Reactions</span>
          </button>
        </div>

        {/* Sort order toggle */}
        <button
          onClick={toggleSortOrder}
          disabled={isLoading}
          className="flex items-center gap-2 bg-foxbg/80 text-slate border border-foxlight/40 text-sm px-3 py-1.5 rounded-full hover:bg-foxbg hover:border-fox/40 transition-all duration-200 shadow-sm hover:shadow"
        >
          {sortOrder === 'desc' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fox" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="font-medium">{sortBy === 'date' ? 'Newest' : 'Most'}</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fox" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              <span className="font-medium">{sortBy === 'date' ? 'Oldest' : 'Least'}</span>
            </>
          )}
        </button>
      </div>

      {isLoading ? <QuotesTableSkeleton /> : <QuotesTable quotes={quotes ?? []} onReactionAdded={handleReactionAdded} />}
    </main>
  );
}
