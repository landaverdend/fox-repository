import prisma from '@/lib/prisma';
import AdminPendingTable from '@/app/(main)/admin/admin-pending-table';
import AllQuotesTable from './admin-all-table';

export default async function AdminPage() {
  const [pendingQuotes, allQuotes] = await Promise.all([
    prisma.pending_quotes.findMany({
      orderBy: { uploadedAt: 'desc' },
    }),
    prisma.quotes.findMany({
      orderBy: { uploadedAt: 'desc' },
      include: {
        uploadedBy: true,
      },
    }),
  ]);

  return (
    <div className="bg-foxdarkbg min-h-screen flex justify-center text-slate">
      <div className="flex flex-col items-center mt-5 gap-20">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Pending Quotes</h1>
          <AdminPendingTable pendingQuotes={pendingQuotes} />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">All Quotes</h1>
          <AllQuotesTable allQuotes={allQuotes}></AllQuotesTable>
        </div>
      </div>
    </div>
  );
}
