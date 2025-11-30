'use server';
import { stackServerApp } from '@/stack/server';
import prisma from '@/lib/prisma';
import { hashString } from '@/lib/utils';
import { headers } from 'next/headers';

export async function saveQuoteToDB(serializedQuote: string) {
  const user = await stackServerApp.getUser();
  const canWrite = user && (await user.hasPermission('admin'));

  const quoteHash = hashString(serializedQuote);

  const existingQuote = await prisma.quotes.findFirst({
    where: { quoteHash },
  });

  if (existingQuote) {
    return 'Quote already exists';
  }

  if (canWrite) {
    await prisma.quotes.create({
      data: {
        quote: serializedQuote,
        uploadedById: user.id,
        quoteHash: hashString(serializedQuote),
      },
    });

    return 'Successfully saved to Quotes DB';
  } else {
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';

    await prisma.pending_quotes.create({
      data: {
        quote: serializedQuote,
        quoteHash: hashString(serializedQuote),
        ipAddress: ipAddress,
      },
    });

    return 'Your quote submission will be reviewed by an admin';
  }
}
