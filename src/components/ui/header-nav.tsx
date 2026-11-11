'use client';

import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { Button } from './button';
import Link from 'next/link';
import { LayoutList, Plus, Users } from 'lucide-react';
import { logoutAction } from '@/app/login/actions';

interface IProps {
  session: Session | null
}
export function HeaderNav({ session }: IProps) {
  const pathname = usePathname();

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
        <ul className="grid w-full grid-cols-1 gap-1 rounded-xl border border-white/10 bg-[#111621] p-1 sm:grid-cols-3">
          {[
            { href: '/dashboard', label: 'Create new build', icon: Plus },
            { href: '/builds', label: 'My builds', icon: LayoutList },
            { href: '/builds/explore', label: 'Public builds', icon: Users },
          ].map(({ href, label, icon: Icon }) => (
            <li key={href} className="min-w-0">
              <Link href={href} aria-current={pathname === href ? 'page' : undefined} className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 aria-[current=page]:border-violet-400/30 aria-[current=page]:bg-[#8B5CF6]/15 aria-[current=page]:text-violet-200">
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
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
