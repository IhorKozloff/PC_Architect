import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Calculator, Cpu, Save } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { appConfig } from '@/config/app.config';

const featureIcons = { Cpu, Calculator, Save };

function CalloutLine({ position }: { position: 'below-right' | 'below-left' | 'above-right' }) {
  const above = position === 'above-right';
  const left = position === 'below-left';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute h-[clamp(48px,10vw,110px)] w-[75%] overflow-visible fill-none text-cyan-300 ${above ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'} ${left ? 'right-1/2' : 'left-1/2'}`}
    >
      <path
        d={above ? 'M 0 100 V 88 L 96 4' : left ? 'M 100 0 V 12 L 4 96' : 'M 0 0 V 12 L 96 96'}
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={left ? 4 : 96} cy={above ? 4 : 96} r="2.5" fill="currentColor" />
    </svg>
  );
}
function PcPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-[605px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 inset-y-24 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[clamp(496px,59.8svh+128px,703px)]">
        <div className="absolute inset-x-[8%] top-[15%] bottom-[15%]">
          <Image
            src="/hero-pc-cutout.png"
            alt={appConfig.TEXT.LANDING.HERO.MAIN_IMG_ALT}
            fill
            priority
            sizes="(min-width: 1440px) 508px, (min-width: 1024px) 37vw, (min-width: 488px) 376px, 84vw"
            className="object-contain drop-shadow-[0_20px_35px_rgba(139,92,246,0.15)]"
          />
        </div>
        <div className="absolute top-[11%] left-[8%] max-w-[41%] border-l border-violet-400/60 pl-2 sm:pl-3">
          <p className="font-mono text-[9px] tracking-widest text-violet-300 sm:text-[10px]">PROCESSOR</p>
          <p className="mt-1 text-[10px] font-medium text-white sm:text-xs">AMD Ryzen 7 7800X3D</p>
          <p className="mt-1 font-mono text-xs text-cyan-300 sm:text-sm">$39,990.00</p>
          <CalloutLine position="below-right" />
        </div>
        <div className="absolute top-[14%] right-[8%] max-w-[38%] border-r border-cyan-400/60 pr-2 text-right sm:pr-3">
          <p className="font-mono text-[9px] tracking-widest text-cyan-300 sm:text-[10px]">MEMORY</p>
          <p className="mt-1 text-[10px] font-medium text-white sm:text-xs">G.Skill Trident Z5<br />32GB DDR5</p>
          <p className="mt-1 font-mono text-xs text-cyan-300 sm:text-sm">$18,990.00</p>
          <CalloutLine position="below-left" />
        </div>
        <div className="absolute bottom-[12%] left-[8%] max-w-[47%] border-l border-violet-400/60 pl-2 sm:pl-3">
          <p className="font-mono text-[9px] tracking-widest text-violet-300 sm:text-[10px]">GRAPHICS</p>
          <p className="mt-1 text-[10px] font-medium text-white sm:text-xs">NVIDIA RTX 4080</p>
          <p className="mt-1 font-mono text-xs text-cyan-300 sm:text-sm">$119,990.00</p>
          <CalloutLine position="above-right" />
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] leading-relaxed text-slate-400">Example configuration &middot; Demo prices from the sample catalog</p>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="mx-auto grid w-full max-w-[1440px] min-w-0 items-start gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:px-8">
      <div className="min-w-0 lg:pt-4">
        <p className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-cyan-300 sm:text-xs">
          <span aria-hidden="true" className="h-px w-5 shrink-0 bg-[#22D3EE]" /> {appConfig.TEXT.LANDING.HERO.NEXT_BUILD_TEXT}
        </p>
        <h1 id="hero-title" className="text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] font-semibold tracking-[-0.05em]">
        {appConfig.TEXT.LANDING.HERO.MAIN_HEADING_TEXT.main} <span className="text-violet-400">{appConfig.TEXT.LANDING.HERO.MAIN_HEADING_TEXT.hightLighted}</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg lg:max-w-lg">
        Your vision. Your components. Your PC. Choose your parts, see the total, and save a build that&apos;s entirely yours.
        </p>
        <Link href={appConfig.ROUTES.dashboard} className={cn(buttonVariants(), 'mt-6 h-12 gap-3 rounded-lg bg-[#7C3AED] px-6 text-base text-white shadow-lg shadow-violet-500/20 hover:bg-[#6D28D9] focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none motion-reduce:active:translate-y-0')}>
        {appConfig.TEXT.LANDING.HERO.CTA_BUTTON_MAIN} <ArrowUpRight aria-hidden="true" className="size-5" />
        </Link>
        <p className="mt-4 text-xs text-slate-400">Sign in to create and save your build.</p>
        <ul className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-3">
          {appConfig.TEXT.LANDING.HERO.FEATURES_LIST.map(({ primary, secondary, iconName }) => {
            const Icon = featureIcons[iconName];

            return (
              <li key={primary} className="flex items-start gap-3 sm:flex-col">
                <Icon aria-hidden="true" className="size-5 shrink-0 text-cyan-300" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-slate-200">{primary}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{secondary}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <PcPreview />
    </section>
  );
}
