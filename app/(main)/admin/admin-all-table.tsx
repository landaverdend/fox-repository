'use client';
import { Quote } from '@/types/types';
import { deleteQuote } from './actions';
import { useRouter } from 'next/navigation';
import { MiniQuoteCard } from '@/components/quote-card';
import { parseQuote } from '@/lib/quoteParser';

type AATProps = {
  allQuotes: Quote[];
};

export default function AllQuotesTable({ allQuotes }: AATProps) {
  const router = useRouter();

  const handleDelete = async (quoteId: number) => {
    try {
      const response = await deleteQuote(quoteId);
      if (response) {
        router.refresh();
      }
    } catch (error) {
      alert('Failed to delete quote');
      console.error(error);
    }
  };

  return (
    <table className="w-3/4 text-sm sm:text-lg ">
      <thead>
        <tr className="text-left bg-foxdark">
          <th className="p-2">Quote</th>
          <th className="p-2">Uploaded By</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200 border-fox ">
        {allQuotes.length === 0 && (
          <tr>
            <td colSpan={3} className="text-center text-xl font-bold p-2">
              No quotes yet :(
            </td>
          </tr>
        )}

        {allQuotes.map((quote) => (
          <tr key={quote.id} className="text-sm sm:text-lg even:bg-gray-200 odd:bg-gray-300">
            <td className="p-2">
              <MiniQuoteCard parsedQuote={parseQuote(quote.quote)} />
            </td>
            <td className="p-2">{quote.uploadedBy?.name}</td>
            <td className="p-2">
              <button
                className="bg-red-400 text-white text-semibold text-1xl px-4 py-2 rounded-md hover:bg-red-400/80"
                onClick={() => handleDelete(quote.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
