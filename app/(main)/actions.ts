'use server';

import prisma from '@/lib/prisma';
import { stackServerApp } from '@/stack/server';
import { QuoteWithReactions, Reaction } from '@/types/types';
import { headers } from 'next/headers';

// Combine the quote alongside reactions and variable that says whether the user can react to the quote.

export type SortOrder = 'asc' | 'desc';
export type SortBy = 'date' | 'reactions';

export async function getQuotes(
  clientToken: string,
  sortOrder: SortOrder = 'desc',
  sortBy: SortBy = 'date'
): Promise<QuoteWithReactions[]> {
  const user = await stackServerApp.getUser();
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
          userId: true,
        },
      },
    },
    // Always fetch, we'll sort in memory if sorting by reactions
    orderBy: { uploadedAt: 'desc' },
  });

  // Map the quotes to the QuoteWithReactions type
  const mappedQuotes = queryResult.map((quote) => {
    const reactionMap = new Map<string, number>();
    let canReact = true;

    let emojiClientReactedWith: string | undefined = undefined;
    quote.reactions.forEach((reaction) => {
      // Count reactions per emoji
      reactionMap.set(reaction.emoji, (reactionMap.get(reaction.emoji) || 0) + 1);

      // Check if this clientToken has already reacted
      if (reaction.clientToken === clientToken || reaction?.userId === user?.id) {
        canReact = false;
        emojiClientReactedWith = reaction.emoji;
      }
    });

    const reactions = Array.from(reactionMap.entries()).map(([emoji, count]) => ({
      emoji,
      count,
      clientReacted: emoji === emojiClientReactedWith ? true : undefined,
    }));

    return {
      id: quote.id,
      quote: quote.quote,
      uploadedAt: quote.uploadedAt,
      uploadedByName: quote.uploadedBy?.name ?? null,
      reactions,
      canReact,
    };
  });

  // Sort the quotes based on the sort parameters
  const sortedQuotes = mappedQuotes.sort((a, b) => {
    if (sortBy === 'reactions') {
      const aCount = a.reactions.reduce((sum, r) => sum + r.count, 0);
      const bCount = b.reactions.reduce((sum, r) => sum + r.count, 0);
      return sortOrder === 'desc' ? bCount - aCount : aCount - bCount;
    } else {
      // Sort by date
      const aDate = new Date(a.uploadedAt).getTime();
      const bDate = new Date(b.uploadedAt).getTime();
      return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
    }
  });

  return sortedQuotes;
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

  const headersList = await headers();
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

type RemoveReactionResponse = {
  success: boolean;
  message: string;
};
export async function removeReaction(clientToken: string, emoji: string, quoteId: number): Promise<RemoveReactionResponse> {
  const user = await stackServerApp.getUser();
  if (!clientToken && !user) {
    return { success: false, message: 'Missing client token or userId' };
  }

  // Use user id if available, otherwise use client token.
  let existingReaction = null;
  if (user) {
    existingReaction = await prisma.reactions.findFirst({
      where: { userId: user.id, quoteId, emoji },
    });
  }

  if (!existingReaction) {
    existingReaction = await prisma.reactions.findFirst({
      where: { clientToken, quoteId, emoji },
    });
  }

  if (!existingReaction) {
    return { success: false, message: 'No reaction found to remove' };
  }

  await prisma.reactions.delete({ where: { id: existingReaction.id } });

  return { success: true, message: '' };
}
