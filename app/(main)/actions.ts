'use server';

import prisma from '@/lib/prisma';
import { stackServerApp } from '@/stack/server';
import { QuoteWithReactions, Reaction } from '@/types/types';
import { headers } from 'next/headers';

// Combine the quote alongside reactions and variable that says whether the user can react to the quote.

export async function getQuotes(clientToken: string): Promise<QuoteWithReactions[]> {
  // Grab all the quotes from the database.
  const queryResult = await prisma.quotes.findMany({
    include: {
      uploadedBy: {
        select: {
          name: true,
        },
      },
      reactions: {
        select: {
          emoji: true,
          clientToken: true,
        },
      },
    },
    orderBy: { uploadedAt: 'desc' },
  });

  // Map the quotes to the QuoteWithReactions type
  return queryResult.map((quote) => {
    const reactionMap = new Map<string, number>();
    let canReact = true;

    quote.reactions.forEach((reaction) => {
      // Count reactions per emoji
      reactionMap.set(reaction.emoji, (reactionMap.get(reaction.emoji) || 0) + 1);

      // Check if this clientToken has already reacted
      if (reaction.clientToken === clientToken) {
        canReact = false;
      }
    });

    const reactions = Array.from(reactionMap.entries()).map(([emoji, count]) => ({
      emoji,
      count,
    }));

    return {
      ...{
        id: quote.id,
        quote: quote.quote,
        uploadedAt: quote.uploadedAt,
        uploadedByName: quote.uploadedBy?.name ?? null,
      },
      reactions,
      canReact,
    };
  });
}

type AddReactionResponse = {
  success: boolean;
  message: string;
  createdReaction?: Reaction;
};
export async function addReaction(clientToken: string, emoji: string, quoteId: number): Promise<AddReactionResponse> {
  const user = await stackServerApp.getUser();

  if (!clientToken && !user) {
    return { success: false, message: 'Missing client token' };
  }

  // Use user id if available, otherwise use client token.
  const existingReaction = user
    ? await prisma.reactions.findFirst({ where: { userId: user.id, quoteId } })
    : await prisma.reactions.findFirst({ where: { clientToken, quoteId } });

  if (existingReaction) {
    return { success: false, message: 'Already reacted to this quote...' };
  }

  const headersList = headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const ipAddress = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';

  const newReaction = await prisma.reactions.create({
    data: {
      quoteId,
      emoji,
      ipAddress,
      clientToken,
      userId: user?.id ?? null,
    },
  });

  return { success: true, message: '', createdReaction: newReaction };
}
