import Link from 'next/link';

export default function Header() {
  return (
    <header className="">
      <div className="">
        <nav aria-label="Global" className="flex items-center justify-between pt-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-3xl font-bold dark:text-white">Socialite</span>
            </Link>
          </div>
          <div className="">
            <Link
              href="/login"
              className="mx-6 rounded-full bg-neutral-800 px-7 py-3 font-bold text-white dark:bg-neutral-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-neutral-800 px-7 py-3 font-bold text-white dark:bg-neutral-600"
            >
              Sign up
            </Link>
          </div>
        </nav>
        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-neutral-700" />
      </div>
    </header>
  );
}
