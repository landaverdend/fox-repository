'use client';

import Image from 'next/image';

export default function About() {
  return (
    <main className="flex flex-col items-center text-slate bg-foxdarkbg">
      <div className="flex flex-col items-center justify-center gap-5">
        <span className="bg-foxbg border-2 border-foxdark rounded-md relative w-[300px] h-[450px] mt-5">
          <Image src="/fox_standing.png" alt="Fox" className="" fill />
        </span>

        <h1 className="text-3xl font-bold text-center">About the Fox Archives</h1>
      </div>
    </main>
  );
}
