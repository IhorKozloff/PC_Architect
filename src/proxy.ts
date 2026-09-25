import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATH = new Set(['/', '/login', '/register']);

// This function can be marked `async` if using `await` inside
export function isPublicPath(pathname: string) {
  if (PUBLIC_PATH.has(pathname)) return true;
  if (pathname.startsWith('/api')) return true;
  return false;
}
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie =
    request.cookies.get('authjs.session-token') ??
    request.cookies.get('_Secure-authjs.session-token');

  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};