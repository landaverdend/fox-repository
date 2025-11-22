import Navbar from '@/components/navbar';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  metadataBase: new URL('https://postgres-prisma.vercel.app'),
  title: 'What did the fox say?',
  description: 'A repository of quotes from Ryan the Fox',
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
