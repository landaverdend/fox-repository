'use server';

import prisma from '@/lib/prisma';
import { stackServerApp } from '@/stack/server';

export async function approveQuote(pendingQuoteId: number) {
  const user = await stackServerApp.getUser();

  if (!user || !(await user.hasPermission('admin'))) {
    return false;
  }

  const pendingQuote = await prisma.pending_quotes.findUnique({
    where: { id: pendingQuoteId },
  });

  if (!pendingQuote) {
    return false;
  }

  await prisma.quotes.create({
    data: {
      quote: pendingQuote.quote,
      quoteHash: pendingQuote.quoteHash,
      uploadedById: user?.id || '',
      uploadedAt: pendingQuote.uploadedAt,
    },
  });

  await prisma.pending_quotes.delete({
    where: { id: pendingQuoteId },
  });

  return true;
}

export async function rejectQuote(pendingQuoteId: number) {
  const user = await stackServerApp.getUser();

  if (!user || !(await user.hasPermission('admin'))) {
    return false;
  }

  await prisma.pending_quotes.delete({
    where: { id: pendingQuoteId },
  });

  return true;
}

export async function deleteQuote(quoteId: number) {
  const user = await stackServerApp.getUser();

  if (!user || !(await user.hasPermission('admin'))) {
    return false;
  }

  await prisma.quotes.delete({
    where: { id: quoteId },
  });

  return true;
}
