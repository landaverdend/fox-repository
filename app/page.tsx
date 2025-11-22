import QuotesTable from '@/components/quotes-table';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-foxbg">
      <QuotesTable />
    </main>
  );
}
