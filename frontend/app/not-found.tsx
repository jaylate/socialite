import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="centered-container">
      <div className="card">
        <div className="mb-8 text-center">
          <h1 className="card-title-large">404</h1>
          <p className="card-subtitle">Page not found</p>
        </div>

        <p className="card-text mb-6 text-center">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link href="/" className="block w-full">
          <Button variant="rectangular">Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
