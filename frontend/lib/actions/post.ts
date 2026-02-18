'use server';

import { postService } from '@/lib/api';
import { revalidateTag } from 'next/cache';

export async function createPost(formData: FormData) {
  const content = formData.get('content');
  if (!content) {
    throw new Error('Content is required');
  }
  await postService.addPost({ content: content as string });
  revalidateTag('posts', 'max');
}
