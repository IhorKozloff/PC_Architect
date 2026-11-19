import { appConfig } from '@/config/app.config';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Layers, RefreshCw, Save } from 'lucide-react';

const featureIcons = { Layers, RefreshCw, Calculator, Save };

export function Features() {
  return (
    <section aria-labelledby="features-title" className="border-t border-white/10 bg-[#0c0f16]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">{appConfig.TEXT.LANDING.FEATURES.EYEBROW_TEXT}</p>
        <h2 id="features-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">{appConfig.TEXT.LANDING.FEATURES.MAIN_HEADING_TEXT}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">{appConfig.TEXT.LANDING.FEATURES.DESCRIPTION}</p>
        <ul className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {appConfig.TEXT.LANDING.FEATURES.ITEMS.map(({ iconName, title, description }) => {
            const Icon = featureIcons[iconName];
            return (
              <li key={title} className="min-w-0">
                <Card className="h-full border border-white/10 bg-[#111621] py-6 text-slate-100 ring-0">
                  <CardContent className="px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#22D3EE]/25 bg-[#22D3EE]/5 text-cyan-300"><Icon aria-hidden="true" className="size-5" strokeWidth={1.5} /></span>
                      <h3 className="min-w-0 text-lg font-medium">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
