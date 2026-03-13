import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-medium text-neutral-900 tracking-tight hover:text-neutral-600 transition-colors duration-250">
            Guitar Catalogue
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="text-neutral-600 hover:text-neutral-900 transition-colors duration-250">Catalogue</Link>
            <Link to="/admin" className="text-neutral-600 hover:text-neutral-900 transition-colors duration-250">Admin</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
        Guitar Catalogue © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
