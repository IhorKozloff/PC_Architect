import { Card, CardContent } from '@/components/ui/card';
import { appConfig } from '@/config/app.config';
import { Calculator, Cpu, Save } from 'lucide-react';

const icons = { Cpu, Calculator, Save };
const content = appConfig.TEXT.LANDING.HOW_IT_WORKS;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="border-t border-white/10 bg-[#0c0f16]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">{content.EYEBROW_TEXT}</p>
        <h2 id="how-it-works-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">{content.MAIN_HEADING_TEXT}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">{content.DESCRIPTION}</p>
        <ol className="mt-10 grid min-w-0 gap-4 md:grid-cols-3 md:gap-6">
          {content.STEPS.map(({ iconName, title, description }, index) => {
            const Icon = icons[iconName];
            return (
              <li key={title} className="min-w-0">
                <Card className="h-full border border-white/10 bg-[#111621] py-6 text-slate-100 ring-0">
                  <CardContent className="px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-violet-300"><Icon aria-hidden="true" className="size-5" strokeWidth={1.5} /></span>
                      <h3 className="min-w-0 flex-1 text-lg font-medium">{title}</h3>
                      <span aria-hidden="true" className="shrink-0 font-mono text-3xl text-violet-300/60">0{index + 1}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
