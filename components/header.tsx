'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center text-slate mt-5">
      <span className=" bg-foxdarkbg relative w-[300px] h-[450px] ">
        <Image src="/fox_standing.png" alt="Fox" className="" fill />
      </span>

      <div className="flex flex-col items-center justify-center mx-10 gap-5 ">
        <h1 className="text-6xl lg:text-8xl">The Fox Archives</h1>
        <p className="text-2xl lg:text-4xl">An ongoing collection of quotes from Mr. Ryan Fox</p>
        <button
          className="bg-foxdark text-white px-4 py-2 rounded-md hover:bg-foxdark/80"
          onClick={() => {
            router.push('/add-quote');
          }}>
          Add Quote
        </button>
      </div>
    </div>
  );
}
