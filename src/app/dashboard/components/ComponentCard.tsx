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
    <Card className="min-w-0 border border-border bg-card text-card-foreground ring-0">
      <CardHeader className="min-h-0 flex-1 pb-2">
        <CardTitle className="break-words text-base font-medium leading-relaxed">{name}</CardTitle>
        <CardDescription className="font-mono text-sm font-medium text-accent tabular-nums">
          {new Intl.NumberFormat('ru-RU').format(price)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-border bg-transparent">
        <Button
          size="sm"
          className="h-10 w-full gap-1.5 motion-reduce:transition-none"
          onClick={onClick}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
