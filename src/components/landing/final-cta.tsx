import { appConfig } from '@/config/app.config';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="border-t border-white/10 bg-[#0c0f16]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-2xl border border-[#8B5CF6]/30 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_75%)] px-5 py-12 text-center sm:px-10 sm:py-16">
          <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">{appConfig.TEXT.LANDING.FINAL_CTA.EYEBROW_TEXT}</p>
          <h2 id="final-cta-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">{appConfig.TEXT.LANDING.FINAL_CTA.MAIN_HEADING_TEXT}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">{appConfig.TEXT.LANDING.FINAL_CTA.DESCRIPTION}</p>
          <Button nativeButton={false} render={<Link href={appConfig.ROUTES.dashboard} />} className="mt-6 h-12 max-w-full gap-3 rounded-lg bg-[#7C3AED] px-6 text-base text-white shadow-lg shadow-violet-500/20 hover:bg-[#6D28D9] focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none motion-reduce:active:translate-y-0">
            {appConfig.TEXT.LANDING.FINAL_CTA.CTA_BUTTON_MAIN} <ArrowUpRight aria-hidden="true" className="size-5" />
          </Button>
          <p className="mt-4 text-xs text-slate-400">{appConfig.TEXT.LANDING.FINAL_CTA.SIGN_IN_TEXT}</p>
        </div>
      </div>
    </section>
  );
}
