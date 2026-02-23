import type { Post } from './post';

export interface LikeSectionProps {
  postId: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface InlineErrorProps {
  message?: string;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'rounded' | 'rectangular';
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export interface CardProps {
  title: string;
  subtitle?: string;
  titleLarge?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  footer?: React.ReactNode;
}

export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface FeedProps {
  type: 'all' | 'user';
  username?: string;
}
