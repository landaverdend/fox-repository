'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useStackApp, useUser } from '@stackframe/stack';
import router from 'next/router';

type NavbarProps = {};
export default function Navbar({}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const stackApp = useStackApp();
  const user = useUser();

  const handleLogout = async () => {
    await stackApp.signOut();

    router.push('/');
  };

  return (
    <nav className="bg-fox w-full z-20 top-0 start-0 border-b border-default text-slate select-none">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link href="/" className="relative w-12 h-12 xs:w-[80px] xs:h-[65px] md:w-[128px] md:h-[110px]">
            <Image src="/fox.png" alt="Fox" className="bg-foxdark rounded-md" fill />
          </Link>
          <span className="self-center text-lg font-semibold md:text-4xl lg:text-5xl text-heading whitespace-nowrap">
            What Did the Fox Say?
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary">
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul
            className={`${
              isOpen ? 'bg-foxbg' : ''
            } font-medium flex flex-col p-4 md:p-0 mt-4 rounded-md border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary z-20 `}>
            <li>
              <MenuItem href="/">Home</MenuItem>
            </li>
            <li>
              <MenuItem href="/about" className="">
                About
              </MenuItem>
            </li>
            {user ? (
              <MenuItem href="/" onClick={handleLogout}>
                Logout
              </MenuItem>
            ) : (
              <MenuItem href="/handler/sign-up">Login</MenuItem>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

type MenuItemProps = {
  className?: string;
  href: string;
  children: React.ReactNode;

  onClick?: () => void;
};
function MenuItem({ className, href, children, onClick }: MenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${className} block py-2 px-3 text-heading md:text-2xl rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:opacity-40`}>
      {children}
    </Link>
  );
}
