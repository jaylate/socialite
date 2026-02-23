'use client';

import { createPost } from '@/lib/actions/post';
import { useState, FormEvent, useEffect } from 'react';
import { InlineError } from '@/components/error';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useAuth } from '@/lib/auth/AuthContext';

export default function CreatePost() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    // Dismiss error after 5 seconds on display
    if (!submitError) return;
    const timer = setTimeout(() => setSubmitError(''), 5000);
    return () => clearTimeout(timer);
  }, [submitError]);

  if (!user) {
    return null;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      await createPost(formData);
      setContent('');
      setSubmitError('');
      window.dispatchEvent(new CustomEvent('post-created'));
    } catch {
      setSubmitError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCharCountClass = () => {
    if (content.length > 1900) return 'font-bold text-primary';
    if (content.length > 1600) return 'font-medium text-secondary';
    return 'text-muted';
  };

  return (
    <form onSubmit={onSubmit} aria-busy={isSubmitting}>
      <Textarea
        placeholder="Post"
        aria-label="Write a new post"
        aria-describedby="char-counter"
        aria-invalid={content.length >= 2000}
        aria-errormessage={content.length >= 2000 ? 'char-counter' : undefined}
        name="content"
        maxLength={2000}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        footer={
          content.length > 0 && (
            <div className="flex justify-end py-2">
              <span id="char-counter" aria-live="polite" className={`${getCharCountClass()}`}>
                {content.length} / 2000
              </span>
            </div>
          )
        }
      />
      <div className="mt-3 flex items-center justify-end gap-3">
        <InlineError message={submitError} className="max-w-xs" />
        <Button
          disabled={isSubmitting || !content.trim()}
          aria-label={!content.trim() ? 'Add content to enable posting' : undefined}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </form>
  );
}
