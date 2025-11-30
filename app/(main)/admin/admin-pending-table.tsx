'use client';
import { ParsedQuote, parseQuote } from '@/lib/quoteParser';
import { PendingQuote } from '@/types/types';
import { MiniQuoteCard, QuoteCardContent } from '../../../components/quote-card';
import { approveQuote, rejectQuote } from './actions';
import { useRouter } from 'next/navigation';

type PQTProps = {
  pendingQuotes: PendingQuote[];
};

export default function AdminPendingTable({ pendingQuotes }: PQTProps) {
  const router = useRouter();

  const handleApprove = async (pendingQuoteId: number) => {
    try {
      const response = await approveQuote(pendingQuoteId);
      if (response) {
        router.refresh();
      }
    } catch (error) {
      alert('Failed to approve quote');
      console.error(error);
    }
  };

  const handleReject = async (pendingQuoteId: number) => {
    try {
      const response = await rejectQuote(pendingQuoteId);
      if (response) {
        router.refresh();
      }
    } catch (error) {
      alert('Failed to reject quote');
      console.error(error);
    }
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left bg-foxdark">
          <th className="p-2">Quote</th>
          <th className="p-2">IP</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200 border-fox">
        {pendingQuotes.length === 0 && (
          <tr>
            <td colSpan={3} className="text-center text-xl font-bold p-2">
              No pending quotes :)
            </td>
          </tr>
        )}
        {pendingQuotes.map((quote) => (
          <tr key={quote.id} className="text-sm sm:text-lg even:bg-gray-200 odd:bg-gray-300">
            <td className="p-2">
              <MiniQuoteCard parsedQuote={parseQuote(quote.quote)} />
            </td>
            <td className="p-2">{quote.ipAddress}</td>
            <td className="flex flex-col gap-2 sm:flex-row p-2">
              <button
                className="bg-green-400 text-white text-semibold text-1xl px-4 py-2 rounded-md hover:bg-green-400/80"
                onClick={() => handleApprove(quote.id)}>
                Approve
              </button>
              <button
                className="bg-red-400 text-white text-semibold text-1xl px-4 py-2 rounded-md hover:bg-red-400/80"
                onClick={() => handleReject(quote.id)}>
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
