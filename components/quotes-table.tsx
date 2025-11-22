import prisma from '@/lib/prisma';
import QuoteCard from './quote-card';

export default async function QuotesTable() {
  // Grab all of the quotes from the database
  const quotes = await prisma.quotes.findMany();

  return (
    <div className="">
      {quotes.map(({ quote, id }) => (
        <QuoteCard key={id} quote={quote} />
      ))}
    </div>
  );
}
