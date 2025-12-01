'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DonateButton from './donate-button';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center text-slate mt-5 mx-4 sm:mx-20 md:mx-32 lg:mx-40 xl:mx-50">
      <div className="flex justify-start">
        <span className="block rounded-md relative mt-5 w-[300px] h-[450px] sm:w-[350px] sm:h-[500px] lg:w-[400px] lg:h-[600px]">
          <Image src="/fox_waving.png" alt="Fox" className="" fill />
        </span>
      </div>

      <div className="flex flex-col items-center justify-center mx-10 gap-8 sm:gap-16">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-4xl font-semibold sm:text-6xl lg:text-7xl text-center sm:text-left">The Fox Archive</h1>
          <p className="text-2xl lg:text-4xl text-left">
            An evolving repository of quotes from Ryan Fox: preserved, contextualized, and{' '}
            <i className="font-semibold">selected.</i>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className="bg-foxdark text-white text-semibold text-2xl px-4 py-2 rounded-md hover:bg-foxdark/80"
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
