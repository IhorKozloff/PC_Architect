'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { loginAction, LoginState } from '@/app/login/actions';
import { cn } from '@/lib/utils';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction] = useActionState<LoginState | null, FormData>(loginAction, null);
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="border border-border bg-card py-6 text-foreground shadow-2xl shadow-black/20 ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
        <CardHeader className="gap-3">
          <CardTitle><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Login to your account</h1></CardTitle>
          <CardDescription className="leading-relaxed text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
          {state?.error && <p role="alert" className="break-words rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>}
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup className="[&_[data-slot=input]]:h-11 [&_[data-slot=input]]:motion-reduce:transition-none">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input name="password" id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" className="h-11 motion-reduce:transition-none">Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center text-muted-foreground [&>a]:text-accent [&>a]:hover:text-foreground [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-offset-4 [&>a]:focus-visible:outline-ring">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
