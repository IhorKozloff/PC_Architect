import type { ReactNode } from 'react';
import Link from 'next/link';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full min-w-0 flex-1 items-center justify-center bg-background px-5 py-12 text-foreground sm:px-8 sm:py-16">
      <div className="w-full min-w-0 max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">PC <span className="text-primary">Architect</span></Link>
          <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-accent sm:text-xs">YOUR NEXT BUILD STARTS HERE</p>
        </div>
        {children}
      </div>
    </main>
  );
}
