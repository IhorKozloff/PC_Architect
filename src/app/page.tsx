import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TypographyH1 } from '@/components/ui/typography-h1';
import { TypographyH3 } from '@/components/ui/typography-h3';

export default function Home() {
  const x = 5;

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main>
        <TypographyH1>Hello World!</TypographyH1>
        <TypographyH3>Hello World!</TypographyH3>
        <Button variant="outline">Button</Button>
      </main>
    </div>
  );
}
