import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12 dark:bg-neutral-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:border dark:border-neutral-600 dark:bg-neutral-700">
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold text-neutral-800 dark:text-neutral-100">404</h1>
          <p className="mt-2 text-xl text-neutral-600 dark:text-neutral-300">Page not found</p>
        </div>

        <p className="mb-6 text-center text-neutral-600 dark:text-neutral-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="block w-full rounded-lg bg-neutral-950 py-3 text-center font-bold text-neutral-200 transition-colors hover:bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-neutral-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
