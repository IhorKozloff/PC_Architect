import type { ReactNode } from 'react';
import Link from 'next/link';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full min-w-0 flex-1 items-center justify-center bg-[#0c0f16] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_65%)] px-5 py-12 text-slate-100 sm:px-8 sm:py-16">
      <div className="w-full min-w-0 max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">PC <span className="text-violet-400">Architect</span></Link>
          <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-cyan-300 sm:text-xs">YOUR NEXT BUILD STARTS HERE</p>
        </div>
        {children}
      </div>
    </main>
  );
}
