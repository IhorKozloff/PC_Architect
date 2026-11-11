import { auth } from '@/auth';
import { HeaderNav } from './header-nav';

export async function Header() {
  const session = await auth();
  return (
    <header className="border-b border-white/10 bg-[#0c0f16] text-slate-100">
      <nav aria-label="Main navigation" className="mx-auto w-full max-w-[1440px] min-w-0 px-5 py-4 sm:px-8">
        <HeaderNav session={session} />
      </nav>
    </header>
  );
};
