import { auth } from '@/auth';
import { SignupForm } from '@/components/signup-form';
import { AuthShell } from '@/components/auth-shell';
import { redirect } from 'next/navigation';

export default async function Page() {

  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  );
}
