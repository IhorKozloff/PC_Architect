import { auth } from '@/auth';
import { LoginForm } from '@/components/login-form';
import { AuthShell } from '@/components/auth-shell';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
