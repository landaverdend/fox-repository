'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DonateButton from './donate-button';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center text-slate mt-8 mx-4 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-40">
      <div className="flex justify-start">
        <span className="block rounded-2xl relative mt-5 w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] lg:w-[380px] lg:h-[570px] drop-shadow-xl">
          <Image src="/fox_waving.png" alt="Fox" className="drop-shadow-2xl" fill priority />
        </span>
      </div>

      <div className="flex flex-col items-center lg:items-start justify-center mx-6 lg:mx-12 gap-8 sm:gap-12">
        <div className="flex flex-col items-center lg:items-start justify-center gap-4">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left tracking-tight">
            The Fox Archive
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-center lg:text-left text-slate/80 leading-relaxed max-w-xl">
            An evolving repository of quotes from Ryan Fox: preserved, contextualized, and{' '}
            <span className="font-semibold italic text-fox">selected.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="bg-foxdark text-white font-semibold text-lg px-6 py-3 rounded-xl hover:bg-fox shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => {
              router.push('/add-quote');
            }}>
            Add Quote
          </button>

          <DonateButton />
        </div>
      </div>
    </div>
  );
}
