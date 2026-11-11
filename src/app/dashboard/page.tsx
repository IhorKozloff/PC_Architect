import { CurrentBuild } from './components/CurrentBuild';
import { PopularBuildCard } from './components/PopularBuildCard';

export default function Dashboard() {
  return (
    <div className="flex min-w-0 flex-col justify-center gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <CurrentBuild />
      </div>
      <aside className="min-w-0 shrink-0 empty:hidden lg:sticky lg:top-6 lg:w-80">
        <PopularBuildCard />
      </aside>
    </div>
  );
}
