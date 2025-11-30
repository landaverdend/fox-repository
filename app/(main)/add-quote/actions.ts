'use server';
import { stackServerApp } from '@/stack/server';
import prisma from '@/lib/prisma';

export async function saveQuoteToDB(serializedQuote: string) {
  const user = await stackServerApp.getUser();
  const canWrite = user && (await user.hasPermission('admin'));

  if (canWrite) {
    await prisma.quotes.create({
      data: {
        quote: serializedQuote,
        uploadedById: user.id,
      },
    });

    return 'Successfully saved to Quotes DB';
  } else {
    console.log('User cannot write');
    return 'Your quote submission will be reviewed by an admin';
  }
}
