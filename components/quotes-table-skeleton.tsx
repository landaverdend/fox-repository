export default function QuotesTableSkeleton() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="bg-gradient-to-br from-foxbg to-foxbg/80 p-5 rounded-xl flex flex-col gap-4 shadow-md border border-foxlight/30">
            {/* Quote content skeleton */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="animate-pulse bg-foxlight/40 rounded-lg h-4 w-full"></div>
              <div className="animate-pulse bg-foxlight/40 rounded-lg h-4 w-full"></div>
              <div className="animate-pulse bg-foxlight/40 rounded-lg h-4 w-4/5"></div>
              <div className="animate-pulse bg-foxlight/40 rounded-lg h-4 w-3/5"></div>
            </div>

            {/* Footer skeleton */}
            <div className="w-full pt-3 border-t border-foxlight/30">
              <div className="flex items-center justify-between mb-3">
                <div className="animate-pulse bg-foxlight/30 rounded h-3 w-20"></div>
                <div className="animate-pulse bg-foxlight/30 rounded h-3 w-16"></div>
              </div>
              <div className="flex gap-1.5 justify-center">
                <div className="animate-pulse bg-foxlight/40 rounded-full h-7 w-12"></div>
                <div className="animate-pulse bg-foxlight/40 rounded-full h-7 w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
