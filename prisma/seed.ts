import { UserRole } from '@prisma/client';
import prisma from '../lib/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function main() {
  // Read in quotes.txt
  const filePath = join(__dirname, 'quotes.txt');
  const fileContent = await readFile(filePath, 'utf-8');
  const quotes = fileContent.split('\n');

  const user = await prisma.users.upsert({
    where: { email: 'nicodemus.landaverde98@gmail.com' },
    update: {
      name: 'Nic',
      role: UserRole.ADMIN,
    },
    create: {
      name: 'Nic',
      email: 'nicodemus.landaverde98@gmail.com',
    },
  });

  const trimmedQuotes = quotes.map((q) => q.trim()).filter((q) => q !== '');

  // Fetch all existing quotes in one query
  const existingQuotes = await prisma.quotes.findMany({
    where: { quote: { in: trimmedQuotes } },
    select: { quote: true },
  });

  const existingSet = new Set(existingQuotes.map((eq) => eq.quote));
  const newQuotes = trimmedQuotes.filter((q) => !existingSet.has(q));

  // Batch create all new quotes
  if (newQuotes.length > 0) {
    await prisma.quotes.createMany({
      data: newQuotes.map((quote) => ({
        quote,
        uploadedById: user.id,
      })),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
