'use server';

import prisma from '@/lib/prisma';

export async function getQuotes() { 
 
  const quotes = await prisma?.quotes.findMany({
    include: {
      uploadedBy: true,
    },
    orderBy: { uploadedAt: 'desc' },
  });

  return quotes;
}
