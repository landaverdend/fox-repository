'use server';

import prisma from '@/lib/prisma';
import { QuoteWithReactions } from '@/types/types';

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
    let canReact = false;

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
