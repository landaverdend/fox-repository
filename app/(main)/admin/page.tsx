'use server';

export default async function AdminPage() {
  const pendingQuotes = await prisma?.pending_quotes.findMany({
    orderBy: { uploadedAt: 'desc' },
  });

  return (
    <div className="bg-foxdarkbg min-h-screen flex justify-center text-slate">
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-2xl font-bold">Pending Quotes</h1>

        <table className="w-full">
          <thead>
            <tr className="text-left bg-foxdark">
              <th className="p-2">Quote</th>
              <th className="p-2">IP</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 border-fox">
            {pendingQuotes?.map((quote) => {
              return (
                <tr key={quote.id} className="">
                  <td className="p-2">{quote.quote}</td>
                  <td className="p-2">{quote.ipAddress}</td>
                  <td className="flex flex-col gap-2 sm:flex-row p-2">
                    <button className="bg-green-400 text-white text-semibold text-1xl px-4 py-2 rounded-md hover:bg-green-400/80">
                      Approve
                    </button>
                    <button className="bg-red-400 text-white text-semibold text-1xl px-4 py-2 rounded-md hover:bg-red-400/80">
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
