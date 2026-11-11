import { Card, CardContent } from '@/components/ui/card';
import { componentCategories } from '@/lib/constants';
import { Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Server, Zap, type LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Server, Zap,
};

export function Components() {
  return (
    <section aria-labelledby="components-title" className="border-t border-white/10 bg-[#0c0f16]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-cyan-300">EVERY PART HAS A PLACE</p>
        <h2 id="components-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Components</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">Explore the eight categories that bring your next PC together.</p>
        <ul className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {componentCategories.map(({ id, name, icon }) => {
            const Icon = categoryIcons[icon] ?? Cpu;

            return (
              <li key={id} className="min-w-0">
                <Card className="h-full border border-white/10 bg-[#111621] py-6 text-slate-100 ring-0">
                  <CardContent className="flex items-center gap-4 px-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-violet-300">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="min-w-0 break-words text-lg font-medium">{name}</h3>
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
