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
    <Card className={cn('border border-border bg-card py-6 text-foreground shadow-2xl shadow-black/20 ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]', className)} {...props}>
      <CardHeader className="gap-3">
        <CardTitle><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Create an account</h1></CardTitle>
        <CardDescription className="leading-relaxed text-muted-foreground">
          Enter your information below to create your account
        </CardDescription>
        {state?.error && <p role="alert" className="break-words rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>}
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup className="[&_[data-slot=input]]:h-11 [&_[data-slot=input]]:motion-reduce:transition-none">
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
              <FieldDescription className="text-muted-foreground">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input name="password" id="password" type="password" required />
              <FieldDescription className="text-muted-foreground">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" className="h-11 motion-reduce:transition-none">Create Account</Button>
                <FieldDescription className="text-center text-muted-foreground [&>a]:text-accent [&>a]:hover:text-foreground [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-offset-4 [&>a]:focus-visible:outline-ring">
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
