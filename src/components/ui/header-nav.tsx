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
            <Link href={session?.user ? '/dashboard' : '/'} className="rounded-sm text-lg font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-xl">PC <span className="text-primary">Architect</span></Link>
          </div>
          <div className="flex shrink-0 justify-end"><Button nativeButton={false} render={<Link href="/login" />} variant={'secondary'} size={'sm'} className="h-10 border border-accent bg-transparent px-4 text-foreground hover:bg-accent/10 active:bg-accent/15 focus-visible:border-accent focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none">
            Log In
          </Button></div>
        </div>}
      </>
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <div className="min-w-0">
        <Link href={session?.user ? '/dashboard' : '/'} className="rounded-sm text-lg font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-xl">PC <span className="text-primary">Architect</span></Link>
      </div>
      <div className="order-last col-span-2 min-w-0 lg:order-none lg:col-span-1">
        <ul className="grid w-full grid-cols-1 gap-1 rounded-xl border border-border bg-secondary p-1 sm:grid-cols-3">
          {[
            { href: '/dashboard', label: 'Create new build', icon: Plus },
            { href: '/builds', label: 'My builds', icon: LayoutList },
            { href: '/builds/explore', label: 'Public builds', icon: Users },
          ].map(({ href, label, icon: Icon }) => (
            <li key={href} className="min-w-0">
              <Link href={href} aria-current={pathname === href ? 'page' : undefined} className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent active:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:border-primary/25 aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary">
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
          className="h-10 border border-accent bg-secondary px-4 text-foreground hover:bg-accent/10 hover:text-accent active:bg-accent/15 focus-visible:border-accent focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
          onClick={() => logoutAction()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
