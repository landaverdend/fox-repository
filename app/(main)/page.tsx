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
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-foxdarkbg via-foxdarkbg to-foxdarkbg/95">
      <Header />

      {/* Quotes section */}
      <section className="w-full flex flex-col items-center gap-6 py-8">
        {/* Section header with decorative line */}
        <div className="flex items-center gap-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foxlight/40 to-foxlight/40" />
          <h2 className="text-slate/40 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Quotes
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-foxlight/40 to-foxlight/40" />
        </div>

        {/* Sort controls */}
        <div className={`flex flex-wrap items-center justify-center gap-3 px-4 transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Sort field toggle */}
          <div className="flex rounded-full bg-foxbg/70 backdrop-blur-sm border border-foxlight/30 p-1 shadow-sm">
            <button
              onClick={() => setSortBy('date')}
              disabled={isLoading}
              className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                sortBy === 'date'
                  ? 'bg-gradient-to-r from-foxdark to-fox text-white shadow-md'
                  : 'text-slate/60 hover:text-slate hover:bg-foxbg/50'
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
              className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                sortBy === 'reactions'
                  ? 'bg-gradient-to-r from-foxdark to-fox text-white shadow-md'
                  : 'text-slate/60 hover:text-slate hover:bg-foxbg/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">Popular</span>
            </button>
          </div>

          {/* Sort order toggle */}
          <button
            onClick={toggleSortOrder}
            disabled={isLoading}
            className="flex items-center gap-2 bg-foxbg/70 backdrop-blur-sm text-slate border border-foxlight/30 text-sm px-4 py-2 rounded-full hover:bg-foxbg hover:border-fox/30 transition-all duration-200 shadow-sm hover:shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 text-fox transition-transform duration-300 ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <span className="font-medium">
              {sortBy === 'date'
                ? sortOrder === 'desc' ? 'Newest first' : 'Oldest first'
                : sortOrder === 'desc' ? 'Most popular' : 'Least popular'}
            </span>
          </button>
        </div>

        {/* Quotes grid */}
        <div className="w-full mt-2">
          {isLoading ? <QuotesTableSkeleton /> : <QuotesTable quotes={quotes ?? []} onReactionAdded={handleReactionAdded} />}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto border-t border-foxlight/20">
        <div className="text-center text-slate/40 text-sm">
          Made with care for the Fox community
        </div>
      </footer>
    </main>
  );
}
