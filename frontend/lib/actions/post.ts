'use server';

import { postService } from '@/lib/api';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function createPost(formData: FormData) {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('jwt');

  const content = formData.get('content');
  if (!content || typeof content !== 'string') {
    throw new Error('Content is required');
  }

  const cookieHeader = jwtCookie ? `jwt=${jwtCookie.value}` : '';

  await postService.addPost({ content }, {
    headers: { Cookie: cookieHeader },
  });

  revalidateTag('posts', 'max');
}
