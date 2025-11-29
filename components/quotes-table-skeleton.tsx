export default function QuotesTableSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4 w-full">
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} className="bg-foxbg p-4 rounded-md mx-5 flex flex-col gap-2">
          <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-4/5"></div>
          <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-3/5"></div>
        </div>
      ))}
    </div>
  );
}
