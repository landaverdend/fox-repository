'use client';

import { QuoteWithReactions } from '@/types/types';
import QuoteCard from './quote-card';

type QuotesTableProps = {
  quotes: QuoteWithReactions[];
  onReactionAdded: (quoteId: number, emoji: string, count: 1 | -1) => void;
};
export default function QuotesTable({ quotes, onReactionAdded }: QuotesTableProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4 mb-10">
      {quotes.map((quote) => (
        <QuoteCard className="mx-5" key={quote.id} quote={quote} onReactionAdded={onReactionAdded} />
      ))}
    </div>
  );
}
