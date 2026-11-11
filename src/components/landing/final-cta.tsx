import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="border-t border-white/10 bg-[#0c0f16]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-2xl border border-[#8B5CF6]/30 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_75%)] px-5 py-12 text-center sm:px-10 sm:py-16">
          <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">YOUR VISION. YOUR BUILD.</p>
          <h2 id="final-cta-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Ready to build beyond limits?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">Choose your components, review the total, and make your next PC your own.</p>
          <Button nativeButton={false} render={<Link href="/dashboard" />} className="mt-6 h-12 max-w-full gap-3 rounded-lg bg-[#8B5CF6] px-6 text-base text-white shadow-lg shadow-violet-500/20 hover:bg-[#7C3AED] focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60">
            Start Building <ArrowUpRight aria-hidden="true" className="size-5" />
          </Button>
          <p className="mt-4 text-xs text-slate-400">Sign in to create and save your build.</p>
        </div>
      </div>
    </section>
  );
}
