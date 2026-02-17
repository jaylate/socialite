'use client';

import { postService } from '@/lib/api';
import { createPost } from '../actions';
import { useState, FormEvent } from 'react';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await createPost(formData);
      setContent('');
    } catch (error) {
      console.error(`Failed to submit new post: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="h-50 w-full resize-none rounded-2xl border-2 border-neutral-200 pt-3 pl-4 text-xl shadow-xl focus:border-neutral-200 focus:shadow-xl/20 focus:outline-none dark:border-neutral-400 dark:bg-neutral-200"
        placeholder="Post"
        name="content"
        maxLength={2000}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="flex justify-between">
        <div></div>
        <button
          className="mx-1 mt-3 justify-end rounded-full bg-neutral-950 px-6 py-3 font-bold text-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}
