import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isAuth = !!token;
  const isVerified = token?.isVerified;

  // Protect /user/* routes
  if (!isAuth && pathname.startsWith('/user')) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = '/signin';
    return NextResponse.redirect(signInUrl);
  }

  // Redirect logged-in users away from /signin
  if (isAuth && pathname === '/signin') {
    const userUrl = req.nextUrl.clone();
    userUrl.pathname = '/user';
    return NextResponse.redirect(userUrl.pathname);
  }

  // Prevent verified users from accessing /verify-otp
  if (isAuth && pathname.startsWith('/verifyOtp') && isVerified) {
    const userUrl = req.nextUrl.clone();
    userUrl.pathname = '/user';
    return NextResponse.redirect(userUrl);
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/signin', '/verifyOtp'],
};
