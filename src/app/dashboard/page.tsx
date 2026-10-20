import { CurrentBuild } from './components/CurrentBuild';
import { PopularBuildCard } from './components/PopularBuildCard';

export default function Dashboard() {
  return (
    <div className="flex flex-col max-w-9xl gap-6 lg:flex-row lg:items-start justify-center">
      <div className="min-w-0 flex-1 border-b-blue-700 border-2">
        <CurrentBuild />
      </div>
      <aside className="shrink-0 lg:sticky lg:top-6 lg:w-80">
        <PopularBuildCard />
      </aside>
    </div>
  );
}