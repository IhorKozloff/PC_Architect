import { appConfig } from '@/config/app.config';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="border-t border-landing-border bg-landing-background">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-2xl border border-transparent landing-cta-panel px-5 py-12 text-center sm:px-10 sm:py-16">
          <p className="font-mono text-xs tracking-[0.18em] text-landing-ice">{appConfig.TEXT.LANDING.FINAL_CTA.EYEBROW_TEXT}</p>
          <h2 id="final-cta-title" className="mt-3 text-3xl font-semibold tracking-tight text-landing-foreground sm:text-4xl">{appConfig.TEXT.LANDING.FINAL_CTA.MAIN_HEADING_TEXT}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-landing-muted">{appConfig.TEXT.LANDING.FINAL_CTA.DESCRIPTION}</p>
          <Button nativeButton={false} render={<Link href={appConfig.ROUTES.dashboard} />} className="mt-6 h-12 max-w-full gap-3 rounded-lg bg-landing-orange px-6 text-base text-landing-background shadow-lg shadow-landing-orange/20 hover:bg-landing-orange-hover active:bg-landing-orange-hover focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-ice motion-reduce:transition-none motion-reduce:active:translate-y-0">
            {appConfig.TEXT.LANDING.FINAL_CTA.CTA_BUTTON_MAIN} <ArrowUpRight aria-hidden="true" className="size-5" />
          </Button>
          <p className="mt-4 text-xs text-landing-muted">{appConfig.TEXT.LANDING.FINAL_CTA.SIGN_IN_TEXT}</p>
        </div>
      </div>
    </section>
  );
}
