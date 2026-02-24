'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
export default function Header() {
  const { user, logout } = useAuth();
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
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">{user.username}</span>
                <button onClick={logout} className="btn-primary">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-primary mx-6">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
        <hr className="bg-divider my-8 h-px border-0" />
      </div>
    </header>
  );
}
