import { appConfig } from '@/config/app.config';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const content = appConfig.TEXT.LANDING.FINAL_CTA;

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-landing-background">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-landing-ice">{content.EYEBROW_TEXT}</p>
        <h2 id="final-cta-title" className="mt-3 text-3xl font-semibold tracking-tight text-landing-foreground sm:text-4xl">
          {content.MAIN_HEADING_TEXT}
        </h2>

        <div className="relative isolate mt-10 grid gap-4 sm:mt-12 sm:grid-cols-5 sm:gap-0">
          <div aria-hidden="true" className="pointer-events-none absolute top-7 bottom-[38px] left-[38px] -z-10 w-px bg-landing-border sm:inset-x-[10%] sm:top-[38px] sm:bottom-auto sm:h-px sm:w-auto" />
          <ol role="list" className="grid gap-4 sm:col-span-4 sm:grid-cols-subgrid sm:gap-0">
            {content.STEPS.map(({ number, label }) => (
              <li key={number} className="grid grid-cols-[76px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-none sm:justify-items-center">
                <span className="grid place-items-center sm:h-[76px]">
                  <span className="grid size-14 place-items-center rounded-full border border-landing-ice/55 bg-landing-surface font-mono text-base text-landing-ice">
                    {number}
                  </span>
                </span>
                <span className="text-sm text-landing-foreground">{label}</span>
              </li>
            ))}
          </ol>
          <Link href={appConfig.ROUTES.dashboard} className="group grid w-fit grid-cols-[76px_auto] items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-landing-ice sm:grid-cols-none sm:justify-self-center sm:justify-items-center">
            <span className="grid size-[76px] place-items-center rounded-full bg-landing-orange text-landing-background group-hover:bg-landing-orange-hover group-active:bg-landing-orange-hover motion-safe:transition-[background-color,scale] motion-safe:duration-200 motion-safe:group-hover:scale-105">
              <ArrowUpRight aria-hidden="true" className="size-7 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </span>
            <span className="text-sm font-semibold text-landing-orange">{content.CTA_BUTTON_MAIN}</span>
          </Link>
        </div>
        <p className="mt-8 text-base leading-relaxed text-landing-muted sm:mt-10">{content.DESCRIPTION}</p>
      </div>
    </section>
  );
}
