'use client';

import { getTabValue } from '@/lib/utils';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { Button } from './button';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { LayoutList, Plus, Users } from 'lucide-react';
import { logoutAction } from '@/app/login/actions';

interface IProps {
  session: Session | null
}
export function HeaderNav({ session }: IProps) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  if (!session || !session.user) {
    return (
      <>
        {pathname !== '/login' && <div className="flex min-w-0 items-center justify-between gap-4">
          <div className="min-w-0">
            <Link href={session?.user ? '/dashboard' : '/'} className="rounded-sm text-lg font-semibold tracking-tight text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:text-xl">PC <span className="text-violet-400">Architect</span></Link>
          </div>
          <div className="flex shrink-0 justify-end"><Button nativeButton={false} render={<Link href="/login" />} variant={'secondary'} size={'sm'} className="h-10 border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 text-violet-200 hover:bg-[#8B5CF6]/20 focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none">
            Log In
          </Button></div>
        </div>}
      </>
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <div className="min-w-0">
        <Link href={session?.user ? '/dashboard' : '/'} className="rounded-sm text-lg font-semibold tracking-tight text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:text-xl">PC <span className="text-violet-400">Architect</span></Link>
      </div>
      <div className="order-last col-span-2 min-w-0 lg:order-none lg:col-span-1">
        <Tabs value={tabValue} className="w-full min-w-0 lg:w-fit">
          <TabsList aria-label="Build navigation" className="grid h-auto! w-full grid-cols-1 gap-1 rounded-xl border border-white/10 bg-[#111621] p-1 sm:grid-cols-3 [&_[data-slot=tabs-trigger]]:h-auto [&_[data-slot=tabs-trigger]]:min-h-10 [&_[data-slot=tabs-trigger]]:text-slate-400 [&_[data-slot=tabs-trigger]]:hover:text-cyan-300 [&_[data-slot=tabs-trigger]]:data-active:border-violet-400/30 [&_[data-slot=tabs-trigger]]:data-active:bg-[#8B5CF6]/15 [&_[data-slot=tabs-trigger]]:data-active:text-violet-200 [&_[data-slot=tabs-trigger]]:focus-visible:ring-cyan-300/60 [&_[data-slot=tabs-trigger]]:motion-reduce:transition-none [&_a]:rounded-sm [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-cyan-300">
            <TabsTrigger value="dashboard" className="px-3 py-2">
              <Plus aria-hidden="true" className="h-4 w-4" />
              <Link href="/dashboard" className="py-1">Create new build</Link>
            </TabsTrigger>

            <TabsTrigger value="builds" className="px-3 py-2">
              <LayoutList aria-hidden="true" className="h-4 w-4" />
              <Link href="/builds" className="py-1">My builds</Link>
            </TabsTrigger>

            <TabsTrigger value="explore" className="px-3 py-2">
              <Users aria-hidden="true" className="h-4 w-4" />
              <Link href="/builds/explore" className="py-1">Public builds</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button
          variant={'secondary'}
          size={'sm'}
          type={'button'}
          className="h-10 border border-white/15 bg-[#111621] px-4 text-slate-200 hover:bg-[#1b2233] hover:text-cyan-300 focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none"
          onClick={() => logoutAction()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
