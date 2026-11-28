import { appConfig } from '@/config/app.config';
import Link from 'next/link';

const content = appConfig.TEXT.LANDING.FOOTER;

export function Footer() {
  return (
    <footer className="border-t border-landing-border bg-landing-background text-landing-foreground">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">{content.BRAND.main} <span className="text-landing-orange">{content.BRAND.highlighted}</span></p>
          <p className="mt-2 text-sm text-landing-muted">{content.DESCRIPTION}</p>
        </div>
        <nav aria-label={content.NAV_LABEL}>
          <ul className="flex flex-wrap gap-x-6 gap-y-4">
            {content.LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="rounded-sm text-sm text-landing-muted hover:text-landing-ice focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-landing-ice">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
