import { UserRole } from '@prisma/client';
import prisma from '../lib/prisma';

async function main() {
  const response = await Promise.all([
    await prisma.users.create({
      data: {
        name: 'Nic',
        email: 'nicodemus.landaverde98@gmail.com',
        role: UserRole.ADMIN,
      },
    }),

    await prisma.quotes.create({
      data: {
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
