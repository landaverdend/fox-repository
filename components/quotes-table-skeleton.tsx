export default function QuotesTableSkeleton() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="relative bg-gradient-to-br from-foxbg via-foxbg to-foxbg/90 p-6 rounded-2xl flex flex-col gap-4 shadow-md border border-foxlight/20 overflow-hidden"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Decorative quote mark skeleton */}
            <div className="absolute -top-2 -left-1 text-fox/5 text-8xl font-serif">"</div>

            {/* Quote content skeleton */}
            <div className="flex flex-col gap-3 flex-1 relative z-10">
              <div className="animate-pulse bg-foxlight/30 rounded-lg h-5 w-full"></div>
              <div className="animate-pulse bg-foxlight/30 rounded-lg h-5 w-11/12"></div>
              <div className="animate-pulse bg-foxlight/30 rounded-lg h-5 w-4/5"></div>
              <div className="animate-pulse bg-foxlight/30 rounded-lg h-5 w-2/3"></div>
            </div>

            {/* Footer skeleton */}
            <div className="w-full pt-4 border-t border-foxlight/20 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="animate-pulse bg-foxlight/20 rounded-full h-4 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="animate-pulse bg-foxlight/20 rounded-full h-4 w-16"></div>
                  <div className="animate-pulse bg-fox/20 rounded-full h-4 w-10"></div>
                </div>
              </div>
              <div className="flex gap-2 justify-center min-h-[32px]">
                <div className="animate-pulse bg-foxdark/20 rounded-full h-8 w-14"></div>
                <div className="animate-pulse bg-foxdark/20 rounded-full h-8 w-14"></div>
                <div className="animate-pulse bg-foxlight/30 rounded-full h-8 w-8"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
