import { UserRole } from '@prisma/client';
import prisma from '../lib/prisma';

async function main() {
  const response = await Promise.all([
    await prisma.users.upsert({
      where: { email: 'nicodemus.landaverde98@gmail.com' },
      update: {
        name: 'Nic',
        role: UserRole.ADMIN,
      },
      create: {
        name: 'Nic',
        email: 'nicodemus.landaverde98@gmail.com',
      },
    }),

    await prisma.quotes.upsert({
      where: { id: 1 },
      update: {
        quote: `Why can't it be up syndrome?`,
      },
      create: {
        quote: `Why can't it be up syndrome?`,
        uploadedBy: { connect: { email: 'nicodemus.landaverde98@gmail.com' } },
        uploadedAt: new Date(),
      },
    }),
  ]);
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
