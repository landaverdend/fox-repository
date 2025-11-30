import { hashString } from '../lib/utils';
import prisma from '../lib/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function main() {
  // Read in quotes.txt
  const filePath = join(__dirname, 'quotes.txt');
  const fileContent = await readFile(filePath, 'utf-8');
  const quotes = fileContent.split('\n');

  // Find a user from neon_auth (users are managed by Neon Auth, not Prisma)
  const user = await prisma.neon_auth_users.findFirst({
    where: {
      email: 'nicodemus.landaverde98@gmail.com',
    },
  });

  if (!user) {
    console.error('User not found in neon_auth.users_sync. Make sure the user exists in Neon Auth first.');
    return;
  }

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
        quoteHash: hashString(quote),
      })),
    });
  }

  // Create dummy pending quotes:
  let pendingQuotes = ['This is a pending quote', 'This is another pending quote', 'This is a third pending quote'];

  const existingPendingQuotes = await prisma.pending_quotes.findMany({
    where: { quote: { in: pendingQuotes } },
    select: { quote: true },
  });

  const existingPendingSet = new Set(existingPendingQuotes.map((eq) => eq.quote));
  const newPendingQuotes = pendingQuotes.filter((q) => !existingPendingSet.has(q));

  if (newPendingQuotes.length > 0) {
    await prisma.pending_quotes.createMany({
      data: newPendingQuotes.map((quote) => ({
        quote,
        quoteHash: hashString(quote),
        ipAddress: '127.0.0.1',
      })),
    });
  }

  // Create test reactions:

  const quoteEntities = await prisma.quotes.findMany({
    select: { id: true },
    take: 10,
  });

  const reactionEmojis = ['👍', '👎', '😂', '🤔', '🤮', '🤢', '🤡', '🤠', '🤡', '🤡'];
  await prisma.reactions.createMany({
    data: quoteEntities.map((quote, i) => ({
      quoteId: quote.id,
      emoji: reactionEmojis[i % reactionEmojis.length],
      ipAddress: '127.0.0.1',
      clientToken: `test-client-token-${i}`,
    })),
  });
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
