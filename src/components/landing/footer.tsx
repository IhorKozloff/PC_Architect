import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Start Building' },
  { href: '/login', label: 'Log In' },
  { href: '/signup', label: 'Sign Up' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0f16] text-slate-100">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">PC <span className="text-violet-400">Architect</span></p>
          <p className="mt-2 text-sm text-slate-400">Your vision. Your components. Your PC.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-4">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="rounded-sm text-sm text-slate-300 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
