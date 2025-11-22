import Link from 'next/link';
import Image from 'next/image';

export default async function Navbar() {
  return (
    <div className="bg-foxdark min-w-screen flex items-center justify-between px-5">
      <span className="flex items-center gap-2">
        <Link href="/">
          <Image src="/fox.png" alt="Fox" width={120} height={120} className="" />
        </Link>
        <span className="text-4xl">What Did the Fox Say?</span>
      </span>

      <div className="flex items-center gap-4 text-2xl">
        <Link href="/" className="hover:opacity-40">
          Home
        </Link>
        <Link href="/about" className="hover:opacity-40">
          About
        </Link>
      </div>
    </div>
  );
}
