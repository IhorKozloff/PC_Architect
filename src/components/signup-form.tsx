'use client';

import { signupAction } from '@/app/signup/actions/signupAction';
import { SignupState } from '@/app/signup/types/signupTypes';
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
import { cn } from '@/lib/utils';

export function SignupForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction] = useActionState<SignupState | null, FormData>(signupAction, null);
  return (
    <Card className={cn('border border-white/10 bg-[#111621] py-6 text-slate-100 shadow-2xl shadow-violet-950/20 ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]', className)} {...props}>
      <CardHeader className="gap-3">
        <CardTitle><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Create an account</h1></CardTitle>
        <CardDescription className="leading-relaxed text-slate-400">
          Enter your information below to create your account
        </CardDescription>
        {state?.error && <p role="alert" className="break-words rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{state.error}</p>}
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup className="[&_[data-slot=input]]:h-11 [&_[data-slot=input]]:border-white/15 [&_[data-slot=input]]:bg-[#0c0f16] [&_[data-slot=input]]:text-slate-100 [&_[data-slot=input]]:placeholder:text-slate-500 [&_[data-slot=input]]:focus-visible:border-cyan-300 [&_[data-slot=input]]:focus-visible:ring-cyan-300/25 [&_[data-slot=input]]:motion-reduce:transition-none">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input name="name" id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription className="text-slate-400">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input name="password" id="password" type="password" required />
              <FieldDescription className="text-slate-400">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" className="h-11 bg-[#8B5CF6] text-white shadow-lg shadow-violet-500/15 hover:bg-[#7C3AED] focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none">Create Account</Button>
                <FieldDescription className="text-center text-slate-400 [&>a]:text-cyan-300 [&>a]:hover:text-cyan-200 [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-offset-4 [&>a]:focus-visible:outline-cyan-300">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
