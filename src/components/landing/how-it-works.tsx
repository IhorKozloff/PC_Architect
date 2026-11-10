import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Cpu, Save } from 'lucide-react';

const steps = [
  { icon: Cpu, title: 'Choose your components', description: 'Sign in and pick parts across eight categories, from the processor to the cooling system.' },
  { icon: Calculator, title: 'Review your build', description: 'Check your selected models and see the total price update as you add or replace parts.' },
  { icon: Save, title: 'Give it a name. Save it.', description: 'Open the save dialog, name your configuration, and save it to your account.' },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="border-t border-white/10 bg-[#0c0f16]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">FROM IDEA TO CONFIGURATION</p>
        <h2 id="how-it-works-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">How It Works</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">Three steps to a build that starts with your choices.</p>
        <ol className="mt-10 grid min-w-0 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map(({ icon: Icon, title, description }, index) => (
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
          ))}
        </ol>
      </div>
    </section>
  );
}
