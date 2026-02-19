'use client';

import { createPost } from '@/lib/actions/post';
import { useState, FormEvent, useEffect } from 'react';
import { InlineError } from '@/components/error';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    // Dismiss error after 5 seconds on display
    if (!submitError) return;
    const timer = setTimeout(() => setSubmitError(''), 5000);
    return () => clearTimeout(timer);
  }, [submitError]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      await createPost(formData);
      setContent('');
      setSubmitError('');
    } catch {
      setSubmitError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} aria-busy={isSubmitting}>
      <label className="flex h-70 flex-col rounded-2xl border-2 border-neutral-200 px-4 pt-3 text-xl font-light tracking-wide shadow-xl focus-within:border-neutral-200 focus-within:shadow-xl/20 focus-within:outline-none dark:border-neutral-400 dark:bg-neutral-200">
        <textarea
          className="flex-1 resize-none outline-none"
          placeholder="Post"
          aria-label="Write a new post"
          aria-describedby="char-counter"
          aria-invalid={content.length >= 2000}
          aria-errormessage={content.length >= 2000 ? 'char-counter' : undefined}
          name="content"
          maxLength={2000}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end py-2">
          {content.length > 0 && (
            <span
              id="char-counter"
              aria-live="polite"
              className={`text-md ${
                content.length > 1900
                  ? 'font-bold text-neutral-700'
                  : content.length > 1600
                    ? 'font-medium text-neutral-600'
                    : 'text-neutral-500'
              } `}
            >
              {content.length} / 2000
            </span>
          )}
        </div>
      </label>
      <div className="mt-3 flex items-center justify-end gap-3">
        <InlineError message={submitError} className="max-w-xs" />
        <button
          className="rounded-full bg-neutral-950 px-6 py-3 font-bold text-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting || !content.trim()}
          aria-label={!content.trim() ? 'Add content to enable posting' : undefined}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}
