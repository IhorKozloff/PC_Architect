'use client';

import { getTabValue } from '@/lib/utils';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { Button } from './button';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { LayoutList, Plus, Users } from 'lucide-react';
import { logoutAction } from '@/app/login/actions';
import { TypographyH3 } from './typography-h3';

interface IProps {
  session: Session | null
}
export function HeaderNav({ session }: IProps) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  if (!session || !session.user) {
    return (
      <>
        {pathname !== '/login' && <div className="grid grid-cols-3 items-center gap-4">
          <div className="shrink-0">
            <TypographyH3>
              <Link href={session?.user ? '/dashboard' : '/'}>PC Architect</Link>
            </TypographyH3>
          </div>
          <div></div>
          <div className="flex justify-end"><Button variant={'secondary'} size={'sm'} type={'button'}>
            <Link href={'/login'}>Log In</Link>
          </Button></div>
        </div>}
      </>
    );
  }

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div className="shrink-0">
        <TypographyH3>
          <Link href={session?.user ? '/dashboard' : '/'}>PC Architect</Link>
        </TypographyH3>
      </div>
      <div className="flex justify-center">
        <Tabs value={tabValue} className="w-fit">
          <TabsList>
            <TabsTrigger value="dashboard" className="px-2">
              <Plus className="h-4 w-4" />
              <Link href="/dashboard">Create new build</Link>
            </TabsTrigger>

            <TabsTrigger value="builds" className="px-2">
              <LayoutList className="h-4 w-4" />
              <Link href="/builds">My builds</Link>
            </TabsTrigger>

            <TabsTrigger value="explore" className="px-2">
              <Users className="h-4 w-4" />
              <Link href="/builds/explore">Public builds</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button
          variant={'secondary'}
          size={'sm'}
          type={'button'}
          onClick={() => logoutAction()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}