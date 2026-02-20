import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <nav aria-label="Global" className="layout-nav layout-header">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-primary text-3xl font-bold">Socialite</span>
            </Link>
          </div>
          <div>
            <Link href="/login" className="btn-primary mx-6">
              Login
            </Link>
            <Link href="/register" className="btn-primary">
              Sign up
            </Link>
          </div>
        </nav>
        <hr className="bg-divider my-8 h-px border-0" />
      </div>
    </header>
  );
}
