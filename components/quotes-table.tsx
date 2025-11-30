'use client';
import QuoteCard from './quote-card';
import { Quote } from '@/types/types';

type QuotesTableProps = {
  quotes: Quote[];
};
export default function QuotesTable({ quotes }: QuotesTableProps) {
  // Grab all of the quotes from the database

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4">
      {quotes.map((quote) => (
        <QuoteCard className="mx-5" key={quote.id} quote={quote} />
      ))}
    </div>
  );
}
