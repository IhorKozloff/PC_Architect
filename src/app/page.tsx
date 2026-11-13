import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Features } from '@/components/landing/features';
import { Components } from '@/components/landing/components';
import { FinalCta } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <>
      <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-[#0c0f16] text-slate-100">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_60%)]" />
        <Hero />
        <HowItWorks />
        <Features />
        <Components />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
