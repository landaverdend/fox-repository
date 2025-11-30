import prisma from '@/lib/prisma';
import AdminPendingTable from '@/app/(main)/admin/admin-pending-table';

export default async function AdminPage() {
  const pendingQuotes = await prisma?.pending_quotes.findMany({
    orderBy: { uploadedAt: 'desc' },
  });

  return (
    <div className="bg-foxdarkbg min-h-screen flex justify-center text-slate">
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-2xl font-bold">Pending Quotes</h1>
        <AdminPendingTable pendingQuotes={pendingQuotes} />
      </div>
    </div>
  );
}
