import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Layers, RefreshCw, Save } from 'lucide-react';

const features = [
  { icon: Layers, title: 'Eight component categories', description: 'Choose your CPU, graphics card, motherboard, RAM, storage, power supply, case, and cooling.' },
  { icon: RefreshCw, title: 'Swap parts as you go', description: 'Change a selected component from its category dialog while keeping the rest of your configuration.' },
  { icon: Calculator, title: 'A total that keeps up', description: 'See individual component prices and a running total based on the parts in your current build.' },
  { icon: Save, title: 'Save your configuration', description: 'Give your build a name and save the selected components and total price to your account.' },
];

export function Features() {
  return (
    <section aria-labelledby="features-title" className="border-t border-white/10 bg-[#0c0f16]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">BUILT AROUND YOUR CHOICES</p>
        <h2 id="features-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Features</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">The essentials for putting your next PC together, one component at a time.</p>
        <ul className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
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
          ))}
        </ul>
      </div>
    </section>
  );
}
