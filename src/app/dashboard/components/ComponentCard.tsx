import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  name: string;
  price: number;
  onClick?: () => void;
}

export function ComponentCard({
  name,
  price,
  onClick
}: Props) {
  return (
    <Card className="min-w-0 border border-white/10 bg-[#0c0f16] text-slate-100 ring-0">
      <CardHeader className="min-h-0 flex-1 pb-2">
        <CardTitle className="break-words text-base font-medium leading-relaxed">{name}</CardTitle>
        <CardDescription className="font-mono text-sm font-medium text-cyan-300 tabular-nums">
          {new Intl.NumberFormat('ru-RU').format(price)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-white/10 bg-transparent">
        <Button
          variant="secondary"
          size="sm"
          className="h-10 w-full gap-1.5 border border-violet-400/30 bg-violet-400/10 text-violet-200 hover:bg-violet-400/20 focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none"
          onClick={onClick}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
