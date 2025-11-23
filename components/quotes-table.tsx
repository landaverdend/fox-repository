import prisma from '@/lib/prisma';
import QuoteCard from './quote-card';

export default async function QuotesTable() {
  // Grab all of the quotes from the database
  const quotes = await prisma.quotes.findMany({
    orderBy: {
      uploadedAt: 'desc',
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4">
      {quotes.map(({ quote, id }) => (
        <QuoteCard key={id} quote={quote} className="mx-5" />
      ))}
    </div>
  );
}
