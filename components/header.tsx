'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DonateButton from './donate-button';

export default function Header() {
  const router = useRouter();

  return (
    <div className="relative w-full">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-fox/5 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row-reverse items-center justify-center text-slate pt-8 pb-4 mx-4 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-40 relative">
        {/* Fox image with glow effect */}
        <div className="flex justify-start relative">
          <div className="absolute inset-0 bg-fox/20 blur-3xl rounded-full scale-75 translate-y-10" />
          <span className="block rounded-2xl relative mt-5 w-[260px] h-[390px] sm:w-[300px] sm:h-[450px] lg:w-[360px] lg:h-[540px]">
            <Image
              src="/fox_waving.png"
              alt="Fox mascot waving"
              className="drop-shadow-2xl object-contain"
              fill
              priority
            />
          </span>
        </div>

        <div className="flex flex-col items-center lg:items-start justify-center mx-6 lg:mx-12 gap-6 sm:gap-10">
          <div className="flex flex-col items-center lg:items-start justify-center gap-3">
            {/* Badge */}
            <div className="flex items-center gap-2 bg-fox/10 text-fox px-3 py-1 rounded-full text-sm font-medium mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Curated Collection</span>
            </div>

            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left tracking-tight bg-gradient-to-r from-slate via-foxdark to-slate bg-clip-text">
              The Fox Archive
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-center lg:text-left text-slate/70 leading-relaxed max-w-lg">
              An evolving repository of quotes from Ryan Fox: preserved, contextualized, and{' '}
              <span className="font-semibold italic text-fox">selected.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="group bg-gradient-to-r from-foxdark to-fox text-white font-semibold text-lg px-7 py-3.5 rounded-xl hover:from-fox hover:to-foxdark shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              onClick={() => {
                router.push('/add-quote');
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Quote
            </button>

            <DonateButton />
          </div>
        </div>
      </div>
    </div>
  );
}
