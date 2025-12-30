'use client';

import { QuoteWithReactions } from '@/types/types';
import QuoteCard from './quote-card';

type QuotesTableProps = {
  quotes: QuoteWithReactions[];
  onReactionAdded: (quoteId: number, emoji: string, count: 1 | -1) => void;
};
export default function QuotesTable({ quotes, onReactionAdded }: QuotesTableProps) {
  if (quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-slate/40 text-lg">No quotes yet</div>
        <div className="text-slate/30 text-sm mt-1">Be the first to add one!</div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} onReactionAdded={onReactionAdded} />
        ))}
      </div>
    </div>
  );
}
