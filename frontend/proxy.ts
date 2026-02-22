import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/[user]';
  url.searchParams.set('originalPath', request.nextUrl.pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: '/@:username',
};
