import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '../../../prisma/prisma';
import { TypographyH3 } from '@/components/ui/typography-h3';
import { BuildCard } from './components/BuildCard';

export default async function MyBuilds() {
  const session = await auth();

  if (!session?.user.id) {
    redirect('/login');
  };
  const builds = await prisma.build.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { email: true } },
      components: {
        include: {
          component: {
            select: {
              name: true,
              type: true,
              price: true
            }
          }
        }
      }
    }
  });
  return (
    <div className="py-6">
      <TypographyH3>My builds</TypographyH3>
      <br />
      <div className="grid gap-4 lg:grid-cols-3">
        {builds.length > 0 && builds.map((item) => {
          return <BuildCard key={item.id} build={item}></BuildCard>;
        })}
      </div>

      {builds.length === 0 && <p className="text-foreground">No saved builds yet</p>}
    </div>
  );
}