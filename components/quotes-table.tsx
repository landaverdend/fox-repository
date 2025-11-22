import prisma from '@/lib/prisma';

export default async function QuotesTable() {

  // Grab all of the quotes from the database 
  const quotes = await prisma.quotes.findMany();


  return <div className="">The Quotes Are HEre:</div>;
}
