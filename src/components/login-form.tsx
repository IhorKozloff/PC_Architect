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
      <Card className="border border-white/10 bg-[#111621] py-6 text-slate-100 shadow-2xl shadow-violet-950/20 ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
        <CardHeader className="gap-3">
          <CardTitle><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Login to your account</h1></CardTitle>
          <CardDescription className="leading-relaxed text-slate-400">
            Enter your email below to login to your account
          </CardDescription>
          {state?.error && <p role="alert" className="break-words rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{state.error}</p>}
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup className="[&_[data-slot=input]]:h-11 [&_[data-slot=input]]:border-white/15 [&_[data-slot=input]]:bg-[#0c0f16] [&_[data-slot=input]]:text-slate-100 [&_[data-slot=input]]:placeholder:text-slate-500 [&_[data-slot=input]]:focus-visible:border-cyan-300 [&_[data-slot=input]]:focus-visible:ring-cyan-300/25 [&_[data-slot=input]]:motion-reduce:transition-none">
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
                <Button type="submit" className="h-11 bg-[#8B5CF6] text-white shadow-lg shadow-violet-500/15 hover:bg-[#7C3AED] focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none">Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center text-slate-400 [&>a]:text-cyan-300 [&>a]:hover:text-cyan-200 [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-offset-4 [&>a]:focus-visible:outline-cyan-300">
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
