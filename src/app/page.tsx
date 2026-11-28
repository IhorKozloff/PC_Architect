import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Features } from '@/components/landing/features';
import { Components } from '@/components/landing/components';
import { FinalCta } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <>
      <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-landing-background text-landing-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-radial-[ellipse_at_top_right] from-landing-ice/8 to-transparent to-60%" />
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
